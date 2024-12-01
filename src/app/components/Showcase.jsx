import Image from "next/image";
import Link from "next/link";

const GalleryItem = ({ src, alt, title }) => (
  <Link href={`/ropa?categoria=${title.toLowerCase()}`} legacyBehavior>
    <a>
      <div className="relative cursor-pointer w-full h-[390px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover filter brightness-75 hover:brightness-90 transition-all"
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-4xl font-medium text-white stroke-black">
            {title}
          </h3>
        </div>
      </div>
    </a>
  </Link>
);

const Showcase = () => {
  const items = [
    {
      src: "/assets/fotos/cargo/CARGO_VERDE_FRENTE.webp",
      alt: "Cargo",
      title: "Cargo",
    },
    {
      src: "/assets/fotos/semi/SEMI_GRIS_CLARO_FRENTE.webp",
      alt: "Semirecto",
      title: "Semirecto",
    },
    {
      src: "/assets/fotos/ajustado/AJUSTADO_KAKI_FRENTE.webp",
      alt: "Ajustado",
      title: "Ajustado",
    },
    {
      src: "/assets/fotos/jogger/JOGGER_AZUL_FRENTE.webp",
      alt: "Jogger",
      title: "Jogger",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {items.map((item, index) => (
        <GalleryItem
          key={index}
          src={item.src}
          alt={item.alt}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default Showcase;
