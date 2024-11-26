"use client";
import { useState } from "react";

export default function Page() {
  // Datos de ejemplo para los pantalones
  const pantalones = [
    { id: 1, tipo: "Cargo", nombre: "Pantalón Cargo 1" },
    { id: 2, tipo: "Semirecto", nombre: "Pantalón Semirecto 1" },
    { id: 3, tipo: "Ajustado", nombre: "Pantalón Ajustado 1" },
    { id: 4, tipo: "Jogger", nombre: "Pantalón Jogger 1" },
    { id: 5, tipo: "Cargo", nombre: "Pantalón Cargo 2" },
    { id: 6, tipo: "Semirecto", nombre: "Pantalón Semirecto 2" },
    // Añadir más pantalones según sea necesario
  ];

  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todo");

  // Filtra los pantalones según la categoría seleccionada
  const pantalonesFiltrados =
    categoriaSeleccionada === "Todo"
      ? pantalones
      : pantalones.filter(
          (pantalon) => pantalon.tipo === categoriaSeleccionada
        );

  return (
    <section className="w-full h-full px-8 mt-20">
      <h3 className="text-2xl font-normal tracking-tight">Pantalones</h3>
      <div className="w-full mt-4 gap-2 flex items-center">
        <button
          className={`font-normal tracking-tight text-black border px-2 rounded-[4px] ${
            categoriaSeleccionada === "Todo"
              ? "bg-black/90 border-black/80 text-white"
              : ""
          }`}
          onClick={() => setCategoriaSeleccionada("Todo")}
        >
          Todo
        </button>
        <button
          className={`font-normal tracking-tight text-black border px-2 rounded-[4px] ${
            categoriaSeleccionada === "Cargo"
              ? "bg-black/90 border-black/80 text-white"
              : ""
          }`}
          onClick={() => setCategoriaSeleccionada("Cargo")}
        >
          Cargo
        </button>
        <button
          className={`font-normal tracking-tight text-black border px-2 rounded-[4px] ${
            categoriaSeleccionada === "Semirecto"
              ? "bg-black/90 border-black/80 text-white"
              : ""
          }`}
          onClick={() => setCategoriaSeleccionada("Semirecto")}
        >
          Semirecto
        </button>
        <button
          className={`font-normal tracking-tight text-black border px-2 rounded-[4px] ${
            categoriaSeleccionada === "Ajustado"
              ? "bg-black/90 border-black/80 text-white"
              : ""
          }`}
          onClick={() => setCategoriaSeleccionada("Ajustado")}
        >
          Ajustado
        </button>
        <button
          className={`font-normal tracking-tight text-black border px-2 rounded-[4px] ${
            categoriaSeleccionada === "Jogger"
              ? "bg-black/90 border-black/80 text-white"
              : ""
          }`}
          onClick={() => setCategoriaSeleccionada("Jogger")}
        >
          Jogger
        </button>
      </div>

      {/* Lista de pantalones filtrados */}
      <div className="mt-6">
        {pantalonesFiltrados.length > 0 ? (
          pantalonesFiltrados.map((pantalon) => (
            <div key={pantalon.id}>{pantalon.nombre}</div>
          ))
        ) : (
          <p>No hay pantalones disponibles para esta categoría.</p>
        )}
      </div>
    </section>
  );
}
