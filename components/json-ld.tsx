import type { Person, WithContext } from "schema-dts";

export function JsonLd({ locale }: { locale: string }) {
  const isPt = locale === "pt";

  const schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Felipe Melo",
    url: "https://felipemelo.dev",
    image: "https://felipemelo.dev/assets/img/perfil.jpg",
    jobTitle: isPt ? "Desenvolvedor Fullstack" : "Fullstack Developer",
    description: isPt
      ? "Desenvolvedor Fullstack especializado em React, Next.js, TypeScript, PHP e Laravel. Construindo soluções web escaláveis com código limpo e boas práticas."
      : "Fullstack Developer specializing in React, Next.js, TypeScript, PHP and Laravel. Building scalable web solutions with clean code and best practices.",
    email: "mailto:felipemelog@gmail.com",
    sameAs: [
      "https://github.com/FelipeMeloGomes",
      "https://www.linkedin.com/in/felipemelogomes",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "PHP",
      "Laravel",
      "Tailwind CSS",
      "Node.js",
    ],
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
