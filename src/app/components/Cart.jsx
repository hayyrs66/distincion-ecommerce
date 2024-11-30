import Close from "./icons/Close";

const Cart = ({ openCart, closeCart }) => {
  return (
    <section
      className={`fixed top-0 right-0 p-8 w-[400px] h-full drop-shadow-xl bg-white z-20 transition-transform duration-300 ${
        openCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <h4>Tus productos</h4>
        <button onClick={closeCart}>
          <Close />
        </button>
      </div>
    </section>
  );
};

export default Cart;
