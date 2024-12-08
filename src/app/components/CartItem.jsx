import { X } from "lucide-react";

const colorNames = {
  azul: "Azul",
  besh: "Beige",
  cocoa: "Cocoa",
  gris_claro: "Gris Claro",
  gris_oscuro: "Gris Oscuro",
  kaki: "Kaki",
  negro: "Negro",
  verde: "Verde",
};

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const translatedColor = colorNames[item.color] || item.color;

  return (
    <article className="p-4 rounded-md flex justify-between items-center">
      {/* Detalles del Producto */}
      <div className="flex gap-4 items-center">
        <div>
          <img
            width={70}
            height={70}
            src={item.image}
            alt={`${item.name} - ${translatedColor}`}
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <h5 className="text-base font-semibold">{item.name}</h5>
          <p className="text-sm text-gray-500">Q{item.price.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm">
              {item.size} — {translatedColor}
            </p>
            <div
              className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center`}
            >
              <div
                style={{ backgroundColor: item.colorHex }}
                className="w-3 h-3 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controles de Cantidad y Eliminar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-sm">
          <button
            onClick={onDecrease}
            className="px-2 text-xl transition-colors active:bg-green-200"
            aria-label="Disminuir cantidad"
          >
            -
          </button>
          <span className="px-2 text-sm">{item.quantity}</span>
          <button
            onClick={onIncrease}
            className=" px-2 text-xl transition-colors active:bg-green-200"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <button
          onClick={onRemove}
          className="bg-[#F6F6F6] hover:bg-[#eeeeee] px-2 py-1 rounded-md transition-colors"
          aria-label="Eliminar artículo"
        >
          <X color="#5C5F6A" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
