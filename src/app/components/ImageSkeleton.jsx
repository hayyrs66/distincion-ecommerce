import { useState } from "react";
import Image from "next/image";

export default function ImageSkeleton({ src, alt, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = (event) => {
    const target = event.target;
    if (target.srcset) {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      )}
      <Image
        src={src}
        alt={alt}
        {...props}
        onLoad={handleLoad}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
