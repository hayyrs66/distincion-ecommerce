import { Rubik } from "next/font/google";
import Link from "next/link";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 pt-12 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
        <div className="flex flex-col pb-12 gap-3 items-center justify-center">
          <Link href="/" title-header="Distinción">
            <h1
              className={`${rubik.className} text-2xl md:text-3xl text-black tracking-wide font-normal`}
            >
              DISTINCION
            </h1>
          </Link>
          <div className="flex flex-col items-center justify-center gap-1">
            <a
              href="tel:+50240245774"
              className="text-black font-light text-base w-fit"
            >
              +502 4024 5774
            </a>
            <a
              href="mailto:contacto@distincion.shop"
              className="text-black font-light text-base w-fit"
            >
              contacto@distincion.shop
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-black font-semibold text-lg">Explorar</h2>
          <Link href="/ropa" className="text-black font-light text-base">
            Toda la Ropa
          </Link>
          <Link href="/" className="text-black font-light text-base">
            Playeras
          </Link>
          <Link href="/" className="text-black font-light text-base">
            Nuevas Colecciones
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-black font-semibold text-lg">Información</h2>
          <Link href="/" className="text-black font-light text-base">
            Políticas de Privacidad
          </Link>
          <Link href="/" className="text-black font-light text-base">
            Términos y Condiciones
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-black font-semibold text-lg">Síguenos</h2>
          <a
            href="https://www.facebook.com/share/KqGvUA2NBkLPRSc3/?mibextid=LQQJ4d"
            className="text-black font-light text-base"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/distincion_gt/"
            className="text-black font-light text-base"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="flex justify-center border-t border-t-black/20 px-8 py-4 mt-8">
        <small className="text-sm text-center">
          &copy; {new Date().getFullYear()} Distinción. Todos los derechos
          reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
