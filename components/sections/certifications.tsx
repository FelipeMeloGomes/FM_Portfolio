"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { SkeletonCertCard } from "@/components/skeleton";
import { type Certification, certifications } from "@/data/certifications";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const LINKEDIN_CERTIFICATIONS_URL =
  "https://www.linkedin.com/in/felipemelog/details/certifications/";

function sortByRecency(list: Certification[], locale: "pt" | "en") {
  return [...list].sort(
    (a, b) =>
      Number(b.date) - Number(a.date) ||
      a.title[locale].localeCompare(b.title[locale]),
  );
}

function CertificationCard({ cert }: { cert: (typeof certifications)[0] }) {
  const shouldReduceMotion = useReducedMotion();
  const locale = useLocale() as "pt" | "en";
  const t = useTranslations("certifications");
  const title = cert.title[locale];

  const cardMotionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  return (
    <m.article
      variants={cardVariants}
      {...cardMotionProps}
      className="group relative border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors"
    >
      <div className="aspect-square relative bg-muted">
        <Image
          src={cert.image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{cert.institution}</p>
        <p className="text-xs text-muted-foreground">{cert.date}</p>
      </div>
      <a
        href={LINKEDIN_CERTIFICATIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      >
        <span className="sr-only">{`${t("viewOnLinkedin")}: ${title}`}</span>
      </a>
    </m.article>
  );
}

function CertificationsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("certifications");
  const locale = useLocale() as "pt" | "en";
  const sortedCertifications = useMemo(
    () => sortByRecency(certifications, locale),
    [locale],
  );

  const finalHeaderVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : headerVariants;

  const finalContainerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : containerVariants;

  return (
    <section id="certifications" className="py-20">
      <m.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={finalHeaderVariants}
        className="container mx-auto max-w-4xl px-4"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{t("title")}</h2>
        <p className="text-muted-foreground text-center mb-12">
          {t("subtitle")}
        </p>
      </m.div>

      <m.div
        variants={finalContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-5xl px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCertifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </m.div>
    </section>
  );
}

function CertificationsLoading() {
  const t = useTranslations("certifications");

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{t("title")}</h2>
        <p className="text-muted-foreground text-center mb-12">
          {t("subtitle")}
        </p>
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loaders are static placeholders
            <SkeletonCertCard key={`cert-skeleton-${idx}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsStatic() {
  const t = useTranslations("certifications");
  const locale = useLocale() as "pt" | "en";
  const sortedCertifications = useMemo(
    () => sortByRecency(certifications, locale),
    [locale],
  );

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{t("title")}</h2>
        <p className="text-muted-foreground text-center mb-12">
          {t("subtitle")}
        </p>
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCertifications.map((cert) => (
            <article
              key={cert.id}
              className="group relative border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors"
            >
              <div className="aspect-square relative bg-muted">
                <Image
                  src={cert.image}
                  alt={cert.title[locale]}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">
                  {cert.title[locale]}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {cert.institution}
                </p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>
              <a
                href={LINKEDIN_CERTIFICATIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              >
                <span className="sr-only">
                  {`${t("viewOnLinkedin")}: ${cert.title[locale]}`}
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CertificationsStatic />;
  }

  return (
    <Suspense fallback={<CertificationsLoading />}>
      <CertificationsGrid />
    </Suspense>
  );
}
