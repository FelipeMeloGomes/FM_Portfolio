"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#carreira", key: "career" },
  { href: "#skills", key: "skills" },
  { href: "#certifications", key: "certifications" },
  { href: "#projects", key: "projects" },
  { href: "#books", key: "books" },
  { href: "#contact", key: "contact" },
] as const;

/** Folga sobre o scroll-padding para o probe alcançar a seção clicada. */
const PROBE_MARGIN = 8;

export function Navbar() {
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_ITEMS[0].href);
  const { scrollY } = useScroll();

  /**
   * Linha de decisão, em px do topo da viewport. Derivada do
   * `scroll-padding-top` do CSS em vez de fixa: um clique numa âncora para a
   * seção exatamente a scroll-padding px do topo, então o probe tem que ser
   * MAIOR que ele — senão a seção recém-clicada nunca satisfaz a condição e o
   * item anterior fica marcado.
   *
   * Só o probe é cacheado (depende do CSS, não do conteúdo). Os offsets das
   * seções NÃO são: o layout desta página continua mudando depois do mount (o
   * gate `mounted` troca cada `*Static` pelo `*Content`, e as capas de livro
   * carregam por rede), então um cache de offsets envelhece e a seção clicada
   * perde para a seguinte. Ler os 8 retângulos por frame é sempre mais barato
   * que corrigir o bug.
   */
  const probeRef = useRef(0);

  const readProbe = useCallback(() => {
    const padding = Number.parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop
    );
    probeRef.current = (Number.isNaN(padding) ? 0 : padding) + PROBE_MARGIN;
    return probeRef.current;
  }, []);

  const computeActive = useCallback(() => {
    const last = NAV_ITEMS[NAV_ITEMS.length - 1].href;

    // No fim do documento o último trecho é o rodapé (sem id). Sem este guarda
    // uma seção final curta nunca alcança a linha de probe, porque a página não
    // tem rolagem suficiente para trazê-la até lá.
    const scrolledToEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (scrolledToEnd) {
      return last;
    }

    // getBoundingClientRect já é relativo à viewport, o que evita aritmética com
    // scrollY e não depende de nenhum offset absoluto guardado.
    let current: string = NAV_ITEMS[0].href;
    for (const { href } of NAV_ITEMS) {
      const el = document.getElementById(href.slice(1));
      if (el && el.getBoundingClientRect().top <= probeRef.current) {
        current = href;
      }
    }
    return current;
  }, []);

  useEffect(() => {
    const refresh = () => {
      readProbe();
      // Recalcula o ativo junto, para deep-link (#contact na URL) já nascer certo
      // sem depender de um evento de scroll.
      setActiveHref(computeActive());
    };
    refresh();
    window.addEventListener("resize", refresh);
    // Outfit e JetBrains Mono chegam por @font-face e podem mudar o CSS.
    void document.fonts.ready.then(refresh, () => {});

    return () => {
      window.removeEventListener("resize", refresh);
    };
  }, [readProbe, computeActive]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    setActiveHref(computeActive());
  });

  const navItems = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));

  return (
    <m.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <nav
          aria-label={t("mainNav")}
          className="flex h-16 items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>Felipe</span>
            <span className="text-accent">Melo</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </m.header>
  );
}
