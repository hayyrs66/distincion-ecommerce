"use client";
import { useCart } from "../context/CartProvider";
import CartItem from "./CartItem";
import Link from "next/link";

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
      className={`fixed top-0 right-0 sm:w-full md:w-[400px] w-full h-full drop-shadow-xl bg-white z-20 transition-transform duration-300 ${
        openCart ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="w-full flex flex-col pt-6 px-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <h4 className="text-xl font-normal tracking-tight">
              Carrito de compra
            </h4>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="px-2 py-1 rounded-md hover:text-black/70 transition-colors"
          >
            Cerrar
          </button>
        </div>
        <div className="w-full mt-3 mb-3">
          <div className="w-full border-b" />
        </div>
      </div>

      {/* Item Count */}
      <div className="w-full flex justify-start items-center">
        <span className="px-6 text-sm py-1 text-gray-700 font-light">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col flex-1 border-b border-b-black/20 overflow-auto">
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
        <div className="w-full flex justify-start items-center">
          <Link
          onClick={closeCart}
            href={"/compra"}
            className="bg-black text-white font-normal text-base px-4 py-1 hover:bg-black/80 transition-colors rounded-sm"
          >
            Comprar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
