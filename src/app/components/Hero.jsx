import React from "react";
import Showcase from "./Showcase";

const Hero = () => {
  return (
    <section className="">
      <div className="w-full h-screen max-h-[550px] bg-hero-image bg-no-repeat bg-cover bg-top px-8 py-44">
        <div className="flex flex-col">
          <h2 className="text-white text-7xl max-w-[800px] text-balance font-medium">
            Tu Próximo Pantalón Aquí.
          </h2>
        </div>
      </div>
      <Showcase />
    </section>
  );
};

export default Hero;
