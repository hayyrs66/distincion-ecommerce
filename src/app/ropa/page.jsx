"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { pantalones_general } from "../constants";
import ImageSkeleton from "../components/ImageSkeleton";
import { ChevronUp } from "lucide-react";

function PantalonesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todo");
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const categoria = searchParams.get("categoria");
    if (categoria && typeof categoria === "string") {
      const categoriaValida = pantalones_general.some(
        (pantalon) => pantalon.tipo.toLowerCase() === categoria.toLowerCase()
      );
      setCategoriaSeleccionada(categoriaValida ? categoria : "Todo");
    } else {
      setCategoriaSeleccionada("Todo");
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300); // Muestra el botón si el scroll supera 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pantalonesFiltrados =
    categoriaSeleccionada.toLowerCase() === "todo"
      ? pantalones_general
      : pantalones_general.filter(
          (pantalon) =>
            pantalon.tipo.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );

  const categorias = ["Todo", "cargo", "semirecto", "ajustado", "jogger"];

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    if (categoria.toLowerCase() === "todo") {
      router.push("/ropa");
    } else {
      router.push(`/ropa?categoria=${categoria.toLowerCase()}`);
    }
  };

  return (
    <section className="w-full h-full mt-20 pb-24 px-6">
      <div className="container">
        {/* Categorías horizontales */}
        <div className="flex overflow-x-auto py-4 border-b border-gray-200 gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoriaClick(categoria)}
              className={`px-4 py-2 rounded-sm text-sm font-medium ${
                categoriaSeleccionada.toLowerCase() === categoria.toLowerCase()
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>

        {/* Pantalones */}
        <div className="mt-8">
          <h3 className="text-2xl font-normal tracking-tight mb-4">
            Pantalones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pantalonesFiltrados.length > 0 ? (
              pantalonesFiltrados.map((pantalon) => (
                <a key={pantalon.id} href={`/pantalon/${pantalon.tipo}`}>
                  <article>
                    <div className="w-full relative">
                      <div className="aspect-[3/4]">
                        <ImageSkeleton
                          src={pantalon.imagen}
                          alt={pantalon.nombre}
                          fill
                          style={{ objectFit: "cover" }}
                          placeholder="empty"
                        />
                      </div>
                    </div>
                    <div className="px-2 py-4">
                      <h4 className="text-base leading-4 tracking-tight font-normal">
                        {pantalon.nombre}
                      </h4>
                      <p className="text-sm font-bold text-black/70">
                        GTQ{pantalon.precio}
                      </p>
                    </div>
                  </article>
                </a>
              ))
            ) : (
              <p>No hay pantalones disponibles para esta categoría.</p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de Subir */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-800 duration-300"
          aria-label="Subir"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PantalonesPage />
    </Suspense>
  );
}
