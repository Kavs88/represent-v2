"use client";
import React from "react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

const OriginalHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-20 px-4">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
          <AnimatedText text="DISCOVER" el="span" className="block text-white" />
          <AnimatedText text="EXCEPTIONAL" el="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400" delay={0.3} />
          <AnimatedText text="TALENT" el="span" className="block text-white" delay={0.6} />
        </h1>
        <RevealOnScroll delay={1.2}>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-6">
            A curated platform showcasing the most innovative contemporary artists from around the world.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1.4}>
          <Link href="/artists" className="mt-8 inline-block">
            <MagneticButton className="bg-black">
              <span className="px-8 py-4 rounded-full font-bold text-lg shadow-lg transition hover:brightness-110 bg-[#17624A] text-white inline-block">
                Explore the Roster
              </span>
            </MagneticButton>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default OriginalHero; 