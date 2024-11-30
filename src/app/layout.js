import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
import { CartProvider } from "./context/CartProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Distinción Guatemala",
  description: "Distinción, tienda de ropa en Guatemala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
