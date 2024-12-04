import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-no-repeat bg-cover bg-top">
      {/* Fondo gris detrás */}
      <div className="absolute inset-0 -z-10"></div>
      {/* Contenido principal */}
      <div className="w-full flex h-full items-center bg-indigo-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full items-center">
          {/* Columna de texto */}
          <div className="flex flex-col gap-4 h-full w-full justify-center px-12">
            <span className="text-black text-4xl text-balance tracking-tight font-normal">
              Clásicos Exclusivos
            </span>
            <h2 className="text-black bg-clip-text text-transparent bg-gradient-to-r uppercase from-black to-black/70 text-6xl w-full tracking-tight font-semibold leading-tight">
              Colección de Hombres
            </h2>
            <p className="text-black text-base md:text-xl max-w-[800px] text-balance tracking-tight font-normal">
              Ahorra hasta el 40%
            </p>
            <Link
              href="/ropa"
              className="flex items-center gap-2 text-white font-normal text-sm bg-black w-fit px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Explorar Ahora
            </Link>
          </div>

          {/* Columna de imagen */}
          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src="/assets/content/hero.png"
              alt="Pantalón cargo y ajustado"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md transition-all duration-500"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
