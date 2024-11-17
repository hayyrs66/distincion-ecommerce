const Showcase = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-2 p-2">
      <div className="w-full relative cursor-pointer">
        <img
          src="assets/images/cargo.jpg"
          className="filter brightness-[.7] hover:brightness-[0.6] transition-all"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/">
          <h3 className="text-4xl stroke-black font-medium text-white">
            Cargo
          </h3>
        </div>
      </div>
      <div className="w-full relative cursor-pointer">
        <img
          src="assets/images/recto.jpg"
          className="filter brightness-[.7] hover:brightness-[0.6] transition-all"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/">
          <h3 className="text-4xl font-medium text-white">Semirecto</h3>
        </div>
      </div>
      <div className="w-full relative cursor-pointer">
        <img
          src="assets/images/skinny.jpg"
          className="filter brightness-[.7] hover:brightness-[0.6] transition-all"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/">
          <h3 className="text-4xl font-medium text-white">Ajustado</h3>
        </div>
      </div>
      <div className="w-full relative cursor-pointer">
        <img
          src="assets/images/jogger.jpg"
          className="filter brightness-[.7] hover:brightness-[0.6] transition-all"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/">
          <h3 className="text-4xl font-medium text-white">Jogger</h3>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
