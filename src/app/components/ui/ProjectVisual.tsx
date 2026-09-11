"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectVisual({ src, title, number, category }: { src?: string; title: string; number: string; category: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="project-visual">
      {src && !failed ? <Image src={src} alt={title} fill sizes="(max-width: 767px) 100vw, 65vw" className="object-contain" onError={() => setFailed(true)} /> : <>
        <span className="project-visual-number" aria-hidden="true">{number}</span>
        <div className="project-visual-caption"><span>{category}</span><span>Project imagery forthcoming</span></div>
      </>}
    </div>
  );
}
