export interface Certification {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  institution: string;
  date: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    id: "1",
    title: {
      pt: "Desenvolvimento Front-end",
      en: "Front-end Development",
    },
    institution: "FreeCodeCamp",
    date: "2023",
    image: "/assets/certifications/FM-FrontEndDevelopment.webp",
  },
  {
    id: "2",
    title: {
      pt: "JavaScript Algoritmos",
      en: "JavaScript Algorithms",
    },
    institution: "FreeCodeCamp",
    date: "2024",
    image: "/assets/certifications/FM-JavaScript-Algoritmos.webp",
  },
  {
    id: "3",
    title: {
      pt: "TypeScript",
      en: "TypeScript",
    },
    institution: "Dio",
    date: "2024",
    image: "/assets/certifications/FM-TypeScript.webp",
  },
  {
    id: "4",
    title: {
      pt: "PHP",
      en: "PHP",
    },
    institution: "Udemy",
    date: "2026",
    image: "/assets/certifications/FM-PHP.webp",
  },
  {
    id: "5",
    title: {
      pt: "Laravel",
      en: "Laravel",
    },
    institution: "Udemy",
    date: "2026",
    image: "/assets/certifications/FM-LARAVEL.webp",
  },
  {
    id: "6",
    title: {
      pt: "Desenvolvimento Front-end",
      en: "Front-end Development",
    },
    institution: "Unopar",
    date: "2023",
    image: "/assets/certifications/FM-FrameworkFrontEnd.webp",
  },
  {
    id: "7",
    title: {
      pt: "AWS Cloud Practitioner",
      en: "AWS Cloud Practitioner",
    },
    institution: "Amazon Web Services (AWS)",
    date: "2026",
    image: "/assets/certifications/FM-AWS.webp",
  },
  {
    id: "8",
    title: {
      pt: "IBM Fundamentos de Tecnologia da Informação",
      en: "IBM Information Technology Fundamentals",
    },
    institution: "IBM",
    date: "2026",
    image: "/assets/certifications/FM-Information-Technology-Fundamentals.webp",
  },
  {
    id: "9",
    title: {
      pt: "IBM Fundamentos de Computação em Nuvem",
      en: "IBM Cloud Computing Fundamentals",
    },
    institution: "IBM",
    date: "2026",
    image: "/assets/certifications/FM-Cloud-Computing-Fundamentals.webp",
  },
  {
    id: "10",
    title: {
      pt: "CISCO Introdução à Segurança Cibernética",
      en: "CISCO Introduction To Cybersecurity",
    },
    institution: "CISCO",
    date: "2026",
    image: "/assets/certifications/FM-Introduction-To-Cybersecurity.webp",
  },
];
