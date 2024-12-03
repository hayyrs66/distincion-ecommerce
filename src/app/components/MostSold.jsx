import Link from "next/link";

const MostSold = () => {
  return (
    <section className="w-full px-6 pt-12">
      <h3 className="text-black text-3xl text-balance tracking-tight font-normal mb-8">
        Los Más Vendidos
      </h3>
      <div className="w-full gap-4 grid grid-cols-2">
        {/* Contenedor para ambas imágenes */}
        <div className="flex justify-center relative w-full rounded-sm overflow-hidden gap-4">
          {/* Imagen 1 con footer */}
          <div className="flex flex-col items-center w-full">
            <img
              src="/assets/real_fotos/cargo/CARGO-VERDE-ADELANTE.webp"
              alt="Cargo Verde"
              className="object-cover w-full min-h-[400px] max-h-[400px] rounded-sm"
            />
            <div className="w-full p-2">
              <span className="text-base text-black tracking-tight">
                Pantalón Cargo Verde
              </span>
              <p className="text-sm font-semibold">
                GTQ170{" "}
                <span className="line-through text-gray-600">GTQ230</span>
              </p>
            </div>
          </div>

          {/* Imagen 2 con footer */}
          <div className="flex flex-col items-center w-full">
            <img
              src="/assets/real_fotos/jogger/JOGGER-NEGRO-ADELANTE.webp"
              alt="Jogger Negro"
              className="object-cover w-full min-h-[400px] max-h-[400px] rounded-sm"
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

        {/* Otro contenedor para contenido adicional */}
        <div className="flex px-8 items-center rounded-sm">
          <div className="flex flex-col">
            <h3 className="font-medium tracking-tighter text-4xl mb-4">
              Descuentos de Diciembre
            </h3>
            <p className="leading-[1.5] text-black/80 font-normal text-pretty mb-8">
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
