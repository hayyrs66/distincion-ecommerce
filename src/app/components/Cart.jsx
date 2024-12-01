"use client";
import { useEffect } from "react";
import { useCart } from "../context/CartProvider";
import CartItem from "./CartItem";
import Close from "./icons/Close";
import BagLogo from "./icons/BagLogo";

const Cart = ({ openCart, closeCart }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const shippingCost = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + shippingCost;

  return (
    <section
      className={`fixed top-0 right-0 w-[400px] h-full drop-shadow-xl bg-white z-20 transition-transform duration-300 ${
        openCart ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="w-full flex pt-6 px-6 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h4 className="text-xl font-normal tracking-tight">
            Canasta de Compra
          </h4>
          <BagLogo fillColor="fill-black" />
        </div>
        <button
          onClick={closeCart}
          aria-label="Cerrar carrito"
          className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
        >
          <Close />
        </button>
      </div>

      {/* Item Count */}
      <div className="w-full flex justify-start items-center">
        <span className="px-6 text-sm py-1 text-gray-700 font-light">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col flex-1 border-b border-b-black/20 mt-2 overflow-auto">
        {cartItems.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}-${item.color}`}
            item={item}
            onIncrease={() =>
              updateQuantity(item.id, item.size, item.color, item.quantity + 1)
            }
            onDecrease={() =>
              updateQuantity(item.id, item.size, item.color, item.quantity - 1)
            }
            onRemove={() => removeFromCart(item.id, item.size, item.color)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="w-full bg-white p-4">
        <div className="flex justify-between items-center w-full mb-2">
          <p className="font-light text-sm">Subtotal</p>
          <p className="font-semibold text-sm text-black/80">GTQ{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center w-full mb-2">
          <p className="font-light text-sm">Costo envío</p>
          <p className="font-semibold text-sm text-black/80">
            GTQ{shippingCost.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center w-full mb-4">
          <p className="font-light text-sm">Total</p>
          <p className="font-semibold text-sm text-black/80">GTQ{total.toFixed(2)}</p>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-black text-white font-light px-4 py-2 hover:bg-black/80 transition-colors rounded-md">
            Comprar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
