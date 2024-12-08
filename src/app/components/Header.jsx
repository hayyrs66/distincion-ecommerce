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
            className={`${rubik.className} text-3xl tracking-wide font-extralight`}
          >
            DISTINCION
          </Link>
        </div>

        {/* Enlaces para pantallas grandes */}
        <div className="hidden md:flex items-center justify-center gap-2">
          <Link
            href="/"
            className="font-normal tracking-tight  text-base leading-[1rem]"
          >
            Inicio
          </Link>
          <Link
            href="/ropa"
            className="font-normal tracking-tight  text-base leading-[1rem]"
          >
            Explorar
          </Link>
          <Link
            href="/ropa"
            className="font-normal tracking-tight  text-base leading-[1rem]"
          >
            Contacto
          </Link>
          <Link
            href="/ropa"
            className="font-normal tracking-tight  text-base leading-[1rem]"
          >
            Pantalones
          </Link>
          <Link
            href="/"
            className="relative font-normal tracking-tight  text-base leading-[1rem]"
          >
            Playeras
            <span className="absolute bottom-5 right-0 w-16 h-4 text-orange-100 bg-orange-600 font-medium rounded-md text-xs flex justify-center items-center leading-[1rem] tracking-normal px-1 py-1 translate-x-[50%] translate-y-[40%] transition-all">
              Próximo
            </span>
          </Link>
        </div>

        {/* Botón de menú para pantallas pequeñas */}
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

        {/* Carrito y usuario */}
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

      {/* Menú para pantallas pequeñas */}
      {isMenuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-white z-20 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5"
          >
            <X className="w-8 h-8" />
          </button>
          <Link
            href="/"
            className="text-2xl font-normal mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/ropa"
            className="text-2xl font-normal mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Explorar
          </Link>
          <Link
            href="/ropa"
            className="text-2xl font-normal mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          <Link
            href="/ropa"
            className="text-2xl font-normal mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Pantalones
          </Link>
          <Link
            href="/"
            className="text-2xl font-normal mb-4 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            Playeras
            <span className="absolute bottom-1 right-0 w-16 h-4 text-orange-100 bg-orange-600 font-medium rounded-md text-xs flex justify-center items-center leading-[1rem] tracking-normal px-1 py-1">
              Próximo
            </span>
          </Link>
        </nav>
      )}

      {/* Carrito */}
      <Cart openCart={isCartOpen} closeCart={toggleCart} />
    </>
  );
};

export default Header;
