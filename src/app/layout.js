import "./globals.css";
import Header from "./components/Header";
import { Roboto } from "next/font/google";
import { CartProvider } from "./context/CartProvider";
import { Toaster } from "../components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700",  "900"],
});

export const metadata = {
  title: "Distinción Guatemala",
  description: "Distinción, tienda de ropa en Guatemala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans`}>
        <CartProvider>
          <Header />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
