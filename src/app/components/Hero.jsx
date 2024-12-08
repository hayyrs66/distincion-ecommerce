import localFont from "next/font/local";
import Image from "next/image";

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
            className={`${leMurmure.className} tracking-tight font-medium text-white text-clamp_hero`}
          >
            Cole
          </h2>
          <h2
            className={`${leMurmure.className} tracking-tight font-medium text-white text_outline text-clamp_hero`}
          >
            cción
          </h2>
        </div>
        <Image
          src="https://utfs.io/f/Kd9w79vOPqyd8cY6sbUB01NaS3tClvQjIHkeVcwJ7DY5nLMh"
          alt="Modelo con pantalón cargo de tienda Distinción Guatemala"
          width={450}
          height={450}
          className="absolute bottom-0"
        />
      </div>
    </section>
  );
};

export default Hero;
