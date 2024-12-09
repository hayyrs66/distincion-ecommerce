"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageSkeleton({
  src,
  alt,
  priority = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ objectFit: "cover" }}
        {...props}
      />
    </div>
  );
}
