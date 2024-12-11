import { Rubik } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-black border-b border-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Sección Newsletter */}
          <div className="py-12 pr-4 px-6 relative overflow-hidden md:border-r md:border-r-white">
            {/* Formulario de suscripción con burbujas before/after */}
            <form className="text-neutral-800 py-6 rounded-lg w-full h-full flex flex-col justify-around">
              <div className="before:absolute before:w-32 before:h-20 mb-4 before:right-2 before:bg-rose-300/50 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300/50 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6">
                <span className="font-medium text-2xl text-white block mb-2">
                  Mantente al día
                </span>
                <p className="text-neutral-500 text-sm leading-[1.5] mb-4">
                  Suscríbete a nuestro boletín y sé el primero en enterarte de
                  las últimas noticias y ofertas.
                </p>
                {/* Burbujas decorativas */}
                <div
                  className="
                  before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300/50 before:-z-10 before:rounded-full before:blur-xl before:-top-12 
                  after:absolute after:w-24 after:h-24 after:bg-purple-300/50 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6
                "
                ></div>
              </div>

              <div className="flex gap-1">
                <div className="flex items-center bg-black border-b border-neutral-500 text-neutral-200 w-full p-2.5">
                  <input
                    type="email"
                    aria-label="Correo electrónico"
                    className="outline-none bg-transparent flex-1 placeholder-neutral-400"
                    placeholder="Email..."
                    required
                  />
                  <button type="submit" className="ml-2">
                    <ArrowRight className="text-neutral-200" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sección Nosotros */}
          <div className="py-8 px-6 md:border-r md:border-r-white">
            <span className="font-normal text-base text-white uppercase">
              Nosotros
            </span>
            <div className="mt-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/politicas"
                    className="text-white font-normal text-base hover:text-rose-300 transition-colors"
                  >
                    Políticas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas"
                    className="text-white font-normal text-base hover:text-rose-300 transition-colors"
                  >
                    Políticas de reembolso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas"
                    className="text-white font-normal text-base hover:text-rose-300 transition-colors"
                  >
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sección Redes Sociales y Contacto */}
          <div className="py-8 px-6">
            <span className="font-normal text-base text-white uppercase">
              Síguenos
            </span>
            <div className="mt-2 mb-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/share/KqGvUA2NBkLPRSc3/?mibextid=LQQJ4d"
                    className="text-white font-normal text-base hover:text-rose-300 transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/distincion_gt/"
                    className="text-white font-normal text-base hover:text-rose-300 transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <span className="font-normal text-base text-white uppercase">
              Contacto
            </span>
            <div className="mt-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    target="_blank"
                    href="https://wa.me/50231135906"
                    className="text-green-500 font-normal text-base hover:text-green-300 transition-colors"
                  >
                    WhatsApp
                  </Link>
                </li>
                <li>
                  <Link
                    id="correo"
                    href="mailto:contacto@distincion.shop"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-purple-200 hover:from-rose-300 hover:to-purple-300 transition-colors font-normal text-base"
                  >
                    contacto@distincion.shop
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <section className="w-full h-full flex justify-center items-center py-4 bg-black">
        <small className="text-white">
          &copy; 2024 Distinción. Todos los derechos reservados.
        </small>
      </section>
    </>
  );
};

export default Footer;
