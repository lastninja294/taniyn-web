"use client";

import {
  Instagram,
  Youtube,
  Send,
  Music,
  Music2,
  Phone,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useClickTracking } from "@/hooks/use-click-tracking";

const ICONS = {
  Instagram: <Instagram className="h-6 w-6 text-accent" />,
  Youtube: <Youtube className="h-6 w-6 text-accent" />,
  Send: <Send className="h-6 w-6 text-accent" />,
  Music: <Music className="h-6 w-6 text-accent" />,
  Music2: <Music2 className="h-6 w-6 text-accent" />,
  Phone: <Phone className="h-6 w-6 text-accent" />,
  Shield: <Shield className="h-6 w-6 text-accent" />,
  Music3: <Zap className="h-6 w-6 text-accent" />,
  Star: <Star className="h-6 w-6 text-accent" />,
};

interface Social {
  id: string;
  title: string;
  url: string;
  icon_name:
    | "Instagram"
    | "Youtube"
    | "Send"
    | "Music"
    | "Music2"
    | "Phone"
    | "Shield"
    | "Music3"
    | "Star";
}

export default function SocialPage() {
  const supabase = createClient();

  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { trackClick, isTracking } = useClickTracking();

  const fetchSocials = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching socials:", error);
    } else {
      setSocials(data || []);
    }
    setIsLoading(false);
  };

  const handleLinkClick = (link: Social, event: React.MouseEvent) => {
    event.preventDefault();
    if (link.url && link.url !== "#") {
      trackClick(link.id, link.url);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(72,129,70,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(72,129,70,0.05),transparent_50%)]"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 my-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-32 h-32">
              {/* Gothic frame effect */}
              <div className="absolute inset-0 rounded-full border-4 border-accent/30 gothic-shadow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-accent/50"></div>

              <div className="relative w-full h-full rounded-full bg-card border-2 border-border overflow-hidden shadow-2xl">
                <Image
                  src="/images/meta.png"
                  alt="Profile"
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {socials.map((link, index) => (
              <Card
                key={index}
                className="group relative border-border/30 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-500 p-0 rounded-none"
              >
                <Link
                  href={link.url}
                  onClick={(event) => handleLinkClick(link, event)}
                  target="_blank"
                  className="w-full h-full bg-transparent text-foreground font-bold text-sm tracking-widest uppercase border-0  hover:bg-transparent p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors duration-300">
                      {ICONS[link.icon_name] || link.icon_name}
                    </div>
                    <div className="text-center w-full">
                      <div className="font-mono text-foreground text-xl">
                        {link.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent"></div>
              <Shield className="w-4 h-4 text-accent" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em]">
              The dark side of the <span className="text-accent">FUTURE</span> •
              Protected by <span className="text-accent">TANIYN</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
