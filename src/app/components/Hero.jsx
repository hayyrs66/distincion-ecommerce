import localFont from "next/font/local";

const leMurmure = localFont({
  src: "../fonts/lemurmure/LeMurmure-Regular.woff2",
});

const Hero = () => {
  return (
    <section className="relative w-full flex justify-center items-center h-[calc(100vh_+_5rem)] bg-[#838383]">
      {/* Contenido principal */}
      <div className="w-full relative h-full flex justify-center items-center">
        <div className="w-full h-full flex flex-wrap justify-center items-center">
          <h2
            className={`${leMurmure.className} text-[5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] xl:text-[25rem] 2xl:text-[30rem] tracking-tight font-medium text-white`}
          >
            Cole
          </h2>
          <h2
            className={`${leMurmure.className} text_outline text-[5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] xl:text-[25rem] 2xl:text-[30rem]`}
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
