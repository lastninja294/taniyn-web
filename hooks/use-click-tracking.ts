"use client";

import { useState } from "react";

interface SocialLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

export function useClickTracking() {
  const [isTracking, setIsTracking] = useState(false);

  const trackClick = async (socialLinkId: string, url: string) => {
    setIsTracking(true);

    try {
      fetch("/api/click-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ social_link_id: socialLinkId }),
      }).catch((error) => {
        console.error("Failed to track click:", error);
      });

      // Open the link
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsTracking(false);
    }
  };

  return { trackClick, isTracking };
}
