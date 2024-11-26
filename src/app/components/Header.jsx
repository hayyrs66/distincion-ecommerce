import localFont from "next/font/local";
import BagLogo from "./BagLogo";

const things = localFont({
  src: [
    {
      path: "../fonts/second-quotes/SecondQuotes-Regular.ttf",
      weight: "400",
    },
  ],
});

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 py-2 z-10 items-center px-8 bg-white drop-shadow-sm flex justify-between transition-all">
      <div className="flex flex-col justify-center">
        <a
          href="/"
          title-header="Distinción"
          className={`${things.className} text-4xl -mx-1 tracking-tighter font-medium text-black`}
        >
          Distinción
        </a>
      </div>
      <div>
        <a
          link-canasta="canasta"
          href="#"
          className="flex gap-3 items-center text-lg text-black leading-[1rem]"
        >
          Canasta
          <BagLogo fillColor="fill-black" />
        </a>
      </div>
    </header>
  );
};

export default Header;
