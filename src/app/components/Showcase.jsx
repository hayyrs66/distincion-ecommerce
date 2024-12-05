import Image from "next/image";
import Link from "next/link";

const GalleryItem = ({ src, alt, title }) => (
  <Link href={`/ropa?categoria=${title.toLowerCase()}`} legacyBehavior>
    <div className="relative cursor-pointer w-full h-[390px] group">
      {/* Imagen con hover */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover filter brightness-90 transition-all rounded-sm group-hover:brightness-75"
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
      />
      {/* Texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-4xl font-medium text-white">
          {title}
        </h3>
      </div>
    </div>
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
    <section className="w-full px-6 mt-24">
      <span className="text-black/70 tracking-wider font-medium text-lg uppercase">Descubre</span>
      <h3 className="text-black text-4xl text-balance tracking-tight font-normal mb-8">
        Categorías
      </h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((item, index) => (
          <GalleryItem
            key={index}
            src={item.src}
            alt={item.alt}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
};

export default Showcase;
