import Link from "next/link";
import Image from "next/image";

const MostSold = () => {
  return (
    <section className="w-full px-6 py-12">
      <span className="text-black/70 tracking-wider font-medium text-lg uppercase">
        Compra
      </span>
      <h3 className="text-black text-4xl tracking-tight font-normal mb-8"></h3>
      <div className="w-full gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* Contenedor para ambas imágenes */}
        <div className="flex flex-col order-2 lg:order-1 lg:flex-row justify-center relative w-full rounded-sm overflow-hidden gap-6">
          {/* Imagen 1 con footer */}
          <Link href="/pantalon/cargo" className="w-full">
            <div className="flex flex-col items-center w-full relative aspect-[3/4]">
              <div className="relative w-full h-0 pb-[133%] rounded-sm overflow-hidden">
                <Image
                  src="https://utfs.io/f/Kd9w79vOPqydMJ4ShGTL5xG9ipF4JrakdCHsfZDKmqylMAg6"
                  alt="Cargo Verde"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Link>

          {/* Imagen 2 con footer */}
          <Link href="/pantalon/jogger" className="w-full">
            <div className="flex flex-col items-center w-full relative aspect-[3/4]">
              <div className="relative w-full h-0 pb-[133%] rounded-sm overflow-hidden">
                <Image
                  src="https://utfs.io/f/Kd9w79vOPqyd942wJInalFt0XTYIjg6JRLUBMOW1mq89kohK"
                  alt="Jogger Negro"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Contenedor para contenido adicional */}
        <div className="flex flex-col h-full p-8 order-1 lg:order-2 px-4 lg:px-8 items-center lg:items-center rounded-sm mt-8 lg:mt-0">
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-medium text-[#877c59] tracking-tighter text-3xl md:text-8xl mb-4 text-center text-balance">
              Descuentos Abril
            </h3>
            <p className="leading-[1.5] max-w-lg text-black/80 text-pretty font-normal tbext-base md:text-lg mb-8 text-center">
              Nuestros pantalones más vendidos tienen descuentos especiales por
              tiempo limitado. Renueva tu estilo con calidad y precio increíble.
              ¡No lo dejes pasar!
            </p>
            <Link
              href="/ropa"
              className="flex items-center gap-2 text-[#877c59] border border-[#877c59] font-normal text-xl  w-fit px-4 py-2 rounded-sm hover:bg-[#ffeec6] transition-all"
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
