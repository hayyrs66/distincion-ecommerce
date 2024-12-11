import localFont from "next/font/local";
import Link from "next/link";

const leMurmure = localFont({
  src: "../fonts/lemurmure/LeMurmure-Regular.woff2",
});

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen flex justify-center items-center bg-[url(https://utfs.io/f/Kd9w79vOPqyddrSaXJZo6MsEXhKCTaLuPBgyUr0kzjbdQO8G)] bg-no-repeat bg-center bg-cover"
      role="banner"
      aria-label="Colección"
    >
      <div className="flex flex-col justify-center items-center mt-12">
        <h1
          className={`${leMurmure.className} tracking-tight font-medium text-white text-clamp_hero leading-none`}
        >
          Cole<span className="text_outline">cción</span>
        </h1>
        <Link
          href="/ropa/todo"
          className=" px-6 py-3 bg-none border border-white text-white font-semibold rounded hover:bg-white/20 transition-colors"
        >
          Explorar ahora
        </Link>
      </div>
    </section>
  );
};

export default Hero;
