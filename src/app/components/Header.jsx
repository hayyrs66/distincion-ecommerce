"use client";
import localFont from "next/font/local";
import { useEffect } from "react";
import BagLogo from "./BagLogo";

const things = localFont({
  src: [
    {
      path: "../fonts/second-quotes/SecondQuotes-Regular.ttf",
      weight: "400",
    },
  ],
});

const Header = () => {
  useEffect(() => {
    const headerColorScroll = () => {
      const titleElement = document.querySelector("[title-header]");
      const canastaElement = document.querySelector("[link-canasta]");
      const header = document.querySelector("header");
      const bagSvg = document.querySelector("[link-canasta] svg");

      console.log(bagSvg);

      if (window.scrollY > 30) {
        titleElement.classList.remove("animate-bigFont");
        titleElement.classList.remove("text-white");
        titleElement.classList.add("text-black");
        titleElement.classList.add("animate-smallFont");

        bagSvg.classList.remove("fill-white");
        bagSvg.classList.add("fill-black");

        canastaElement.classList.remove("text-white");
        canastaElement.classList.add("text-black");

        header.classList.add("backdrop-blur-sm", "bg-white");
      } else {
        header.classList.remove("backdrop-blur-sm", "bg-white");

        canastaElement.classList.remove("text-black");
        canastaElement.classList.add("text-white");

        bagSvg.setAttribute("fill", "#ffffff");

        bagSvg.classList.remove("fill-black");
        bagSvg.classList.add("fill-white");

        titleElement.classList.remove("animate-smallFont");
        titleElement.classList.remove("text-black");
        titleElement.classList.add("text-white");
        titleElement.classList.add("animate-bigFont");
      }
    };
    window.addEventListener("scroll", headerColorScroll);

    return () => {
      window.removeEventListener("scroll", headerColorScroll);
    };
  });

  return (
    <header className="w-full fixed top-0 left-0 py-4 z-10 items-center px-8 flex justify-between transition-all">
      <div className="flex flex-col justify-center">
        <h1
          title-header="Distinción"
          className={`${things.className} text-9xl -mx-1 tracking-tighters animate-bigFont font-medium text-white`}
        >
          Distinción
        </h1>
      </div>
      <div>
        <a
          link-canasta="canasta"
          href="#"
          className="flex gap-3 items-center text-xl text-white leading-[1rem]"
        >
          Canasta
          <BagLogo fillColor="fill-white" />
        </a>
      </div>
    </header>
  );
};

export default Header;
