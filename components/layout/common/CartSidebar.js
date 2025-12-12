// components/common/CartSidebar.js
'use client';
import { useCart } from '@/context/CartContext';
import { FiX, FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <>
      {/* Overlay with blur effect */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                  <FiShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <p className="text-gray-300 text-sm">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer group"
              >
                <FiX className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
                  <FiShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 text-center mb-8 max-w-xs">
                  Add some printing products to get started with your order
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                              <FiShoppingBag className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                {item.productName}
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                  {item.summary?.size}
                                </span>
                                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                  {item.summary?.pages}p
                                </span>
                              </div>
                            </div>
                            <p className="font-bold text-gray-900 text-lg">
                              {formatCurrency(item.total)}
                            </p>
                          </div>
                          
                          {/* Quick Specs */}
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                            <div>
                              <p><span className="font-medium">Cover:</span> {item.summary?.cover}</p>
                              <p><span className="font-medium">Color:</span> {item.summary?.printColor}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">Type:</span> {item.type.replace('-', ' ')}</p>
                              <p><span className="font-medium">Each:</span> {formatCurrency(item.price)}</p>
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer group/delete"
                            >
                              <FiTrash2 className="w-4 h-4 mr-1.5 group-hover/delete:scale-110 transition-transform" />
                              <span className="text-sm font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Only show when cart has items */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              {/* Order Summary */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-gray-900">{formatCurrency(cartTotal * 0.08)}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                        {formatCurrency(cartTotal + cartTotal * 0.08)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including estimated tax</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="group block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-3.5 rounded-xl font-bold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      View Full Cart
                      <FiChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link
                    href="/perfect-binding"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full border-2 border-gray-900 text-gray-900 text-center py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Continue Shopping
                  </Link>
                </div>
                
                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Your cart is saved automatically</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Free shipping on orders over $500</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;