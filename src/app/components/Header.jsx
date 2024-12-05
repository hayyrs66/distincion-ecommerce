"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartProvider";
import { Rubik } from "next/font/google";
import { Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import Cart from "./Cart";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300"],
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const changeHeader = () => {
      if (window.scrollY >= window.innerHeight) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", changeHeader);
    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 py-2 z-10 px-6 flex justify-between items-center transition-colors ${
          isScrolled
            ? "bg-white text-black"
            : isHomePage
            ? "bg-transparent text-white"
            : "bg-white text-black"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-grow basis-0 gap-2">
          <Link
            href="/"
            className={`${rubik.className} text-4xl tracking-wide font-extralight`}
          >
            DISTINCION
          </Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex items-center justify-center gap-2">
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

        {/* Menu button for small screens */}
        <div className="flex md:hidden items-center mr-2">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X
                color={`${isScrolled ? "#000" : "#fff"}`}
                className="transition-colors w-6 h-6"
              />
            ) : (
              <Menu
                color={`${isScrolled ? "#000" : "#fff"}`}
                className="transition-colors w-8 h-8"
              />
            )}
          </button>
        </div>

        {/* Search and Cart */}
        <div className="flex md:flex-grow justify-end basis-0 items-center gap-4">
          <div className="flex items-center gap-2 h-full">
            <Heart
              color={`${isScrolled ? "#000" : "#fff"}`}
              className="transition-colors"
            />
            <button
              onClick={toggleCart}
              className="flex gap-3 relative items-center font-normal text-base"
            >
              <ShoppingBag
                color={`${isScrolled ? "#000" : "#fff"}`}
                className="transition-colors"
              />
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
                isScrolled ? "bg-black text-white" : "bg-white text-black"
              } rounded-md ml-3`}
            >
              <User
                color={`${isScrolled ? "#fff" : "#000"}`}
                className="transition-colors"
              />
            </button>
          </div>
        </div>
      </header>
      {/* Cart Drawer */}
      <Cart openCart={isCartOpen} closeCart={toggleCart} />
    </>
  );
};

export default Header;
