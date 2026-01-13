// app/admin/dashboard/orders/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  FiPackage, 
  FiDollarSign, 
  FiUser, 
  FiMail, 
  FiPhone,
  FiMapPin,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiDownload
} from 'react-icons/fi';
import { 
  ShoppingBag, 
  CreditCard, 
  BanknoteIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, activeFilter, searchTerm, sortBy]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 Fetching orders from API...');
      
      const response = await fetch('/api/admin/orders');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 API Response:', data);
      
      if (data.success) {
        setOrders(data.orders || []);
        console.log(`✅ Loaded ${data.orders.length} orders`);
      } else {
        console.error('❌ Failed to load orders:', data.error);
        setOrders([]);
        alert('Failed to load orders: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      setOrders([]);
      alert('Network error while loading orders: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderId?.toLowerCase().includes(term) ||
        order.customerName?.toLowerCase().includes(term) ||
        order.customerEmail?.toLowerCase().includes(term) ||
        order.paymentMethod?.toLowerCase().includes(term)
      );
    }

    // Apply payment method filter
    if (activeFilter === 'wire_transfer') {
      filtered = filtered.filter(order => order.paymentMethod === 'wire_transfer');
    } else if (activeFilter === 'paypal') {
      filtered = filtered.filter(order => order.paymentMethod === 'paypal');
    } else if (activeFilter === 'pending') {
      filtered = filtered.filter(order => order.paymentStatus === 'pending');
    } else if (activeFilter === 'paid') {
      filtered = filtered.filter(order => order.paymentStatus === 'paid');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'amount_high') {
        return b.total - a.total;
      } else if (sortBy === 'amount_low') {
        return a.total - b.total;
      }
      return 0;
    });

    setFilteredOrders(filtered);
  };

  const updatePaymentStatus = async (orderId, newStatus) => {
  try {
    console.log(`🔄 Updating order ${orderId} to ${newStatus}`);
    
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentStatus: newStatus }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Update local state
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, paymentStatus: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
      }
      
      // Refresh orders list
      fetchOrders();
      
      alert('✅ Payment status updated successfully');
    } else {
      throw new Error(data.error || 'Failed to update status');
    }
  } catch (error) {
    console.error('❌ Error updating payment status:', error);
    alert('❌ Failed to update payment status: ' + error.message);
  }
};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'paypal':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'wire_transfer':
        return <BanknoteIcon className="w-5 h-5 text-green-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPaymentStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'paid':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>;
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const exportOrders = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Order ID,Customer Name,Email,Phone,Payment Method,Payment Status,Total,Date\n"
      + filteredOrders.map(order => 
          `${order.orderId},${order.customerName},${order.customerEmail},${order.customerPhone || 'N/A'},${order.paymentMethod},${order.paymentStatus},${order.total},${order.createdAt}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600 mt-2">Manage and track customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportOrders}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={fetchOrders}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiRefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiPackage className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Wire Transfer</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {orders.filter(o => o.paymentMethod === 'wire_transfer').length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {orders.filter(o => o.paymentMethod === 'wire_transfer' && o.paymentStatus === 'pending').length} pending
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BanknoteIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">PayPal</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {orders.filter(o => o.paymentMethod === 'paypal').length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {orders.filter(o => o.paymentMethod === 'paypal' && o.paymentStatus === 'paid').length} paid
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(orders.reduce((sum, order) => sum + (order.total || 0), 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Amount: High to Low</option>
                <option value="amount_low">Amount: Low to High</option>
              </select>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Orders
              </button>
              <button
                onClick={() => setActiveFilter('wire_transfer')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${activeFilter === 'wire_transfer' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <BanknoteIcon className="w-4 h-4 mr-2" />
                Wire Transfer
              </button>
              <button
                onClick={() => setActiveFilter('paypal')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${activeFilter === 'paypal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                PayPal
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${activeFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FiClock className="w-4 h-4 mr-2" />
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <FiPackage className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No orders found</p>
                        <p className="text-sm mt-1">Try changing your filters or search term</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-medium text-gray-900">
                          {order.orderId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPaymentMethodIcon(order.paymentMethod)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {order.paymentMethod?.replace('_', ' ') || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                            title="View Details"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          {order.paymentMethod === 'wire_transfer' && order.paymentStatus === 'pending' && (
                            <button
                              onClick={() => updatePaymentStatus(order._id, 'paid')}
                              className="text-green-600 hover:text-green-900 flex items-center"
                              title="Mark as Paid"
                            >
                              <FiCheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {isViewModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-600">Order ID: {selectedOrder.orderId}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                        Customer Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FiUser className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FiMail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium text-gray-900">{selectedOrder.customerEmail}</p>
                          </div>
                        </div>
                        
                        {selectedOrder.customerPhone && (
                          <div className="flex items-start">
                            <FiPhone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Phone Number</p>
                              <p className="font-medium text-gray-900">{selectedOrder.customerPhone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {selectedOrder.customerAddress && selectedOrder.customerAddress.street && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <FiMapPin className="w-5 h-5 mr-2 text-green-600" />
                          Shipping Address
                        </h3>
                        
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">{selectedOrder.customerAddress.street}</p>
                          <p className="text-gray-700">
                            {selectedOrder.customerAddress.city}, {selectedOrder.customerAddress.state} {selectedOrder.customerAddress.zipCode}
                          </p>
                          <p className="text-gray-700">{selectedOrder.customerAddress.country}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium text-gray-900 capitalize">
                            {selectedOrder.paymentMethod?.replace('_', ' ') || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment Status:</span>
                          {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Order Status:</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                            {selectedOrder.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-gray-900">{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                      
                      <div className="space-y-4">
                        {(selectedOrder.items || []).map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{item.productName || `Item ${index + 1}`}</p>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm text-gray-600">Qty: {item.quantity || 1}</span>
                                <span className="text-sm text-gray-600">Price: {formatCurrency(item.price || 0)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{formatCurrency(item.total || 0)}</p>
                              <p className="text-xs text-gray-500">{item.type || 'printing'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Order Summary */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-900">{formatCurrency(selectedOrder.subtotal || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium text-gray-900">{formatCurrency(selectedOrder.taxAmount || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium text-gray-900">{formatCurrency(selectedOrder.shippingAmount || 0)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedOrder.total || 0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  {selectedOrder.paymentMethod === 'wire_transfer' && selectedOrder.paymentStatus === 'pending' && (
                    <button
                      onClick={() => {
                        updatePaymentStatus(selectedOrder._id, 'paid');
                        setIsViewModalOpen(false);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                    >
                      Mark as Paid
                    </button>
                  )}
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}