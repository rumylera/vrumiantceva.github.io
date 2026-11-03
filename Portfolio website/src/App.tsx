import { useState, useEffect, useCallback } from "react";

/* ── Content ─────────────────────────────────────────────────── */

type Project = {
  id: string;
  title: string;
  year: string;
  location: string;
  type: string;
  capacity: string;
  summary: string;
  description: string;
  tags: string[];
  images: string[];
  pdfLink?: string;
  pdfLabel?: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "Ripafratta Fortress",
    year: "2026",
    location: "Ripafratta, Italy",
    type: "Hostel / Café / Climbing Complex",
    capacity: "24 guests",
    summary: "Medieval fortress in Tuscany reborn as a hostel, café and climbing complex.",
    description:
      "BSc diploma project. Adaptive reuse of a medieval fortress in Tuscany, turning it into a hostel, café and climbing complex for 24 guests. The full written thesis is available as a PDF.",
    tags: ["Adaptive reuse", "Heritage", "BSc diploma"],
    images: [
      "/ripafratta1.jpg", "/ripafratta2.jpg", "/ripafratta3.jpg", "/ripafratta4.jpg",
      "/ripafratta5.jpg", "/ripafratta6.jpg", "/ripafratta7.jpg",
    ],
    pdfLink: "/DYPLOM_ESEJ_CAŁY.pdf",
    pdfLabel: "Read the diploma essay (PDF)",
  },
  {
    id: "02",
    title: "ViaVia FliekPiek",
    year: "2024",
    location: "Cape Town, South Africa",
    type: "Hostel / Café / Cinema",
    capacity: "40 guests",
    summary: "A cultural complex set into a hillside park in Cape Town.",
    description:
      "A hostel, café and cinema for 40 guests, integrated into a hillside park in Cape Town. The booklet shows the full design: drawings, materials and model.",
    tags: ["Cultural", "Landscape", "Model making"],
    images: [
      "/viavia.jpg", "/viavia_2.jpg", "/viavia_3.jpg", "/viavia_4.jpg", "/viavia_5.jpg",
      "/viavia_6.jpg", "/viavia_7.jpg", "/viavia_8.jpg", "/viavia_9.jpg", "/viavia_10.jpg",
      "/viavia_materials.jpg", "/viavia_model.jpg",
    ],
    pdfLink: "/project booklet pdf (spreads) - Valeriia Rumiantceva.pdf",
    pdfLabel: "Open the project booklet (PDF)",
  },
  {
    id: "03",
    title: "Philosophia",
    year: "2023",
    location: "Gdańsk, Poland",
    type: "Residential Complex",
    capacity: "24 flats",
    summary: "A 24-flat residential complex on an angular plot in Gdańsk.",
    description:
      "A residential complex of 24 flats on an angular urban plot in Gdańsk.",
    tags: ["Housing", "Urban plot"],
    images: ["/image.png", "/philosophia2.png", "/philosophia3.png"],
  },
];

type Artwork = { id: string; caption: string; medium: string; image: string };

const sketchbook: Artwork[] = [
  { id: "01", caption: "Tarte Tatin & Coffee Cafe, Hasselt, Belgium", medium: "Ink and pencil on paper", image: "/IMG_0938.png" },
  { id: "02", caption: "Tarte Tatin & Boulebaar, Hasselt, Belgium", medium: "Ink and pencil on paper", image: "/IMG_0936.png" },
  { id: "03", caption: "Vanilla Ontbijt & Boulebaar, Hasselt/Diepenbeek, Belgium", medium: "Ink and pencil on paper", image: "/IMG_0937.png" },
  { id: "04", caption: "Klatch.bar & Boulebaar, Hasselt, Belgium", medium: "Ink and pencil on paper", image: "/IMG_0914.PNG" },
];

const digital: Artwork[] = [
  { id: "01", caption: "U Holmov Jest Podcast episode cover", medium: "Procreate", image: "/U_Holmov_160_1.png" },
  ...["onecoffee", "onecoffee1", "onecoffee2", "onecoffee3", "onecoffee4", "onecoffee5", "onecoffee6"].map(
    (name, i): Artwork => ({
      id: String(i + 2).padStart(2, "0"),
      caption: "One Coffee One Sketch meeting poster",
      medium: "Procreate",
      image: `/${name}.jpg`,
    }),
  ),
];

const skillGroups: { label: string; items: string[] }[] = [
  { label: "Architecture", items: ["AutoCAD", "Revit", "SketchUp"] },
  { label: "Graphics", items: ["Adobe InDesign", "Procreate", "Figma"] },
  { label: "Code, data & AI", items: ["AI", "Python", "C++", "MATLAB", "SQL", "HTML & CSS"] },
];

const languages: [string, string][] = [
  ["Russian", "native"],
  ["English", "fluent"],
  ["Polish", "conversational"],
];
const basicLanguages = "German, French, Spanish, Swedish, Italian (basic)";

const education: [string, string, string][] = [
  ["University of Milano-Bicocca", "MSc, Artificial Intelligence for Science and Technology", "2026 – now"],
  ["Politechnika Gdańska", "BSc, Architecture", "2021 – 2026"],
  ["Universiteit Hasselt", "Erasmus+, Architecture", "2023 – 2024"],
  ["St Petersburg State University", "BSc, Applied Mathematics & Computer Science", "2018 – 2021"],
];

const NAV = [
  ["projects", "Projects"],
  ["about", "About"],
  ["article", "Research"],
  ["sketchbook", "Sketchbook"],
  ["digital", "Digital"],
  ["contact", "Contact"],
] as const;

const EMAIL = "rumylera@gmail.com";

/* ── Small shared pieces ─────────────────────────────────────── */

const label = "font-mono text-[0.7rem] tracking-[0.18em] uppercase text-copper";
const sectionPad = "px-[clamp(1.5rem,6vw,4rem)] py-20 md:py-24";

function SectionHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-col gap-2 border-b border-border pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal">{title}</h2>
      {note && <span className="font-mono text-[0.72rem] text-cream-dim sm:text-right">{note}</span>}
    </div>
  );
}

type LightboxState = { images: string[]; index: number } | null;

/** Horizontal swipe detection for touch screens. */
function makeSwipe(onLeft: () => void, onRight: () => void) {
  let startX = 0;
  let startY = 0;
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? onLeft : onRight)();
    },
  };
}

function ArtGrid({
  items,
  open,
  stagger,
}: {
  items: Artwork[];
  open: (images: string[], index: number) => void;
  stagger?: boolean;
}) {
  const all = items.map((i) => i.image);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((s, i) => (
        <figure
          key={s.id}
          className={stagger ? (i % 4 === 1 ? "md:mt-12" : i % 4 === 3 ? "md:mt-6" : "") : ""}
        >
          <button
            type="button"
            onClick={() => open(all, i)}
            aria-label={`Enlarge: ${s.caption}`}
            className="group relative block w-full cursor-zoom-in overflow-hidden bg-surface"
          >
            <img
              src={s.image}
              alt={`${s.caption} (${s.medium})`}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-bg/85 to-transparent to-55% p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-mono text-[0.7rem] tracking-widest text-copper">{s.medium}</span>
            </span>
          </button>
          <figcaption className="mt-3 flex items-start justify-between gap-2">
            <span className="font-display text-[0.9rem] leading-snug">{s.caption}</span>
            <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] text-copper">{s.id}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ── App ─────────────────────────────────────────────────────── */

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>("01");
  const [articleOpen, setArticleOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = useCallback((images: string[], index: number) => setLightbox({ images, index }), []);
  const stepLightbox = useCallback((dir: 1 | -1) => {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + dir + lb.images.length) % lb.images.length } : lb,
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setMenuOpen(false);
      }
      if (lightbox && e.key === "ArrowRight") stepLightbox(1);
      if (lightbox && e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, stepLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox, menuOpen]);

  const slide = (id: string, total: number, dir: 1 | -1) =>
    setSlideIndex((prev) => ({ ...prev, [id]: ((prev[id] ?? 0) + dir + total) % total }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const circleBtn =
    "flex h-11 w-11 items-center md:h-9 md:w-9 justify-center rounded-full border border-border bg-bg/60 text-fg backdrop-blur-sm transition hover:bg-bg/90";

  return (
    <div className="min-h-full w-full bg-bg font-body text-fg">
      <a
        href="#projects"
        className="fixed left-2 top-2 z-[100] -translate-y-[200%] rounded bg-fg px-3 py-2 font-mono text-xs text-bg focus:translate-y-0"
      >
        Skip to projects
      </a>

      {/* ── NAV ── */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-[clamp(1.5rem,6vw,2rem)] py-4 backdrop-blur-md"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="-my-3 py-3 font-mono text-[0.72rem] tracking-[0.2em] text-fg transition-opacity hover:opacity-60"
        >
          V. Rumiantceva
        </button>

        <div className="hidden gap-8 md:flex">
          {NAV.map(([id, text]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-cream-dim transition-colors hover:text-fg"
            >
              {text}
            </button>
          ))}
        </div>

        <button
          className="-mr-3 flex min-h-11 min-w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="block h-px w-5 bg-fg" />
          <span className="block h-px w-5 bg-fg" />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-9 bg-bg">
          {NAV.map(([id, text]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-display text-3xl text-fg">
              {text}
            </button>
          ))}
        </div>
      )}

      <main>
        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[clamp(1.5rem,6vw,4rem)] pb-16 pt-28"
        >
          <div className="absolute inset-0 flex" aria-hidden="true">
            <div className="relative w-full overflow-hidden bg-bg md:w-1/2">
              <img
                src="/ripafratta1.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-20 md:hidden"
              />
            </div>
            <div className="relative hidden bg-surface md:block md:w-1/2">
              <img
                src="/ripafratta1.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg to-transparent to-25%" />
            </div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.22em] text-copper">
              Architecture · Portfolio 2026
            </p>
            <h1 className="mb-8 font-display text-[clamp(3.25rem,10vw,7.5rem)] font-normal leading-none">
              Valeriia
              <br />
              <em>Rumiantceva</em>
            </h1>
            <p className="mb-3 max-w-md font-display text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug">
              Architecture graduate designing adaptive-reuse and cultural buildings, drawn by hand and
              resolved in Revit.
            </p>
            <p className="mb-10 max-w-md text-[0.95rem] font-light leading-relaxed text-cream-dim">
              BSc Architecture, Politechnika Gdańska (2026) · Erasmus+ at Universiteit Hasselt · now
              studying AI for Science and Technology at Milano-Bicocca.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="flex-1 bg-copper px-6 py-4 font-mono sm:flex-none sm:py-3 text-[0.75rem] uppercase tracking-[0.18em] text-bg transition hover:bg-copper-light"
              >
                View projects
              </button>
              <a
                href={`mailto:${EMAIL}?subject=Opportunity%20for%20Valeriia`}
                className="flex-1 border border-fg/30 px-6 py-4 text-center font-mono sm:flex-none sm:py-3 text-[0.75rem] uppercase tracking-[0.18em] text-fg transition hover:border-fg/70"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 hidden font-mono text-[0.72rem] tracking-[0.12em] text-cream-dim/60 md:block">
            Gdańsk, Poland · Open to internships &amp; junior roles
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className={sectionPad}>
          <SectionHeader title="Selected projects" note="Studio work · BSc Architecture" />

          {projects.map((p) => {
            const isOpen = activeProject === p.id;
            const idx = slideIndex[p.id] ?? 0;
            return (
              <article key={p.id} className="border-b border-fg/10">
                <button
                  className="flex w-full items-center gap-4 py-6 text-left md:gap-8"
                  onClick={() => setActiveProject(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  aria-controls={`project-${p.id}`}
                >
                  <span className="shrink-0 font-mono text-[0.75rem] text-copper">{p.id}</span>
                  <img
                    src={p.images[0]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hidden h-16 w-24 shrink-0 bg-surface object-cover sm:block"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-[clamp(1.25rem,3.5vw,1.75rem)] transition-colors ${isOpen ? "text-copper" : "text-fg"}`}
                    >
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[0.85rem] font-light text-cream-dim">
                      {p.summary}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[0.72rem] text-cream-dim lg:block">{p.type}</span>
                  <span className="shrink-0 font-mono text-[0.72rem] text-cream-dim">{p.year}</span>
                  <span
                    aria-hidden="true"
                    className={`inline-block shrink-0 text-cream-dim transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div id={`project-${p.id}`} className="grid gap-8 pb-10 md:grid-cols-2">
                    <div
                      className="relative flex max-h-[60svh] touch-pan-y items-center justify-center overflow-hidden bg-surface"
                      {...makeSwipe(() => slide(p.id, p.images.length, 1), () => slide(p.id, p.images.length, -1))}
                    >
                      <img
                        src={p.images[idx]}
                        alt={`${p.title}, image ${idx + 1} of ${p.images.length}`}
                        onClick={() => openLightbox(p.images, idx)}
                        className="max-h-[60svh] w-full cursor-zoom-in object-contain"
                      />
                      {p.images.length > 1 && (
                        <>
                          <button
                            aria-label="Previous image"
                            onClick={() => slide(p.id, p.images.length, -1)}
                            className={`${circleBtn} absolute left-3 top-1/2 -translate-y-1/2`}
                          >
                            ‹
                          </button>
                          <button
                            aria-label="Next image"
                            onClick={() => slide(p.id, p.images.length, 1)}
                            className={`${circleBtn} absolute right-3 top-1/2 -translate-y-1/2`}
                          >
                            ›
                          </button>
                          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bg/70 px-2 py-1 font-mono text-[0.7rem] text-fg">
                            {idx + 1} / {p.images.length}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col gap-6">
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {(
                          [
                            ["Location", p.location],
                            ["Type", p.type],
                            ["Year", p.year],
                            ["Capacity", p.capacity],
                          ] as const
                        ).map(([k, v]) => (
                          <div key={k}>
                            <dt className={`${label} mb-1`}>{k}</dt>
                            <dd className="text-[0.88rem]">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="text-[0.92rem] font-light leading-[1.85] text-cream-dim">{p.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="border border-fg/15 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-cream-dim"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      {p.pdfLink && (
                        <a
                          href={p.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-fit py-3 font-mono text-[0.7rem] uppercase tracking-widest text-copper underline decoration-copper/40 underline-offset-[6px] transition hover:opacity-70"
                        >
                          {p.pdfLabel ?? "Full document"} ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className={sectionPad}>
          <SectionHeader title="About" />
          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col gap-8">
              <p className="font-display text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.35]">
                I design buildings that give old structures a second life, and I bring a mathematician&rsquo;s
                rigour and a sketcher&rsquo;s eye to every one.
              </p>
              <div className="flex flex-col gap-4 text-[0.92rem] font-light leading-[1.85] text-cream-dim">
                <p>
                  I finished my BSc in Architecture at Politechnika Gdańska in 2026 with a diploma on
                  turning a Tuscan medieval fortress into a hostel and climbing complex. An Erasmus+ year at
                  Universiteit Hasselt added research on horror architecture and adaptive reuse, and a
                  sketchbook habit I have kept ever since.
                </p>
                <p>
                  Before architecture I studied Applied Mathematics and Computer Science in St Petersburg.
                  That is why I am comfortable with Revit and parametric thinking, and why I am now
                  studying AI for Science and Technology in Milan to explore how computation can serve design.
                </p>
              </div>
              <div>
                <p className={`${label} mb-4`}>Education</p>
                <ul className="flex flex-col gap-4">
                  {education.map(([school, degree, years]) => (
                    <li key={school} className="flex justify-between gap-4">
                      <div>
                        <p className="text-[0.88rem]">{school}</p>
                        <p className="mt-0.5 font-mono text-[0.7rem] text-cream-dim">{degree}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.7rem] text-cream-dim">{years}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <p className={`${label} mb-4`}>Tools &amp; skills</p>
                <div className="flex flex-col gap-5">
                  {skillGroups.map((g) => (
                    <div key={g.label}>
                      <p className="mb-2 font-mono text-[0.7rem] text-cream-dim">{g.label}</p>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((s) => (
                          <li
                            key={s}
                            className="border border-fg/15 px-3 py-1 font-mono text-[0.75rem] tracking-wide text-fg"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <p className={`${label} mb-4`}>Languages</p>
                <ul className="flex flex-col gap-2">
                  {languages.map(([lang, level]) => (
                    <li key={lang} className="flex items-baseline justify-between">
                      <span className="text-[0.88rem]">{lang}</span>
                      <span className="font-mono text-[0.7rem] text-cream-dim">{level}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-cream-dim">{basicLanguages}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RESEARCH ── */}
        <section id="article" className={sectionPad}>
          <SectionHeader title="Research" note="Essay · UHasselt, 2023/24" />
          <button
            className="flex w-full items-start justify-between gap-4 border-b border-fg/10 py-7 text-left"
            onClick={() => setArticleOpen((o) => !o)}
            aria-expanded={articleOpen}
            aria-controls="article-body"
          >
            <span
              className={`font-display text-[clamp(1.25rem,3.5vw,1.75rem)] transition-colors ${articleOpen ? "text-copper" : "text-fg"}`}
            >
              Horror Buildings and Where to Find Them
            </span>
            <span aria-hidden="true" className={`shrink-0 text-cream-dim transition-transform ${articleOpen ? "rotate-45" : ""}`}>
              +
            </span>
          </button>

          {articleOpen && (
            <div id="article-body" className="border-b border-fg/10 py-10">
              <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                <p className="max-w-xl text-[0.92rem] font-light leading-[1.85] text-cream-dim">
                  Exploring adaptive reuse through the lens of horror architecture. Research training essay,
                  Faculty of Architecture and Arts, UHasselt, a.y. 2023/24.
                </p>
                <a
                  href="/Horror_Arch_Article_fixed.pdf"
                  download
                  className="shrink-0 font-mono text-[0.72rem] uppercase tracking-widest text-cream-dim underline decoration-cream-dim/30 underline-offset-[6px] transition-colors hover:text-copper"
                >
                  ↓ Download PDF
                </a>
              </div>

              <div className="mx-auto hidden max-w-3xl bg-[#1a1512] p-6 shadow-2xl md:block">
                <object
                  data="/Horror_Arch_Article_fixed.pdf"
                  type="application/pdf"
                  className="block h-[80vh] w-full border-0 bg-white"
                >
                  <p className="p-8 text-sm text-neutral-800">
                    Unable to display the PDF.{" "}
                    <a href="/Horror_Arch_Article_fixed.pdf" className="text-copper underline">
                      Download it here
                    </a>
                    .
                  </p>
                </object>
              </div>

              <div className="flex flex-col items-center gap-4 border border-border bg-surface px-8 py-14 text-center md:hidden">
                <p className="font-display text-2xl">Horror Architecture Article</p>
                <p className="max-w-sm text-sm leading-relaxed text-cream-dim">
                  PDFs read best in your own viewer on mobile.
                </p>
                <a
                  href="/Horror_Arch_Article_fixed.pdf"
                  className="bg-copper px-5 py-3 font-mono text-[0.75rem] uppercase tracking-widest text-bg"
                >
                  Open PDF
                </a>
              </div>
            </div>
          )}
        </section>

        {/* ── SKETCHBOOK ── */}
        <section id="sketchbook" className={sectionPad}>
          <SectionHeader title="Sketchbook" note="Observational drawing" />
          <p className="my-10 max-w-xl text-[0.92rem] font-light leading-[1.85] text-cream-dim">
            Alongside studio work I draw constantly: cafés, interiors and the spaces I met during my
            Erasmus year in Belgium. Ink and pencil on paper.
          </p>
          <ArtGrid items={sketchbook} open={openLightbox} stagger />
        </section>

        {/* ── DIGITAL ── */}
        <section id="digital" className={sectionPad}>
          <SectionHeader title="Digital works" note="Illustration & graphic design" />
          <div className="mt-10">
            <ArtGrid items={digital} open={openLightbox} stagger />
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className={`${sectionPad} border-t border-border`}>
          <h2 className="mb-12 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal">Contact</h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="mb-8 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.2]">
                Looking for an architecture internship or junior role. Let&rsquo;s talk.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=Opportunity%20for%20Valeriia`}
                className="block break-all bg-copper px-5 py-4 text-center font-mono sm:inline-block sm:px-7 text-[0.72rem] uppercase tracking-[0.18em] text-bg transition hover:bg-copper-light"
              >
                {EMAIL}
              </a>
            </div>
            <dl className="border-t border-border">
              {(
                [
                  ["Email", <a key="e" href={`mailto:${EMAIL}`} className="hover:text-copper">{EMAIL}</a>],
                  ["Phone", <a key="p" href="tel:+48793170854" className="hover:text-copper">+48 793 170 854</a>],
                  ["Location", "Gdańsk, Poland"],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-fg/[0.06] py-5">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream-dim">{k}</dt>
                  <dd className="text-[0.88rem] font-light">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-3 border-t border-fg/[0.07] px-[clamp(1.5rem,6vw,4rem)] py-8 md:flex-row md:items-center md:justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.12em] text-cream-dim/60">
          © 2026 Valeriia Rumiantceva
        </span>
        <button
          onClick={() => scrollTo("hero")}
          className="w-fit py-3 font-mono text-[0.7rem] tracking-[0.12em] text-cream-dim/60 transition-colors hover:text-cream-dim"
        >
          ↑ Back to top
        </button>
      </footer>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightbox(null)}
          {...makeSwipe(() => stepLightbox(1), () => stepLightbox(-1))}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-bg/95 p-6 md:p-10"
        >
          <img
            src={lightbox.images[lightbox.index]}
            alt={`Expanded view, image ${lightbox.index + 1} of ${lightbox.images.length}`}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className={`${circleBtn} absolute right-4 top-4 text-xl`}
          >
            ×
          </button>
          {lightbox.images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(-1);
                }}
                className={`${circleBtn} absolute left-4 top-1/2 -translate-y-1/2`}
              >
                ‹
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(1);
                }}
                className={`${circleBtn} absolute right-4 top-1/2 -translate-y-1/2`}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
