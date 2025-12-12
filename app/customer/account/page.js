// app/customer/account/page.js
'use client';

import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/header/header'; 
import Footer from '@/components/layout/footer/footer';
import Link from 'next/link';
import { 
  FiShoppingBag, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiClock,
  FiDollarSign,
  FiRefreshCw,
  FiTrash2,
  FiEye,
  FiMinus,
  FiPlus,
  FiChevronRight,
  FiMessageSquare,
  FiFileText,
  FiDownload
} from 'react-icons/fi';

export default function AccountPage() {
  const { customer, loading, logout } = useCustomerAuth();
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState([]);
  const [customQuotes, setCustomQuotes] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');

  useEffect(() => {
    if (!loading && !customer) {
      router.push('/customer/login');
    }
  }, [customer, loading, router]);

  // Fetch order history
  useEffect(() => {
    if (customer) {
      fetchOrderHistory();
    }
  }, [customer]);

  // Fetch custom quotes
  useEffect(() => {
    if (customer && activeTab === 'quotes') {
      fetchCustomQuotes();
    }
  }, [customer, activeTab]);

  const fetchOrderHistory = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch(`/api/orders/customer/${customer.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrderHistory(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchCustomQuotes = async () => {
    setIsLoadingQuotes(true);
    try {
      const response = await fetch(`/api/quotes/customer/${customer.id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomQuotes(data.quotes || []);
      }
    } catch (error) {
      console.error('Error fetching custom quotes:', error);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'quoted':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Awaiting Review';
      case 'reviewed':
        return 'Under Review';
      case 'quoted':
        return 'Quote Provided';
      case 'accepted':
        return 'Quote Accepted';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const bindingLabels = {
    'PERFECT': 'Perfect Binding',
    'SADDLE': 'Saddle Stitching',
    'HARDCOVER': 'Hardcover Book',
    'WIRE': 'Wire Binding'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-20">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600 text-lg">Welcome back, {customer.name}!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {customer.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold leading-tight text-white capitalize">{customer.name}</h1>
                    <p className="text-blue-100">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/90 text-sm">Member Since</div>
                  <div className="text-white font-semibold">
                    {formatDate(customer.createdAt || new Date().toISOString())}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('cart')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'cart' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Current Cart ({cartItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'quotes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Custom Quotes ({customQuotes.length})
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                      <h2 className="text-xl font-extrabold leading-tight text-gray-900">Profile Information</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="text-sm font-medium text-gray-500 block mb-1">Full Name</label>
                        <p className="text-gray-900 font-medium text-lg">{customer.name}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="text-sm font-medium text-gray-500 block mb-1">Email Address</label>
                        <p className="text-gray-900 font-medium text-lg">{customer.email}</p>
                      </div>
                      
                      {customer.recommender && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <label className="text-sm font-medium text-gray-500 block mb-1">Recommender</label>
                          <p className="text-gray-900 font-medium text-lg">{customer.recommender}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Account Actions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                      <h2 className="text-xl font-extrabold leading-tight text-gray-900">Account Actions</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <button
                        onClick={logout}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                      
                      <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Edit Profile</span>
                      </button>
                      
                      <Link href="/cart" className="block w-full">
                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                          <FiShoppingBag className="w-5 h-5" />
                          <span>Go to Cart ({cartItems.length})</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cart' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                      <h2 className="text-xl font-extrabold leading-tight text-gray-900">Current Cart</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Cart Total</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(cartTotal)}</p>
                    </div>
                  </div>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
                        <FiShoppingBag className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                      <p className="text-gray-600 mb-6">Add some printing products to get started</p>
                      <Link href="/perfect-binding" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FiShoppingBag className="w-5 h-5 mr-2" />
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900">{item.productName}</h4>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                                  <span className="text-sm text-gray-600">Price: {formatCurrency(item.price)} each</span>
                                  <span className="text-sm text-gray-600">Size: {item.summary?.size}</span>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(item.total)}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-50"
                                  >
                                    <FiMinus className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 text-gray-500 hover:text-green-600"
                                  >
                                    <FiPlus className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-1 text-gray-500 hover:text-red-600"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">Ready to checkout?</h3>
                            <p className="text-gray-600">Proceed to secure payment</p>
                          </div>
                          <Link href="/cart" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                            <FiShoppingBag className="w-5 h-5 mr-2" />
                            Checkout Now
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                      <h2 className="text-xl font-extrabold leading-tight text-gray-900">Order History</h2>
                    </div>
                    {isLoadingOrders && (
                      <FiRefreshCw className="w-5 h-5 animate-spin text-gray-400" />
                    )}
                  </div>
                  
                  {isLoadingOrders ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading order history...</p>
                    </div>
                  ) : orderHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-full flex items-center justify-center">
                        <FiPackage className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">Your completed orders will appear here</p>
                      <Link href="/perfect-binding" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <FiShoppingBag className="w-5 h-5 mr-2" />
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">Order #{order.orderId}</h4>
                              <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                            </div>
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                {order.status}
                              </div>
                              <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(order.total)}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <FiPackage className="w-4 h-4 mr-1" />
                                {order.items?.length || 0} items
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FiTruck className="w-4 h-4 mr-1" />
                                {order.shippingMethod || 'Standard Shipping'}
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'quotes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
                      <h2 className="text-xl font-extrabold leading-tight text-gray-900">Custom Quotes</h2>
                    </div>
                    {isLoadingQuotes && (
                      <FiRefreshCw className="w-5 h-5 animate-spin text-gray-400" />
                    )}
                  </div>
                  
                  {isLoadingQuotes ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading custom quotes...</p>
                    </div>
                  ) : customQuotes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-full flex items-center justify-center">
                        <FiFileText className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No custom quotes yet</h3>
                      <p className="text-gray-600 mb-6">Your custom quote requests will appear here</p>
                      <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                        Request Custom Quote
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        {customQuotes.map((quote) => (
                          <div key={quote._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-bold text-gray-900">{quote.projectName}</h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                    {getStatusText(quote.status)}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <FiMessageSquare className="w-4 h-4 mr-1" />
                                    Quote ID: {quote.quoteId}
                                  </span>
                                  <span>Submitted: {formatDate(quote.createdAt)}</span>
                                </div>
                              </div>
                              {quote.quoteAmount && (
                                <div className="text-right ml-4">
                                  <p className="text-sm text-gray-500">Quoted Amount</p>
                                  <p className="text-xl font-bold text-green-600">{formatCurrency(quote.quoteAmount)}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Binding</p>
                                <p className="font-medium text-gray-900">{bindingLabels[quote.binding] || quote.binding}</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Size</p>
                                <p className="font-medium text-gray-900">{quote.dimensions?.width}" × {quote.dimensions?.height}"</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Pages</p>
                                <p className="font-medium text-gray-900">{quote.pageCount}</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                                <p className="font-medium text-gray-900">{quote.quantity}</p>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                              <p className="text-xs text-gray-500 mb-2">Project Description</p>
                              <p className="text-gray-900">{quote.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t pt-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <FiPackage className="w-4 h-4 mr-1" />
                                  {quote.country}
                                </div>
                                <div className="flex items-center">
                                  <FiTruck className="w-4 h-4 mr-1" />
                                  Zip: {quote.zipCode}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {quote.quoteAmount && (
                                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    <FiCheckCircle className="w-4 h-4 mr-2" />
                                    Accept Quote
                                  </button>
                                )}
                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                  <FiDownload className="w-4 h-4 mr-2" />
                                  Download PDF
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 mt-8">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">Need another custom quote?</h3>
                            <p className="text-gray-600">Request a new custom quote for your unique project requirements</p>
                          </div>
                          <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                            <FiFileText className="w-5 h-5 mr-2" />
                            New Quote Request
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Cart</p>
                  <p className="text-2xl font-bold text-gray-900">{cartItems.length} items</p>
                  <p className="text-sm text-blue-600 mt-2">{formatCurrency(cartTotal)} total</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orderHistory.length}</p>
                  <p className="text-sm text-green-600 mt-2">Loyal Customer</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiPackage className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Custom Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{customQuotes.length}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className={`w-2 h-2 rounded-full ${customQuotes.filter(q => q.status === 'pending').length > 0 ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                    <span className="text-xs text-gray-600">
                      {customQuotes.filter(q => q.status === 'pending').length} pending
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-2xl font-bold text-gray-900">{new Date(customer.createdAt || new Date()).getFullYear()}</p>
                  <p className="text-sm text-purple-600 mt-2">Thank you for your loyalty!</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}