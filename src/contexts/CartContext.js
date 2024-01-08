import { createContext, useContext, useState } from 'react';

// Create a CartContext
const CartContext = createContext();

// Custom hook to use CartContext
export function useCart() {
  return useContext(CartContext);
}

// CartProvider component to wrap your app with
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemId, quantity) => {
    const newItem = { itemId, quantity };
    setCartItems([...cartItems, newItem]);
  };

  // Other functions like removing items, updating quantity, etc.

  const cart = {
    cartItems,
    addToCart,
    // Add other functions or data related to the cart
  };

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
