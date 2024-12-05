"use client";
import { useEffect, useState, use } from "react";
import { pantalones } from "../../constants";
import { useCart } from "../../context/CartProvider";
import { useToast } from "../../../hooks/use-toast";
import ImageSkeleton from "../../components/ImageSkeleton";

export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedPantalon, setSelectedPantalon] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const pantalon = pantalones.find((p) => p.tipo === params.id);
    setSelectedPantalon(pantalon);

    if (pantalon) {
      const defaultColor = Object.keys(pantalon.imagenes[0])[0];
      setSelectedColor(defaultColor);
    }
  }, [params.id]);

  function getColorHex(color) {
    const colorMap = {
      azul: "#0a1438",
      besh: "#ede9d0",
      cocoa: "#835c3f",
      gris_claro: "#b4b3b1",
      gris_oscuro: "#2f3437",
      kaki: "#e9a404",
      negro: "#000",
      verde: "#769e46",
    };

    return colorMap[color] || "#fff";
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Seleccione una talla",
        description: "Debe seleccionar una talla antes de agregar al carrito",
      });
      return;
    }

    addToCart({
      id: selectedPantalon.id,
      name: selectedPantalon.nombre,
      price: selectedPantalon.precio,
      size: selectedSize,
      color: selectedColor,
      colorHex: getColorHex(selectedColor),
      image: selectedPantalon.imagenes[0][selectedColor][0],
    });

    toast({
      title: "Producto añadido",
      description: "El producto fue añadido a la canasta",
    });
  };

  if (!selectedPantalon) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-[60%_40%]">
      {/* Detalles del Pantalón */}
      <div className="w-full relative order-1 mt-10 lg:mt-0 lg:order-2">
        <div className="mt-5 p-5 lg:mt-10 lg:p-10 top-0 lg:top-10 lg:sticky">
          <h2 className="text-black/80 text-lg font-normal">
            {selectedPantalon.nombre}
          </h2>
          <data
            className="text-black font-semibold text-lg"
            value={selectedPantalon.precio}
          >
            GTQ{selectedPantalon.precio}
          </data>

          {/* Selector de Talla */}
          <div className="mt-5">
            <fieldset className="flex gap-2">
              <legend className="mb-2">Selecciona la talla</legend>
              {["28", "30", "32", "34", "36"].map((size) => (
                <label key={size}>
                  <input
                    className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                             after:absolute after:content-[attr(value)] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                    type="radio"
                    name="size"
                    value={size}
                    onChange={() => setSelectedSize(size)}
                  />
                </label>
              ))}
            </fieldset>
          </div>

          {/* Selector de Color */}
          <div className="w-full border-t mt-3 pt-2">
            <fieldset className="flex gap-2">
              <legend className="mb-2">Selecciona el color</legend>
              {Object.keys(selectedPantalon.imagenes[0]).map((color) => (
                <label key={color} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="hidden"
                  />
                  {/* Círculo representando el color */}
                  <div
                    className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <div
                      style={{ backgroundColor: getColorHex(color) }}
                      className="w-4 h-4 rounded-full"
                    />
                  </div>
                </label>
              ))}
            </fieldset>
          </div>
          {/* Añadir al Carrito */}
          <div>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="bg-black rounded-md mb-4 text-white w-full py-3 mt-8 flex justify-center items-center gap-2"
            >
              Añadir a la canasta
            </button>
          </div>
        </div>
      </div>

      {/* Galería de Imágenes */}
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-1 order-2 lg:order-1">
        {selectedPantalon.imagenes[0][selectedColor].map((imagen, index) => (
          <figure key={index} className="relative w-full">
            <div className="aspect-[3/4]">
              <ImageSkeleton
                src={`/${imagen}`}
                alt={`${selectedPantalon.nombre} ${selectedColor} imagen ${
                  index + 1
                }`}
                fill
                style={{ objectFit: "cover" }}
                placeholder="empty"
                priority
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
