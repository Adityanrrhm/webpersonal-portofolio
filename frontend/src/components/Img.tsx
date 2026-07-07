"use client";
import { useState } from "react";

interface ImgProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imgClassName?: string;
}

export default function Img({ src, alt, containerClassName, imgClassName }: ImgProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${containerClassName || ""}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName || ""} transition-opacity duration-300`}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
