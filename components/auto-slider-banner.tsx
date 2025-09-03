"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const images = ["/video/first-scene.gif", "/video/second-scene.gif"];

const AutoSliderBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleShopClick = () => {
    redirect("https://t.me/taniynadmn");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/20 bg-opacity-50 flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold  sm:text-5xl md:text-9xl text-gray-100 text-center mb-4 font-berosong tracking-widest">
          TANIYN
        </h1>
        <p className="text-xl text-gray-300 text-center my-8 font-berosong">
          The musician from Uzbekistan
        </p>
        <Button onClick={handleShopClick} size="lg" variant="outline">
          CONTACT US
        </Button>
      </div>
    </div>
  );
};

export default AutoSliderBanner;
