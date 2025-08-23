"use client";

import React, { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { HoodieCard } from "@/components/hoodie-card";

interface MerchItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

const MerchSection = () => {
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [isLoadingMerch, setIsLoadingMerch] = useState(true);

  const fallbackMerchItems: MerchItem[] = [
    {
      id: "1",
      title: "Art Collection",
      description: "Exclusive TANIYN art pieces and prints",
      image_url: "/abstract-pink-geometric-pattern.png",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "History Archive",
      description: "Vintage TANIYN memorabilia and collectibles",
      image_url: "/vintage-historical-photo-bw.png",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Nature Series",
      description: "Organic-inspired TANIYN merchandise",
      image_url: "/fox-deer-forest.png",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Tech Gear",
      description: "Modern TANIYN electronic accessories",
      image_url: "/modern-gaming-setup.png",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Space Edition",
      description: "Cosmic TANIYN limited edition items",
      image_url: "/earth-from-space.png",
      created_at: new Date().toISOString(),
    },
  ];

  const supabase = createClient();

  const fetchMerchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("merch_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching merch items:", error);
        setMerchItems(fallbackMerchItems);
      } else {
        setMerchItems(data && data.length > 0 ? data : fallbackMerchItems);
      }
    } catch (error) {
      console.error("Error fetching merch items:", error);
      setMerchItems(fallbackMerchItems);
    } finally {
      setIsLoadingMerch(false);
    }
  };

  useEffect(() => {
    fetchMerchItems();
  }, []);

  return (
    <section id="merch" className="w-full py-12 md:py-24 bg-dark-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-100">
          Latest Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {merchItems.map((item) => (
            <HoodieCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
