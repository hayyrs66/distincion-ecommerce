export default function Page() {
  return (
    <section className="w-full h-full grid grid-cols-clothes-section">
      <div className="w-full grid grid-cols-2 gap-2">
        <figure>
          <img src="assets/ropa/1.jpg" alt="" />
        </figure>
        <figure>
          <img src="assets/ropa/2.jpg" alt="" />
        </figure>
        <figure>
          <img src="assets/ropa/3.jpg" alt="" />
        </figure>
        <figure>
          <img src="assets/ropa/4.jpg" alt="" />
        </figure>
      </div>
      <div className="w-full relative">
        <div className="mt-10 p-10 top-10 sticky">
          <h2 className="text-black/80 text-lg font-normal">
            Pantalón jogger cargo
          </h2>
          <data className="text-black font-semibold text-lg" value="320">
            Q320
          </data>
          {/* Size select */}
          <div className="mt-5">
            <fieldset className="flex gap-2">
              <legend className="mb-2">Selecciona la talla</legend>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                     after:absolute after:content-['XS'] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                  type="radio"
                  name="size"
                  value="XS"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                     after:absolute after:content-['S'] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                  type="radio"
                  name="size"
                  value="S"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                     after:absolute after:content-['M'] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                  type="radio"
                  name="size"
                  value="M"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                     after:absolute after:content-['L'] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                  type="radio"
                  name="size"
                  value="L"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-600 checked:text-white checked:bg-black cursor-pointer
                     after:absolute after:content-['XL'] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs transition-colors"
                  type="radio"
                  name="size"
                  value="XL"
                />
              </label>
            </fieldset>
          </div>
          <div className="w-full border-t mt-3 pt-2">
            <fieldset className="flex gap-2">
              <legend className="mb-2">Selecciona el color</legend>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-300 cursor-pointer
                     after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs
                     after:bg-gray-900 after:w-[1.85rem] after:h-[1.85rem] after:rounded-full checked:border-gray-600 transition-colors"
                  type="radio"
                  name="color"
                  value="gray"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-300 cursor-pointer
                     after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs
                     after:bg-amber-300 after:w-[1.85rem] after:h-[1.85rem] after:rounded-full checked:border-gray-600 transition-colors"
                  type="radio"
                  name="color"
                  value="gray"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-300 cursor-pointer
                     after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs
                     after:bg-blue-300 after:w-[1.85rem] after:h-[1.85rem] after:rounded-full checked:border-gray-600 transition-colors"
                  type="radio"
                  name="color"
                  value="gray"
                />
              </label>
              <label>
                <input
                  className="appearance-none relative bg-white w-9 h-9 rounded-full border border-gray-300 cursor-pointer
                     after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs
                     after:bg-blue-900 after:w-[1.85rem] after:h-[1.85rem] after:rounded-full checked:border-gray-600 transition-colors"
                  type="radio"
                  name="color"
                  value="gray"
                />
              </label>
            </fieldset>
          </div>
          <div>
            <button className="bg-black rounded-md mb-4 text-white w-full py-3 mt-8 flex justify-center items-center gap-2">
              Añadir a la canasta
              <img src="assets/icons/cart.svg" alt="" />
            </button>
            <span className="text-sm text-blue-800">Guía de tallas.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
