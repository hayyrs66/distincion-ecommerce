// import localFont from "next/font/local";

// const leMurmure = localFont({
//   src: "../fonts/lemurmure/LeMurmure-Regular.woff2",
// });

const Hero = () => {
  return (
    <section className="relative w-full flex justify-center items-center h-[calc(100vh_+_5rem)] bg-[#838383]">
      {/* Contenido principal */}
      <div className="w-full relative h-full flex justify-center items-center">
        <div className="w-full h-full flex flex-wrap justify-center items-center">
          <h2
            className={` tracking-tight font-medium text-white text-clamp_hero`}
          >
            Cole
          </h2>
          <h2
            className={` tracking-tight font-medium text-white text_outline text-clamp_hero`}
          >
            cción
          </h2>
        </div>
        <img
          src="/person_hero.png"
          alt=""
          width={450}
          height={450}
          className="absolute bottom-0"
        />
      </div>
    </section>
  );
};

export default Hero;
