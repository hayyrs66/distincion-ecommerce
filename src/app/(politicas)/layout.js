import Link from "next/link";
import { Rubik } from "next/font/google";
import { Poppins } from "next/font/google";
import "@/app/globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});

export default function PoliticasLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header className="py-2 border-b">
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className={`${rubik.className} text-3xl tracking-wider font-extralight hover:opacity-80 transition-opacity`}
            >
              DISTINCION
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
