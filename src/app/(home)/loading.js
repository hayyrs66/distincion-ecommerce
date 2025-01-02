export default function loading() {
  return (
    /* From Uiverse.io by devAaus */
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white flex-col gap-4 w-full h-screen z-30 flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-black/50 text-2xl animate-spin flex items-center justify-center border-t-black/50 rounded-full"></div>
      </div>
    </div>
  );
}
