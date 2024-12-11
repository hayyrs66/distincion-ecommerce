import Link from "next/link";
import { pantalones_general } from "../../constants";
import ImageSkeleton from "@components/ImageSkeleton";
import ScrollToTopButton from "@components/ScrollToTopButton";

export default function Page({ searchParams }) {
  const { categoria } = searchParams;
  const categoriaValida = categoria && pantalones_general.some(
    (pantalon) => pantalon.tipo.toLowerCase() === categoria.toLowerCase()
  );

  const categoriaSeleccionada = categoriaValida ? categoria : "Todo";

  const pantalonesFiltrados =
    categoriaSeleccionada.toLowerCase() === "todo"
      ? pantalones_general
      : pantalones_general.filter(
          (pantalon) =>
            pantalon.tipo.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );

  const categorias = ["Todo", "cargo", "semirecto", "ajustado", "jogger"];

  return (
    <section className="w-full h-full mt-20 pb-24 px-6">
      <div className="w-full">
        {/* Categorías horizontales */}
        <div className="flex overflow-x-auto py-4 border-b border-gray-200 gap-2">
          {categorias.map((cat) => {
            const isSelected = categoriaSeleccionada.toLowerCase() === cat.toLowerCase();
            const href = cat.toLowerCase() === "todo" ? "/ropa" : `/ropa?categoria=${cat.toLowerCase()}`;
            return (
              <Link key={cat} href={href}>
                <button
                  className={`px-4 py-2 rounded-sm text-sm font-medium ${
                    isSelected ? "bg-black text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </Link>
            );
          })}
        </div>

        {/* Pantalones */}
        <div className="mt-8">
          <h3 className="text-2xl font-normal tracking-tight mb-4">Pantalones</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pantalonesFiltrados.length > 0 ? (
              pantalonesFiltrados.map((pantalon) => (
                <Link key={pantalon.id} href={`/pantalon/${pantalon.tipo}`}>
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
                </Link>
              ))
            ) : (
              <p>No hay pantalones disponibles para esta categoría.</p>
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
}
