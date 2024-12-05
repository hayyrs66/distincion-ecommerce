import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartProvider";
import { Toaster } from "../components/ui/toaster";
import Footer from "./components/Footer";

export const metadata = {
  title: "Distinción Guatemala",
  description: "Distinción, tienda de ropa en Guatemala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
