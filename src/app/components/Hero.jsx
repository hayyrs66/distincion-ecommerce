import React from "react";
import Showcase from "./Showcase";

const Hero = () => {
  return (
    <section className="">
      <div className="w-full h-screen max-h-[550px] bg-hero-image bg-no-repeat bg-cover bg-top px-8 py-36">
        <div className="flex flex-col">
          <h2 className="text-white/80 text-2xl font-medium">
            Tu Próximo Pantalón, Aquí
          </h2>
        </div>
      </div>
      <Showcase />
    </section>
  );
};

export default Hero;
