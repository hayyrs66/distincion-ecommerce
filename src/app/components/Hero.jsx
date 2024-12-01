import React from "react";
import Showcase from "./Showcase";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="">
      <div className="w-full h-screen max-h-[550px] bg-hero-image bg-no-repeat bg-cover bg-top px-8 py-44">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-7xl max-w-[800px] text-balance font-medium">
            Tu Próximo Pantalón Aquí.
          </h2>
          <Link
            href="/ropa"
            className="flex items-center gap-2 text-black font-medium text-xl bg-white w-fit px-4 py-2 rounded-md"
          >
            Compra y Explora
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="filter fill-black"
            >
              <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
            </svg>
          </Link>
        </div>
      </div>
      <Showcase />
    </section>
  );
};

export default Hero;
