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
  const [isCartLoaded, setIsCartLoaded] = useState(false); // Add loading state

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('printingCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsCartLoaded(true); // Mark as loaded
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isCartLoaded) { // Only save after initial load
      localStorage.setItem('printingCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  // Add item to cart
  const addToCart = (item) => {
    const newItem = {
      ...item,
      id: `${item.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
    };

    setCartItems(prevItems => {
      // Check if similar configuration already exists
      const existingIndex = prevItems.findIndex(
        existingItem => 
          existingItem.type === item.type &&
          JSON.stringify(existingItem.configuration) === JSON.stringify(item.configuration)
      );

      if (existingIndex !== -1) {
        // Update quantity if same item exists
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + item.quantity,
          total: (updatedItems[existingIndex].quantity + item.quantity) * item.price
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
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
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  // Calculate item count
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        isCartLoaded, // Export loading state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};