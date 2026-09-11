"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on pointer devices
    if (typeof window === "undefined") return;
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    if (!isPointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    // Smooth lerp animation
    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      animId = requestAnimationFrame(animate);
    };

    const addHoverClass = () => cursor.classList.add("expanded");
    const removeHoverClass = () =>
      cursor.classList.remove("expanded", "view");

    // Bind hover events
    const bindInteractives = () => {
      const elements = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .project-card"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
      return elements;
    };

    window.addEventListener("mousemove", move);
    let elements = bindInteractives();
    animId = requestAnimationFrame(animate);

    // Re-bind on DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
      elements = bindInteractives();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animId);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
  );
}