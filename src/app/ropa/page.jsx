"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { pantalones_general } from "../constants";
import ImageSkeleton from "../components/ImageSkeleton";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todo");

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
    <section className="w-full h-full mt-20">
      <div className="px-8">
        <h3 className="text-2xl font-normal tracking-tight">Pantalones</h3>
        <div className="w-full mt-4 gap-2 flex items-center">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
                categoriaSeleccionada.toLowerCase() === categoria.toLowerCase()
                  ? "bg-black/90 border-black/80 text-white"
                  : ""
              }`}
              onClick={() => handleCategoriaClick(categoria)}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de pantalones filtrados */}
      <div className="w-full grid grid-cols-4 gap-2 px-2 mt-6">
        {pantalonesFiltrados.length > 0 ? (
          pantalonesFiltrados.map((pantalon) => (
            <a key={pantalon.id} href={`/pantalon/${pantalon.tipo}`}>
              <article className="filter hover:filter">
                <div className="w-80 relative h-[390px]">
                  <ImageSkeleton
                    src={`/${pantalon.imagen}`}
                    alt={pantalon.nombre}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="empty"
                  />
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
    </section>
  );
}
