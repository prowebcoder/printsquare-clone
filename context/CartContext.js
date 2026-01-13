// context/CartContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('printingCart');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Fix: Clean up any stringified objects in the cart
        const validatedCart = parsedCart.map(item => {
          // Fix: Handle configuration if it's a string
          let configuration = {};
          if (item.configuration) {
            if (typeof item.configuration === 'string') {
              try {
                // Try to parse it if it's a JSON string
                configuration = JSON.parse(item.configuration);
              } catch (e) {
                // If it's a string like "paperUnit: 'US',\n selectedSize: '8.5 x 11'"
                // Convert it to proper object
                configuration = convertStringToObject(item.configuration);
              }
            } else {
              configuration = item.configuration;
            }
          }

          // Fix: Ensure summary is an object, not a string
          let summary = {};
          if (item.summary && typeof item.summary === 'object') {
            summary = item.summary;
          }

          return {
            ...item,
            id: item.id || `${item.type || 'item'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
            total: Number(item.total) || 0,
            summary: summary,
            configuration: configuration
          };
        });
        
        setCartItems(validatedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    }
    
    setIsCartLoaded(true);
  }, []);

  // Helper function to convert string to object
  const convertStringToObject = (str) => {
    try {
      // If it's already an object, return it
      if (typeof str === 'object') return str;
      
      // If it's a string that looks like a JS object, try to evaluate it
      if (typeof str === 'string') {
        // Remove line breaks and extra spaces
        const cleanStr = str
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Try to parse as JSON first
        try {
          return JSON.parse(str);
        } catch (e) {
          // If not JSON, try to extract key-value pairs
          const obj = {};
          const pairs = cleanStr.split(',');
          
          pairs.forEach(pair => {
            const [key, ...valueParts] = pair.split(':');
            if (key && valueParts.length > 0) {
              const cleanKey = key.trim().replace(/['"]/g, '');
              let value = valueParts.join(':').trim().replace(/['"]/g, '');
              
              // Try to parse numbers
              if (!isNaN(value) && value !== '') {
                value = Number(value);
              } else if (value === 'true') {
                value = true;
              } else if (value === 'false') {
                value = false;
              } else if (value === 'null') {
                value = null;
              }
              
              obj[cleanKey] = value;
            }
          });
          
          return obj;
        }
      }
    } catch (e) {
      console.warn('Could not convert string to object:', e);
    }
    return {};
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      try {
        // Ensure configuration is properly stringified as JSON
        const cleanCart = cartItems.map(item => ({
          type: item.type,
          productName: item.productName,
          price: Number(item.price),
          quantity: Number(item.quantity),
          total: Number(item.total),
          summary: item.summary || {},
          configuration: item.configuration || {},
          id: item.id,
          addedAt: item.addedAt || new Date().toISOString()
        }));
        
        localStorage.setItem('printingCart', JSON.stringify(cleanCart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cartItems, isCartLoaded]);

  // Add item to cart with proper validation
  const addToCart = (item) => {
    // Fix: Ensure configuration is stored as proper object
    let configuration = {};
    if (item.configuration) {
      if (typeof item.configuration === 'string') {
        configuration = convertStringToObject(item.configuration);
      } else {
        configuration = item.configuration;
      }
    }

    const cleanItem = {
      type: item.type || 'perfect-binding',
      productName: item.productName || 'Printing Product',
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      total: Number(item.total) || (Number(item.price) || 0) * (Number(item.quantity) || 1),
      summary: item.summary || {},
      configuration: configuration,
      id: `${item.type || 'item'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString()
    };

    setCartItems(prevItems => {
      // Check if similar item exists
      const existingIndex = prevItems.findIndex(
        existingItem => 
          existingItem.type === cleanItem.type &&
          existingItem.productName === cleanItem.productName
      );

      if (existingIndex !== -1) {
        // Update quantity if same item exists
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];
        const newQuantity = existingItem.quantity + cleanItem.quantity;
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
          total: newQuantity * existingItem.price
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, cleanItem];
      }
    });

    // Open cart sidebar
    setIsCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { 
              ...item, 
              quantity: newQuantity,
              total: newQuantity * item.price 
            }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setPendingOrderId(null);
    localStorage.removeItem('printingCart');
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  // Calculate item count for cart icon
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Start checkout process
  const startCheckout = () => {
    const orderId = 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    setPendingOrderId(orderId);
    return orderId;
  };

  // Complete checkout
  const completeCheckout = () => {
    setCartItems([]);
    setPendingOrderId(null);
    localStorage.removeItem('printingCart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        isCartLoaded,
        pendingOrderId,
        startCheckout,
        completeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};