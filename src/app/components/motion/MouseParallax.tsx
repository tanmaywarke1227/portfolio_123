"use client";

import {
  useEffect,
  useState,
} from "react";

interface MouseParallaxProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function MouseParallax({
  children,
  intensity = 20,
}: MouseParallaxProps) {

  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  useEffect(() => {

    const handleMouseMove = (
      event: MouseEvent,
    ) => {

      const x =
        event.clientX / window.innerWidth -
        0.5;

      const y =
        event.clientY / window.innerHeight -
        0.5;

      setPosition({
        x: x * intensity,
        y: y * intensity,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };

  }, [intensity]);

  return (
    <div
      className="relative"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition:
          "transform 120ms ease-out",
      }}
    >
      {children}
    </div>
  );
}