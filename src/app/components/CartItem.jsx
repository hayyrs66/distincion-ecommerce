import { useEffect } from "react";
import Down from "./icons/Down";
import Trash from "./icons/Trash";
import Up from "./icons/Up";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  useEffect(() => {
    console.log("CartItem render, item:", item);
  }, []);

  return (
    <article className="border-b border-b-black/10 p-4 rounded-md flex justify-between items-center">
      {/* Detalles del Producto */}
      <div className="flex gap-4 items-center">
        <div>
          <img
            width={70}
            height={70}
            src={`/${item.image}`}
            alt={`${item.name} - ${item.color}`}
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <h5 className="text-base font-semibold">{item.name}</h5>
          <p className="text-sm text-gray-500">Q{item.price.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm">
              {item.size} - {item.color}
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
        <div className="flex items-center">
          <button
            onClick={onDecrease}
            className="bg-gray-200 rounded-md hover:bg-gray-300 transition-colors active:bg-green-200"
            aria-label="Disminuir cantidad"
          >
            <Down />
          </button>
          <span className="px-2 text-sm">{item.quantity}</span>
          <button
            onClick={onIncrease}
            className="bg-gray-200 rounded-md hover:bg-gray-300 transition-colors active:bg-green-200"
            aria-label="Aumentar cantidad"
          >
            <Up />
          </button>
        </div>
        <button
          onClick={onRemove}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md"
          aria-label="Eliminar artículo"
        >
          <Trash />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
