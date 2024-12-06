'use client'
import Link from "next/link";

const Newsletter = () => {
  return (
    <section className="w-full flex flex-col gap-6 justify-center items-center px-6 py-16 mt-24 bg-gray-100">
      <h4 className="text-black text-3xl md:text-4xl font-medium text-center">
        Suscríbete a Nuestra Newsletter
      </h4>
      <p className="text-black/70 text-base md:text-lg max-w-2xl text-center leading-[1.5]">
        Recibe las últimas colecciones, ofertas exclusivas y tips de estilo
        directamente en tu correo. ¡Únete a nuestra newsletter y renueva tu
        look!
      </p>
      <Link
        href="/ropa"
        className="flex items-center gap-2 text-white font-normal text-sm md:text-base bg-black w-fit px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
      >
        Suscríbete
      </Link>
      <button onClick={ async () => {

        const res = await fetch("/api/send", {
          method: "POST",
        })

        const data = await res.json();
        console.log(data);
        
      }} className="flex items-center gap-2 text-white font-normal text-sm md:text-base bg-black w-fit px-4 py-2 rounded-md hover:bg-gray-800 transition-all">
        Email prueba
      </button>
    </section>
  );
};

export default Newsletter;
