import Link from "next/link";

const MostSold = () => {
  return (
    <section className="w-full px-6 mt-24">
      <span className="text-black/70 tracking-wider font-medium text-lg uppercase">
        Compra
      </span>
      <h3 className="text-black text-4xl tracking-tight font-normal mb-8">
        Los Más Vendidos
      </h3>
      <div className="w-full gap-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Contenedor para ambas imágenes */}
        <div className="flex flex-col lg:flex-row justify-center relative w-full rounded-sm overflow-hidden gap-4">
          {/* Imagen 1 con footer */}
          <div className="flex flex-col items-center w-full">
            <img
              src="/assets/real_fotos/cargo/CARGO-VERDE-ADELANTE.webp"
              alt="Cargo Verde"
              className="object-cover w-full h-auto rounded-sm"
            />
            <div className="w-full p-2">
              <span className="text-base text-black tracking-tight">
                Pantalón Cargo Verde
              </span>
              <p className="text-sm font-semibold">
                GTQ200{" "}
                <span className="line-through text-gray-600">GTQ230</span>
              </p>
            </div>
          </div>

          {/* Imagen 2 con footer */}
          <div className="flex flex-col items-center w-full">
            <img
              src="/assets/real_fotos/jogger/JOGGER-NEGRO-ADELANTE.webp"
              alt="Jogger Negro"
              className="object-cover w-full h-auto rounded-sm"
            />
            <div className="w-full p-2">
              <span className="text-base text-black tracking-tight">
                Pantalón Jogger Negro
              </span>
              <p className="text-sm font-semibold">
                GTQ170{" "}
                <span className="line-through text-gray-600">GTQ230</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contenedor para contenido adicional */}
        <div className="flex flex-col h-auto lg:h-[calc(100%-100px)] px-4 lg:px-8 items-center lg:items-center rounded-sm mt-8 lg:mt-0">
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-normal tracking-tighter text-3xl md:text-4xl mb-4 text-center lg:text-left">
              Descuentos de Diciembre
            </h3>
            <p className="leading-[1.5] max-w-lg text-black/80 font-normal text-base md:text-lg mb-8 text-center lg:text-left">
              Nuestros pantalones más vendidos tienen descuentos especiales por
              tiempo limitado. Renueva tu estilo con calidad y precio increíble.
              ¡No lo dejes pasar!
            </p>
            <Link
              href="/ropa"
              className="flex items-center gap-2 text-white font-normal text-sm bg-black w-fit px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Explorar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostSold;
