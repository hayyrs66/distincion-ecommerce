"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartProvider";
import { Rubik } from "next/font/google";
import { Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import Cart from "./Cart";
import { useToast } from "@/hooks/use-toast";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const { cartItems } = useCart();
  const { toast } = useToast();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const halfPageHeight = document.body.scrollHeight / 2;

      if (!isHomePage) {
        setIsScrolled(true);
      } else {
        if (currentScroll >= window.innerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }

      if (currentScroll > halfPageHeight) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className={`
    w-full fixed top-0 left-0 py-2 z-20 px-6 flex items-center 
    transform-gpu transition-all duration-300 ease-in-out
    ${hideHeader ? "-translate-y-full" : "translate-y-0"}
    ${isScrolled ? "bg-white text-black" : isHomePage ? "bg-transparent text-white" : "bg-white text-black"}
  `}
      >
        {/* Enlaces para pantallas medianas y grandes */}
        <div className="hidden md:flex flex-grow basis-0 items-center justify-start gap-4">
          <Link
            href="/"
            className="font-normal tracking-tight text-base leading-[1rem] hover:opacity-80 transition-opacity"
          >
            Inicio
          </Link>
          <Link
            href="/ropa"
            className="font-normal tracking-tight text-base leading-[1rem] hover:opacity-80 transition-opacity"
          >
            Pantalones
          </Link>
          <Link
            href="/ropa"
            className="font-normal tracking-tight text-base leading-[1rem] hover:opacity-80 transition-opacity"
          >
            Contacto
          </Link>
          <button
            onClick={() => {
              toast({
                title: "No disponible",
                description: "Próximamente en 2025.",
              });
            }}
            className="relative font-normal tracking-tight text-base leading-[1rem] hover:opacity-80 transition-opacity"
          >
            Playeras
            <span className="absolute bottom-5 right-0 w-16 h-4 text-orange-100 bg-orange-600 font-medium rounded-md text-xs flex justify-center items-center leading-[1rem] tracking-normal px-1 py-1 translate-x-[50%] translate-y-[40%]">
              Próximo
            </span>
          </button>
        </div>

        {/* Logo Centrado */}
        <div className="flex justify-center items-center">
          <Link
            href="/"
            className={`${rubik.className} text-3xl tracking-wider font-extralight hover:opacity-80 transition-opacity`}
          >
            DISTINCION
          </Link>
        </div>

        {/* Carrito y usuario */}
        <div className="flex flex-grow basis-0 justify-end items-center gap-4">
          <div className="flex items-center gap-2 h-full">
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

            <button
              onClick={toggleCart}
              className="relative items-center font-normal text-base"
            >
              <ShoppingBag
                color={`${isScrolled ? "#000" : "#fff"}`}
                className="transition-colors"
              />
              <span
                className={`absolute bottom-6 right-1 w-4 h-4 ${
                  totalItems > 0 ? "bg-red-500" : "bg-black/50"
                } text-white rounded-full text-xs flex justify-center items-center leading-[1rem] font-normal tracking-tighter px-1 py-1 mt-[-0.5rem] mr-[-0.5rem] z-10 drop-shadow-sm transform translate-x-1/2 translate-y-1/2 transition-all`}
              >
                {totalItems}
              </span>
            </button>
            <button
              onClick={() => {
                toast({
                  title: "No disponible",
                  description:
                    "Esta función no está disponible en este momento.",
                });
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <Heart
                color={`${isScrolled ? "#000" : "#fff"}`}
                className="transition-colors ml-2"
              />
            </button>
            <button
              onClick={() => {
                toast({
                  title: "No disponible",
                  description:
                    "Esta función no está disponible en este momento.",
                });
              }}
              className={`px-2 py-1 ${
                isScrolled ? "bg-black text-white" : "bg-white text-black"
              } rounded-md hover:opacity-80 transition-opacity`}
            >
              <User
                color={`${isScrolled ? "#fff" : "#000"}`}
                className="transition-colors"
                size={20}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú para pantallas pequeñas */}
      {isMenuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-white z-20 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 hover:opacity-80 transition-opacity"
          >
            <X className="w-8 h-8" />
          </button>
          <Link
            href="/"
            className="text-2xl font-normal mb-4 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/ropa"name
            className="text-2xl font-normal mb-4 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Pantalones
          </Link>
          <Link
            href="/ropa"
            className="text-2xl font-normal mb-4 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          <button
            className="text-2xl flex items-center gap-2 font-normal mb-4 relative hover:opacity-80 transition-opacity"
            onClick={() => {
              setIsMenuOpen(false);
              toast({
                title: "No disponible",
                description: "Próximamente en 2025.",
              });
            }}
          >
            Playeras
            <span className="w-16 h-4 text-orange-100 bg-orange-600 font-medium rounded-md text-xs flex justify-center items-center leading-[1rem] tracking-normal px-1 py-1">
              Próximo
            </span>
          </button>
        </nav>
      )}

      {/* Carrito */}
      <Cart openCart={isCartOpen} closeCart={toggleCart} />
    </>
  );
};

export default Header;
