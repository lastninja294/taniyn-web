"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface HoodieCardProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  key: string;
}

export function HoodieCard({ title, image_url }: HoodieCardProps) {
  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            redirect("https://t.me/taniynadmn");
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
