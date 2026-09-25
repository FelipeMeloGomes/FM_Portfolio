"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useConfetti } from "@/hooks/use-confetti";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const _isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("hero");
  const { fireConfetti } = useConfetti();

  const itemVariantsReduced = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  const avatarVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, delay: 0.5, ease: "easeOut" as const },
        },
      };

  const socialVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 1, ease: "easeOut" as const },
        },
      };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent" />
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
          <m.div
            ref={ref}
            variants={
              shouldReduceMotion ? itemVariantsReduced : containerVariants
            }
            initial="hidden"
            animate="visible"
          >
            <m.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-accent font-medium text-sm tracking-wide uppercase">
                {t("greeting").replace("👋", "").trim()}
              </span>
            </m.div>

            <m.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            >
              {t("name")}
            </m.h1>

            <m.div variants={itemVariants} className="relative inline-block">
              <span className="text-2xl md:text-3xl font-medium text-accent block mb-6">
                {t("role")}
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-accent/50 to-transparent" />
            </m.div>

            <m.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed"
            >
              {t("description")}
            </m.p>

            <m.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                {t("viewProjects")}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-border rounded-xl font-medium hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
              >
                {t("contactMe")}
              </Link>
              <a
                href="/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  fireConfetti?.();
                  window.open(
                    "/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf",
                    "_blank"
                  );
                  fetch(
                    "/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf"
                  )
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "FelipeMeloGomesDesenvolvedorFullStack.pdf";
                      a.click();
                      URL.revokeObjectURL(url);
                    });
                }}
                className="inline-flex items-center justify-center px-6 py-4 border border-border rounded-xl hover:bg-muted transition-all duration-300 group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("downloadCV")}
              </a>
            </m.div>
          </m.div>

          <m.div
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-accent/10 rounded-[2.5rem] rotate-6 animate-pulse-glow" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-[2.5rem] -rotate-3" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/assets/img/perfil.jpg"
                  alt="Felipe Melo - Desenvolvedor Fullstack"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-2xl border shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Disponível</span>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        <m.div
          variants={socialVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 mt-16"
        >
          <Link
            href="https://github.com/FelipeMelogomes"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/felipemelog/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:felipe@example.com"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}

function HeroStatic() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-accent font-medium text-sm tracking-wide uppercase">
                {t("greeting").replace("👋", "").trim()}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              {t("name")}
            </h1>

            <div className="relative inline-block mb-6">
              <span className="text-2xl md:text-3xl font-medium text-accent block">
                {t("role")}
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-accent/50 to-transparent" />
            </div>

            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                {t("viewProjects")}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-border rounded-xl font-medium hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
              >
                {t("contactMe")}
              </Link>
              <a
                href="/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf",
                    "_blank"
                  );
                  fetch(
                    "/assets/curriculo/FelipeMeloGomesDesenvolvedorFullStack.pdf"
                  )
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "FelipeMeloGomesDesenvolvedorFullStack.pdf";
                      a.click();
                      URL.revokeObjectURL(url);
                    });
                }}
                className="inline-flex items-center justify-center px-6 py-4 border border-border rounded-xl hover:bg-muted transition-all duration-300 group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("downloadCV")}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-accent/10 rounded-[2.5rem] rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-[2.5rem] -rotate-3" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/assets/img/perfil.jpg"
                  alt="Felipe Melo - Desenvolvedor Fullstack"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-2xl border shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm font-medium">Disponível</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-16">
          <Link
            href="https://github.com/FelipeMelogomes"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/felipemelog/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:felipe@example.com"
            className="p-3 rounded-xl border border-border hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroStatic />;
  }

  return <HeroContent />;
}
