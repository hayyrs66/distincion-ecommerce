import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full relative h-screen max-h-[550px] bg-no-repeat bg-cover px-4 bg-top">
      <div className="w-auto -z-10 h-full absolute top-1/2 left-4 right-4 -translate-y-1/2 bg-[#f3f3f3]" />
      <div className="w-full h-full flex items-center px-24">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center gap-3">
            <span className="text-black text-3xl max-w-[800px] text-balance tracking-tight font-normal">
              Clásicos Exclusivos
            </span>
            <h2 className="text-black text-5xl max-w-[800px] text-balance tracking-tight font-semibold">
              Colección de Hombres
            </h2>
            <p className="text-black text-xl max-w-[800px] text-balance tracking-tight font-light">
              Ahorra hasta el 40%
            </p>
            <Link
            href="/ropa"
            className="flex items-center gap-2 text-white font-normal text-sm bg-black w-fit px-4 py-2 rounded-md"
          >
            Explorar Ahora
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="filter fill-white"
            >
              <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
            </svg> */}
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
