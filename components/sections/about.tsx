"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function AboutIcon() {
  return (
    <div className="order-1 md:order-2 flex justify-center">
      <div
        aria-hidden="true"
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl border border-border bg-gradient-to-br from-accent/15 via-muted to-muted flex items-center justify-center"
      >
        <div className="absolute inset-4 rounded-xl border border-dashed border-accent/30" />
        <Code2
          className="relative w-20 h-20 md:w-24 md:h-24 text-accent"
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}

function AboutContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("about");

  const finalVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : variants;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <m.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={finalVariants}
        className="container mx-auto max-w-4xl px-4"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t("title")} <span className="text-accent">{t("subtitle")}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("paragraph3")}
            </p>
            <Link
              href="#skills"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
            >
              {t("viewSkills")}
            </Link>
          </div>

          <AboutIcon />
        </div>
      </m.div>
    </section>
  );
}

function AboutStatic() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t("title")} <span className="text-accent">{t("subtitle")}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("paragraph3")}
            </p>
            <Link
              href="#skills"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
            >
              {t("viewSkills")}
            </Link>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-muted rounded-2xl flex items-center justify-center">
              <span className="text-8xl">💼</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <AboutStatic />;
  }

  return <AboutContent />;
}
