# Felipe Melo | Portfolio

![Deploy](https://vercel.com/badge?theme=github&id=6e87f309-43cc-4eb2-8aae-dc338704617f)
![CI/CD](https://github.com/FelipeMeloGomes/FM_Portfolio/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer)
![Biome](https://img.shields.io/badge/Biome-2.4.8-red?style=flat-square)
![Playwright](https://img.shields.io/badge/Playwright-1.58.2-blueviolet?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Enabled-green?style=flat-square)

---

## Preview

[fm-portfolio.vercel.app](https://fm-portfolio-six.vercel.app/pt)

---

## Sobre o Projeto

Portfólio pessoal de desenvolvedor fullstack, showcasing projetos, habilidades e experiência profissional. Construído com foco em performance, acessibilidade e SEO.

---

## Funcionalidades

### Experiência do Usuário
- **Dark/Light Mode** — Toggle manual com detecção de preferência do sistema
- **Cursor Customizado** — Cursor minimalista com círculo de hover (desktop)
- **Command Palette** — Navegação rápida com `Cmd+K` / `Ctrl+K`
- **Scroll to Top** — Botão flutuante para voltar ao topo
- **Scroll Progress Bar** — Indicador de progresso de leitura
- **Responsivo** — Layout adaptado para mobile, tablet e desktop

### Animações
- **Framer Motion** — Animações de fade-in com scroll triggers
- **Page Transitions** — Transições suaves entre elementos
- **Micro-interactions** — Feedback visual em botões e cards

### Conteúdo
- **Seção Hero** — Apresentação com foto, nome, cargo e CTAs
- **Timeline de Carreira** — Experiências profissionais com timeline visual
- **Skills** — Grid de tecnologias organizado por categoria
- **Certificações** — Showcase de certificados e cursos
- **Projetos** — Cards com imagem, stack, links para demo e repositório
- **Livros** — Grid filtrável por status (lido, lendo, quero ler)
- **Contato** — Links sociais + formulário funcional com EmailJS
- **Download CV** — Download do currículo com animação de confetti

### SEO e Performance
- **SEO Otimizado** — Metadata API com Open Graph, Twitter Cards
- **JSON-LD Schema** — Rich results para Person
- **next-sitemap** — Sitemap automático
- **PWA** — Service Worker com cache offline
- **Lighthouse** — Scripts para auditoria de performance

### Analytics
- **Umami** — Analytics open-source com contador de visitas/visitantes

### Internacionalização
- **next-intl** — Suporte PT/EN com URL prefix (`/pt`, `/en`)

### Infraestrutura
- **CI/CD** — GitHub Actions com pipeline completo
- **Deploy** — Vercel com deploys automáticos via GitHub Actions
- **Testes E2E** — Playwright com testes em Desktop e Mobile

---

## Stack

### Core
- **Next.js 14** — App Router, Server Components, SSG, Metadata API
- **TypeScript** — Type safety em todo o código
- **React 18** — UI com hooks e suspense

### Estilização
- **Tailwind CSS** — Framework CSS utilitário com design tokens
- **clsx + tailwind-merge** — Utilitários para classes condicionais

### Animações
- **Framer Motion** — Animações declarativas com scroll triggers
- **canvas-confetti** — Animação de confetti no download do CV

### UI Components
- **Lucide React** — Ícones consistentes
- **@radix-ui/react-slot** — Composição de componentes

### Internacionalização
- **next-intl 3** — i18n com Server Components

### Theming
- **next-themes** — Dark/Light mode com suppressHydrationWarning

### Forms
- **@emailjs/browser** — Formulário de contato funcional

### Analytics
- **@umami/is** — API client para analytics

### SEO
- **next-sitemap** — Geração automática de sitemap
- **schema-dts** — Tipos TypeScript para JSON-LD

### PWA
- **@ducanh2912/next-pwa** — Service Worker com workbox

### Lint e Format
- **Biome** — Linter e formatter (sucessor do ESLint + Prettier)

### Testes
- **Playwright** — Testes E2E com múltiplos browsers

---

## Estrutura de Pastas

```
.
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Layout com providers, i18n, SEO
│   │   └── page.tsx       # Composição da página principal
│   ├── api/
│   │   └── stats/
│   │       └── route.ts   # API route para stats do Umami
│   ├── globals.css        # Tailwind + design tokens
│   ├── print.css          # Estilos para impressão
│   └── layout.tsx         # Layout raiz
├── components/
│   ├── command-palette.tsx # Cmd+K navegação
│   ├── contact-form.tsx   # Formulário EmailJS
│   ├── footer.tsx         # Rodapé
│   ├── navbar.tsx         # Navegação com scroll effects
│   ├── scroll-progress.tsx
│   ├── scroll-to-top.tsx
│   ├── stats.tsx          # Contador de visitas
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── umami-analytics.tsx
│   ├── skeleton.tsx
│   ├── json-ld.tsx        # Schema de Person
│   ├── contact-form.tsx
│   ├── ui/
│   │   ├── cursor.tsx     # Cursor customizado
│   │   └── tooltip.tsx   # Tooltip reutilizável
│   └── sections/
│       ├── about.tsx
│       ├── books.tsx      # Grid filtrável
│       ├── certifications.tsx
│       ├── contact.tsx
│       ├── hero.tsx
│       ├── projects.tsx   # Cards de projetos
│       ├── skills.tsx
│       └── timeline.tsx
├── hooks/
│   ├── use-clipboard.ts   # Hook para copiar
│   ├── use-confetti.ts    # Hook para confetti
│   └── use-stats.ts      # Hook para stats do Umami
├── lib/
│   └── utils.ts           # Helpers (cn)
├── messages/
│   ├── en.json            # Traduções inglês
│   └── pt.json            # Traduções português
├── public/
│   ├── assets/
│   │   ├── img/          # Imagens e fotos
│   │   └── docs/         # Currículo
│   ├── manifest.json      # PWA manifest
│   └── robots.txt
├── src/
│   └── data/
│       ├── books.ts
│       ├── certifications.ts
│       ├── projects.ts
│       ├── timeline.ts
│       └── timeline.en.ts
├── tests/
│   ├── books.spec.ts
│   ├── hero.spec.ts
│   ├── navbar.spec.ts
│   └── projects.spec.ts
├── .env.example           # Template de variáveis
├── .gitignore
├── biome.json             # Config do Biome
├── next.config.mjs
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Como Rodar Localmente

### Pré-requisitos

- **Node.js** 22+
- **pnpm** 10+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/FelipeMeloGomes/FM_Portfolio.git

# Entre no diretório
cd FM_Portfolio

# Instale as dependências
pnpm install

# Copie o template de variáveis
cp .env.example .env.local

# Edite o .env.local com suas credenciais
# (veja seção de Variáveis de Ambiente)

# Inicie o servidor
pnpm dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt) no navegador.

---

## Variáveis de Ambiente

### Necessárias para Development

```env
# Umami Analytics (obrigatório para contador de visitas)
UMAMI_SITE_ID=seu-site-id
UMAMI_API_KEY=sua-api-key
UMAMI_API_URL=https://api.umami.is/v1

# EmailJS (obrigatório para formulário de contato)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua-public-key
```

### Apenas CI/CD (GitHub Secrets)

```env
VERCEL_TOKEN=seu-token
VERCEL_ORG_ID=seu-org-id
VERCEL_PROJECT_ID=seu-project-id
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build de produção
pnpm start        # Inicia servidor de produção

# Code Quality
pnpm check        # Lint + Format + Organize imports
pnpm lint         # Apenas lint
pnpm format       # Apenas format

# Testes
pnpm test:e2e         # Executa testes E2E
pnpm test:e2e:ui       # Abre UI do Playwright
pnpm test:e2e:report   # Mostra relatório HTML

# Performance
pnpm lighthouse       # Audit lighthouse em PT
pnpm lighthouse:en      # Audit lighthouse em EN
```

---

## Como Atualizar Dados

### Livros (`src/data/books.ts`)

```typescript
export const books: Book[] = [
  {
    id: "novo-id",
    title: "Título do Livro",
    author: "Nome do Autor",
    cover: "https://url-da-imagem.jpg",
    status: "lido" | "lendo" | "quero ler",
    year: 2024,
  },
];
```

### Projetos (`src/data/projects.ts`)

```typescript
export const projects: Project[] = [
  {
    id: "novo-projeto",
    title: "Nome do Projeto",
    description: "Descrição breve",
    image: "/assets/img/projeto.webp",
    stack: ["React", "TypeScript"],
    liveUrl: "https://demo.com",
    repoUrl: "https://github.com/repo",
  },
];
```

### Certificações (`src/data/certifications.ts`)

```typescript
export const certifications: Certification[] = [
  {
    id: "nova-cert",
    name: "Nome da Certificação",
    issuer: "Instituição",
    date: "2024-01",
    url: "https://url-do-certificado",
  },
];
```

### Timeline (`src/data/timeline.ts`)

```typescript
export const timeline: TimelineItem[] = [
  {
    id: "nova-exp",
    role: "Cargo",
    company: "Empresa",
    location: "Cidade, País",
    startDate: "2024-01",
    endDate: null, // null = atual
    description: "Descrição da função",
    current: true,
  },
];
```

---

## CI/CD

### Pipeline

```
Push/PR → GitHub Actions
    │
    ├─► Lint (Biome)
    │       │
    │       └─► Testes E2E (Playwright)
    │               │
    │               └─► Build (Next.js)
    │                       │
    │                       └─► Deploy (Vercel)
```

### Jobs

1. **Lint** — Verifica código com Biome
2. **Test** — Executa testes E2E com Playwright (Desktop + Mobile)
3. **Build** — Gera build de produção
4. **Deploy** — Publica na Vercel (apenas em push para main)

Se qualquer job falhar, o pipeline para e o deploy não acontece.

---

## Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à [Vercel](https://vercel.com)
2. Adicione as variáveis de ambiente na Vercel
3. Deploys automáticos a cada push para main

### Manual

```bash
pnpm build
pnpm add -g vercel
vercel --prod
```

---

## Licença

[MIT](./LICENSE)
<!-- vercel git relink test v2 -->
