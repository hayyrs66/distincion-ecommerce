"use client";
import { useState } from "react";
import Link from "next/link";
import Cart from "./Cart";
import { useCart } from "../context/CartProvider";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 py-2 z-10 items-center px-8 bg-white flex justify-between">
        {/* Links */}
        <div className="flex flex-grow basis-0 gap-2">
          <Link
            href="/ropa"
            className="font-normal text-base text-black leading-[1rem]"
          >
            Pantalones
          </Link>
          <Link
            href="/colecciones"
            className="relative font-normal text-base text-black leading-[1rem]"
          >
            Playeras
            <span className="absolute bottom-5 right-0 w-24 h-4 text-orange-500 font-medium rounded-full text-xs flex justify-center items-center leading-[1rem] tracking-tighter px-1 py-1 translate-x-[50%] translate-y-[40%] transition-all">
              Próximamente
            </span>
          </Link>
        </div>
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            title-header="Distinción"
            className="text-4xl tracking-tighter font-normal text-black"
          >
            DISTINCIÓN
          </Link>
        </div>
        {/* Search and Cart */}
        <div className="flex flex-grow justify-end basis-0 items-center gap-4">
          {/* <div className="relative flex items-center border bg-gray-100 border-gray-300 rounded-xl input outline-none px-4">
            <input
              placeholder="Buscar..."
              className="bg-transparent outline-none py-2 text-sm text-black placeholder:text-black rounded-md"
              name="search"
              type="search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-[#c7c7c7] z-10 w-4"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div> */}
          <div className="relative h-full">
            <button
              link-canasta="canasta"
              onClick={toggleCart}
              className="flex gap-3 items-center font-normal text-base text-black leading-[1rem]"
            >
              Canasta
              <span
                className={`absolute bottom-4 mx-2 right-0 w-4 h-4 ${
                  totalItems > 0 ? "bg-red-500" : "bg-black/50"
                } text-white rounded-full text-xs flex justify-center items-center leading-[1rem] font-poppins font-normal tracking-tighter px-1 py-1 mt-[-0.5rem] mr-[-0.5rem] z-10 drop-shadow-sm transform translate-x-1/2 translate-y-1/2 transition-all`}
              >
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>
      <Cart openCart={isCartOpen} closeCart={toggleCart} />
    </>
  );
};

export default Header;
