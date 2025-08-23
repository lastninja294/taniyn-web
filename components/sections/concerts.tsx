"use client";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Concert {
  id: string;
  title: string;
  venue: string;
  date_time: string;
  description: string;
  created_at: string;
}

const Concerts = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoadingConcerts, setIsLoadingConcerts] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const { data, error } = await supabase
        .from("concerts")
        .select("*")
        .order("date_time", { ascending: true });

      if (error) {
        console.error("Error fetching concerts:", error);
        setConcerts([]);
      } else {
        setConcerts(data && data.length > 0 ? data : []);
      }
    } catch (error) {
      console.error("Error fetching concerts:", error);
      console.log("[v0] Using fallback concerts data due to fetch error");
      setConcerts([]);
    } finally {
      setIsLoadingConcerts(false);
    }
  };

  const formatConcertDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      id="concerts"
      className="py-20 px-4 bg-gradient-to-br from-black via-neutral-950 to-black"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-8 text-white">
            Upcoming Concerts
          </h2>
          <p className="font-mono text-lg text-gray-300">
            Experience the futuristic sound
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {isLoadingConcerts ? (
            <div className="text-white font-mono text-lg text-center">
              Loading concerts...
            </div>
          ) : concerts.length === 0 ? (
            <div className="text-gray-400 font-mono text-lg text-center">
              No upcoming concerts
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {concerts.map((concert, index) => (
                <AccordionItem
                  key={concert.id}
                  value={`concert-${index}`}
                  className="bg-gray-950/50 border border-gray-800 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-gray-300 font-orbitron text-xl font-bold py-6">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-white" />
                      <span>{concert.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 font-mono text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{concert.venue}</span>
                      </div>
                      <div className="font-mono text-sm">
                        <span className="text-white font-bold">Date:</span>{" "}
                        {formatConcertDate(concert.date_time)}
                      </div>
                      <p className="font-mono text-sm leading-relaxed">
                        {concert.description}
                      </p>
                      <Button
                        className="bg-white text-black hover:bg-gray-200 font-mono font-bold mt-4"
                        onClick={() =>
                          window.open("https://t.me/taniynadmn", "_blank")
                        }
                      >
                        Buy Tickets
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Concerts;
