// hooks/useCustomerAuth.js
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

const CustomerAuthContext = createContext();

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [customQuotes, setCustomQuotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication on mount
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('customer_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/customer/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setCustomer(data.customer);
        // Fetch customer's orders and quotes
        await fetchCustomerOrders(data.customer._id || data.customer.id);
        await fetchCustomerQuotes(data.customer._id || data.customer.id);
      } else {
        // Token invalid, clear it
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer');
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer's orders
  const fetchCustomerOrders = async (customerId) => {
    try {
      const response = await fetch(`/api/orders/customer/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders || []);
        }
      }
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };

  // Fetch customer's custom quotes
  const fetchCustomerQuotes = async (customerId) => {
    try {
      const response = await fetch(`/api/quotes/customer/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCustomQuotes(data.quotes || []);
        }
      }
    } catch (error) {
      console.error('Error fetching customer quotes:', error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/customer/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store token and customer data
        localStorage.setItem('customer_token', data.token);
        localStorage.setItem('customer', JSON.stringify(data.customer));
        
        setCustomer(data.customer);
        
        // Fetch customer's orders and quotes
        await fetchCustomerOrders(data.customer._id || data.customer.id);
        await fetchCustomerQuotes(data.customer._id || data.customer.id);
        
        return { success: true, customer: data.customer };
      } else {
        return { 
          success: false, 
          error: data.error || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const res = await fetch('/api/customer/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store token and customer data
        localStorage.setItem('customer_token', data.token);
        localStorage.setItem('customer', JSON.stringify(data.customer));
        
        setCustomer(data.customer);
        setOrders([]); // New user, no orders yet
        setCustomQuotes([]); // No quotes yet
        
        return { success: true, customer: data.customer };
      } else {
        return { 
          success: false, 
          error: data.error || 'Signup failed' 
        };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  // Update customer profile
  const updateCustomer = async (data) => {
    try {
      const token = localStorage.getItem('customer_token');
      if (!token) {
        return { 
          success: false, 
          error: 'Not authenticated' 
        };
      }

      const response = await fetch('/api/customer/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update local state
        const updatedCustomer = { ...customer, ...result.customer };
        setCustomer(updatedCustomer);
        localStorage.setItem('customer', JSON.stringify(updatedCustomer));
        
        return { success: true, customer: updatedCustomer };
      } else {
        return { 
          success: false, 
          error: result.error || 'Failed to update profile' 
        };
      }
    } catch (error) {
      console.error('Update customer error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem('customer_token');
      if (token) {
        await fetch('/api/customer/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer');
      
      // Reset state
      setCustomer(null);
      setOrders([]);
      setCustomQuotes([]);
      
      // Redirect to home page
      router.push('/');
    }
  };

  // Create wire transfer order
  const createWireTransferOrder = async (orderData) => {
    try {
      const token = localStorage.getItem('customer_token');
      if (!token) {
        return { 
          success: false, 
          error: 'Please login to create an order' 
        };
      }

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: 'wire_transfer',
          paymentStatus: 'pending',
          status: 'pending',
          requiresAction: true,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Refresh orders list
        await fetchCustomerOrders(customer._id || customer.id);
        
        return { 
          success: true, 
          order: result.order,
          orderId: result.orderId 
        };
      } else {
        return { 
          success: false, 
          error: result.error || 'Failed to create order' 
        };
      }
    } catch (error) {
      console.error('Create order error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  // Create PayPal order
  const createPayPalOrder = async (orderData) => {
    try {
      const token = localStorage.getItem('customer_token');
      if (!token) {
        return { 
          success: false, 
          error: 'Please login to create an order' 
        };
      }

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: 'paypal',
          paymentStatus: 'pending',
          status: 'pending',
          requiresAction: false,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Refresh orders list
        await fetchCustomerOrders(customer._id || customer.id);
        
        return { 
          success: true, 
          order: result.order,
          orderId: result.orderId 
        };
      } else {
        return { 
          success: false, 
          error: result.error || 'Failed to create order' 
        };
      }
    } catch (error) {
      console.error('Create PayPal order error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  // Get order by ID
  const getOrderById = async (orderId) => {
    try {
      const token = localStorage.getItem('customer_token');
      if (!token) {
        return null;
      }

      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.orders && data.orders.length > 0) {
          return data.orders[0];
        }
      }
      return null;
    } catch (error) {
      console.error('Get order error:', error);
      return null;
    }
  };

  // Refresh customer data (orders, quotes)
  const refreshCustomerData = async () => {
    if (customer) {
      await fetchCustomerOrders(customer._id || customer.id);
      await fetchCustomerQuotes(customer._id || customer.id);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!customer && !!localStorage.getItem('customer_token');
  };

  return (
    <CustomerAuthContext.Provider value={{
      customer,
      loading,
      orders,
      customQuotes,
      login,
      signup,
      logout,
      updateCustomer,
      checkAuth,
      createWireTransferOrder,
      createPayPalOrder,
      getOrderById,
      refreshCustomerData,
      isAuthenticated,
      setOrders,
      setCustomQuotes,
    }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  }
  return context;
};