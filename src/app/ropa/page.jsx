"use client";
import { useState } from "react";
import { pantalones_general } from "../constants";
import Image from "next/image";

export default function Page() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todo");

  const pantalonesFiltrados =
    categoriaSeleccionada === "Todo"
      ? pantalones_general
      : pantalones_general.filter(
          (pantalon) => pantalon.tipo === categoriaSeleccionada
        );

  return (
    <section className="w-full h-full mt-20">
      <div className="px-8">
        <h3 className="text-2xl font-normal tracking-tight">Pantalones</h3>
        <div className="w-full mt-4 gap-2 flex items-center">
          <button
            className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
              categoriaSeleccionada === "Todo"
                ? "bg-black/90 border-black/80 text-white"
                : ""
            }`}
            onClick={() => setCategoriaSeleccionada("Todo")}
          >
            Todo
          </button>
          <button
            className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
              categoriaSeleccionada === "cargo"
                ? "bg-black/90 border-black/80 text-white"
                : ""
            }`}
            onClick={() => setCategoriaSeleccionada("cargo")}
          >
            Cargo
          </button>
          <button
            className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
              categoriaSeleccionada === "semirecto"
                ? "bg-black/90 border-black/80 text-white"
                : ""
            }`}
            onClick={() => setCategoriaSeleccionada("semirecto")}
          >
            Semirecto
          </button>
          <button
            className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
              categoriaSeleccionada === "ajustado"
                ? "bg-black/90 border-black/80 text-white"
                : ""
            }`}
            onClick={() => setCategoriaSeleccionada("ajustado")}
          >
            Ajustado
          </button>
          <button
            className={`font-normal tracking-tight text-sm text-black border px-3 py-1 rounded-[4px] ${
              categoriaSeleccionada === "jogger"
                ? "bg-black/90 border-black/80 text-white"
                : ""
            }`}
            onClick={() => setCategoriaSeleccionada("jogger")}
          >
            Jogger
          </button>
        </div>
      </div>

      {/* Lista de pantalones filtrados */}
      <div className="w-full grid grid-cols-4 gap-2 px-2 mt-6">
        {pantalonesFiltrados.length > 0 ? (
          pantalonesFiltrados.map((pantalon) => (
            <a key={pantalon.id} href={`/pantalon/${pantalon.tipo}`}>
              <article className="filter hover:filter">
                <div className="w-80 relative h-[390px]">
                  <Image
                    src={`/${pantalon.imagen}`}
                    alt={pantalon.nombre}
                    fill
                    style={{ objectFit: "cover" }}
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
