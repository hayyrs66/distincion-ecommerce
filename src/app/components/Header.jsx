"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cart from "./Cart";
import { useCart } from "../context/CartProvider";
import { Rubik } from "next/font/google";
import { Heart, User, ShoppingBag } from "lucide-react";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300"],
});

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWindowHeight, setIsWindowHeight] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const changeHeader = () => {
      if (window.scrollY >= window.innerHeight) setIsWindowHeight(true);
      else setIsWindowHeight(false);
    };
    window.addEventListener("scroll", changeHeader);
    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, []);

  return (
    <>
      <header className="w-full header fixed top-0 left-0 py-2 z-10 items-center px-6 flex justify-between bg-[#838383] transition-colors">
        {/* Logo */}
        <div className="flex flex-grow basis-0 gap-2">
          <Link
            href="/"
            title-header="Distinción"
            className={`${
              rubik.className
            } text-4xl tracking-wide font-extralight ${
              isWindowHeight ? "text-black" : "text-white"
            }`}
          >
            DISTINCION
          </Link>
        </div>
        {/* Links */}
        <div
          className={`flex items-center justify-center gap-2 ${
            isWindowHeight ? "[&_a]:text-black" : "[&_a]:text-white"
          } [&_a]:transition-colors`}
        >
          <Link href="/" className="font-normal text-base leading-[1rem]">
            Inicio
          </Link>
          <Link href="/ropa" className="font-normal text-base leading-[1rem]">
            Explorar
          </Link>
          <Link href="/ropa" className="font-normal text-base leading-[1rem]">
            Contacto
          </Link>
          <Link href="/ropa" className="font-normal text-base leading-[1rem]">
            Pantalones
          </Link>
          <Link
            href="/colecciones"
            className="relative font-normal text-base leading-[1rem]"
          >
            Playeras
            <span className="absolute bottom-5 right-0 w-16 h-4 text-orange-200 bg-orange-800 font-medium rounded-md text-xs flex justify-center items-center leading-[1rem] tracking-normal px-1 py-1 translate-x-[50%] translate-y-[40%] transition-all">
              Próximo
            </span>
          </Link>
        </div>
        {/* Search and Cart */}
        <div className="flex flex-grow justify-end basis-0 items-center gap-4">
          <div className="flex items-center gap-2 h-full">
            <div>
              <Heart color={`${isWindowHeight ? "#000" : "#fff"}`} className="transition-colors" />
            </div>
            <button
              link-canasta="canasta"
              onClick={toggleCart}
              className="flex gap-3 relative items-center font-normal text-base text-white leading-[1rem]"
            >
              <ShoppingBag color={`${isWindowHeight ? "#000" : "#fff"}`} className="transition-colors" />
              <span
                className={`absolute bottom-6 right-1 w-4 h-4 ${
                  totalItems > 0 ? "bg-red-500" : "bg-black/50"
                } text-white rounded-full text-xs flex justify-center items-center leading-[1rem] font-poppins font-normal tracking-tighter px-1 py-1 mt-[-0.5rem] mr-[-0.5rem] z-10 drop-shadow-sm transform translate-x-1/2 translate-y-1/2 transition-all`}
              >
                {totalItems}
              </span>
            </button>
            <button
              className={`px-3 py-1 ${
                isWindowHeight ? "bg-black" : "bg-white"
              } rounded-md ml-3`}
            >
              <User color={`${isWindowHeight ? "#fff" : "#000"}`} className="transition-colors" />
            </button>
          </div>
        </div>
      </header>
      <Cart openCart={isCartOpen} closeCart={toggleCart} />
    </>
  );
};

export default Header;
