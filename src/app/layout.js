import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
import { CartProvider } from "./context/CartProvider";

import { Toaster } from "../components/ui/toaster";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Distinción Guatemala",
  description: "Distinción, tienda de ropa en Guatemala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
