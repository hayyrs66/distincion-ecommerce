"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Recuperar el carrito desde localStorage al inicio
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambia
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: Math.max(item.quantity + 1, 1) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity <= 0) {
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== id || item.size !== size || item.color !== color
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
