"use client";
import React, { useCallback, useEffect, useState } from "react";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({
    x: -100,
    y: -100,
  });
  const [isHovering, setIsHovering] = useState(false);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, [role="button"]'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [updateCursorPosition]);

  return (
    <div
      className={`cursor-spotlight ${isHovering ? "hovering" : ""}`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="inner-circle"></div>
    </div>
  );
};

export default Cursor;
