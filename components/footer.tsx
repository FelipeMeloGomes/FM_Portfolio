import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="font-semibold">
              Felipe <span className="text-accent">Melo</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("role")}</p>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/FelipeMelogomes"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/felipemelog/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:felipe@example.com"
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} {t("copyright")} {t("by")}. {t("rights")}
          .
        </p>
      </div>
    </footer>
  );
}
