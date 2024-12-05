import { Rubik } from "next/font/google";
import Link from "next/link";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Footer = () => {
  return (
    <footer className="w-full px-12 pt-12 border-t">
      <div className="grid grid-cols-4 w-full">
        <div className="flex flex-col pb-12 gap-3">
          <Link href="/" title-header="Distinción">
            <h1
              className={`${rubik.className} text-3xl text-black tracking-wide font-normal text-black"`}
            >
              DISTINCION
            </h1>
          </Link>
          <div className="flex flex-col gap-1">
            <a
              href="tel:+50240245774"
              className="text-black font-light text-base w-fit"
            >
              +502 4024 5774
            </a>
            <a
              href="mail:contacto@distincion.shop"
              className="text-black font-light text-base w-fit"
            >
              contacto@distincion.shop
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-semibold text-base">Explorar</h2>
          <Link href="/ropa" className="text-black font-light text-base">
            Toda la Ropa
          </Link>
          <Link href="/calzado" className="text-black font-light text-base">
            Playeras
          </Link>
          <Link href="/accesorios" className="text-black font-light text-base">
            Nuevas Colecciones
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-semibold text-base">Información</h2>
          <Link href="/politicas" className="text-black font-light text-base">
            Políticas de Privacidad
          </Link>
          <Link href="/terminos" className="text-black font-light text-base">
            Términos y Condiciones
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-semibold text-base">Síguenos</h2>
          <a
            href="https://facebook.com/distincion"
            className="text-black font-light text-base"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/distincion"
            className="text-black font-light text-base"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="flex justify-center border-t border-t-black/20 px-8 py-4">
        <small>
          &copy; {new Date().getFullYear()} Distinción. Todos los derechos
          reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
