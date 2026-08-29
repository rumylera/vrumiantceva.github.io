import { useState } from "react";

const BG = "#0d2720";
const SURFACE = "#132820";
const FG = "#f0ede6";
const DIM = "#b8b0a0";
const COPPER = "#c46b3a";
const BORDER = "rgba(240,237,230,0.1)";
const SERIF = "'DM Serif Display', Georgia, serif";
const SANS = "'Work Sans', system-ui, sans-serif";
const MONO = "'DM Mono', monospace";

const projects = [
  {
    id: "01",
    title: "Ripafratta Fortress",
    year: "2026",
    location: "Ripafratta, Italy",
    type: "Hostel / Café / Climbing Complex",
    capacity: "30 guests",
    description:
      "Adaptive Reuse of a medieval fortress in Tuscany.",
    images: ["/Ripafratta.png", "/Ripafratta2.jpg", "/Ripafratta3.jpg"],
  },
  {
    id: "02",
    title: "ViaVia FliekPiek",
    year: "2024",
    location: "Cape Town, South Africa",
    type: "Hostel / Café / Cinema",
    capacity: "40 guests",
    description:
      "A cultural complex seamlessly integrated into a hillside park in Cape Town. After researching the site with CPUT students, two insights emerged: Capetonians are deeply committed to the natural landscape, and there is a notable absence of cinemas in this part of the city. The result — a long, low-rise structure with a corridor-terrace as its spine, shielded from southeast winds by a system of rotating copper shutters. Materials: rammed earth, non-oxidised copper (aging to teal over time), and glass.",
    images: ["/viavia.jpg","/viavia_2.jpg", "/viavia_3.jpg", "/viavia_4.jpg", "/viavia_5.jpg", "/viavia_6.jpg", "/viavia_7.jpg", "/viavia_8.jpg", "/viavia_9.jpg", "/viavia_10.jpg", "/ViaVia_model.png"],
  },
  {
    id: "03",
    title: "Philosophia",
    year: "2023",
    location: "Gdansk, Poland",
    type: "Residential Complex",
    capacity: "24 flats",
    description:
      "A residential complex on an angular plot in Gdansk. The ground floor activates the street with a coffee shop, library/bookstore, record store, gym, restaurant, art supply store, and wine shop. Upper floors hold 24 flats across two typologies — 57 m² two-bedroom units and 97 m² larger flats — served by a shared underground parking level. The elevations use a restrained palette of grey render, dark green vertical cladding, and warm timber door surrounds.",
    images: ["/image.png", "/philosophia2.png", "/philosophia3.png"],
  },
];

const sketchbook = [
  {
    id: "01",
    caption: "Tarte Tatin, Hasselt",
    medium: "Ink and pencil on paper",
    image: "IMG_0938.png",
  },
  {
    id: "02",
    caption: "Restaurant interior, Belgium",
    medium: "Ink and pencil on paper",
    image: "IMG_0936.png",
  },
  {
    id: "03",
    caption: "Boulebaar, Hasselt",
    medium: "Ink and pencil on paper",
    image: "IMG_0937.png",
  },
  {
    id: "04",
    caption: "Klatch.bar, Hasselt",
    medium: "Ink and pencil on paper",
    image: "IMG_0914.PNG",
  },
];
const digital = [
  {
    id: "d1",
    caption: "U Holmov Jest Podcast episode cover",
    medium: "Procreate",
    image: "U_Holmov_160_1.png",
  },
  {
    id: "d2",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee.jpg",
  },
  {
    id: "d3",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee1.jpg",
  },
  {
    id: "d4",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee2.jpg",
  },
  {
    id: "d5",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee3.jpg",
  },
  {
    id: "d6",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee4.jpg",
  },
  {
    id: "d7",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee5.jpg",
  },
  {
    id: "d8",
    caption: "One coffee one sketch meeting poster",
    medium: "Procreate",
    image: "onecoffee6.jpg",
  },
];

const skills = [
  "AutoCAD", "Revit", "SketchUp",
  "Procreate", "Figma",
  "Adobe InDesign", "C++", "Pyhton",
  "HTML and CSS", "MATLAB", "MySQL",
];

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});

const nextSlide = (id: string, total: number) => {
  setSlideIndex(prev => ({ ...prev, [id]: ((prev[id] ?? 0) + 1) % total }));
};
const prevSlide = (id: string, total: number) => {
  setSlideIndex(prev => ({ ...prev, [id]: ((prev[id] ?? 0) - 1 + total) % total }));
};

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: "100%", width: "100%", backgroundColor: BG, color: FG, fontFamily: SANS }}>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.25rem 2rem",
          borderBottom: `1px solid ${BORDER}`,
          backgroundColor: "rgba(13,39,32,0.92)",
          backdropFilter: "blur(14px)",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.2em", color: FG, background: "none", border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          V. Rumiantceva
        </button>

        <div className="hidden md:flex" style={{ gap: "2rem" }}>
          {["projects", "sketchbook","digital", "about", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.18em", color: DIM, textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = FG)}
              onMouseLeave={e => (e.currentTarget.style.color = DIM)}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "4px", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: FG }} />
          <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: FG }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem", backgroundColor: BG }}>
          {["projects", "sketchbook","digital", "about", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{ fontFamily: SERIF, fontSize: "2rem", color: FG, background: "none", border: "none", cursor: "pointer" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
          paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "clamp(2rem, 6vw, 4rem)", paddingRight: "clamp(2rem, 6vw, 4rem)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Split canvas */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ width: "100%", backgroundColor: BG }} className="md:w-1/2" />
          <div style={{ display: "none", position: "relative", backgroundColor: SURFACE }} className="md:block md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1602367381755-effb73319501?w=1200&h=900&fit=crop&auto=format"
              alt="Cape Town architecture"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, mixBlendMode: "luminosity" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 25%)` }} />
          </div>
        </div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.22em", color: COPPER, textTransform: "uppercase", marginBottom: "1.5rem" }}>
           Portfolio 2026
          </p>
          <h1
            style={{
              fontFamily: SERIF, fontWeight: 400,
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              lineHeight: 1, marginBottom: "2rem",
            }}
          >
            Valeriia
            <br />
            <em>Rumiantceva</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: "26rem", color: DIM, fontWeight: 300, marginBottom: "2.5rem" }}>
            Architecture BSc at Politechnika Gdańska (2026). Erasmus+ at Universiteit Hasselt (a.y. 23/24). 
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                padding: "0.75rem 1.5rem", fontFamily: MONO, fontSize: "0.68rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                border: `1px solid rgba(240,237,230,0.3)`, background: "none", color: FG,
                cursor: "pointer", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              View Projects
            </button>
            <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: DIM }}>↓ Scroll</span>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", fontFamily: MONO, fontSize: "0.65rem", color: "rgba(184,176,160,0.4)", letterSpacing: "0.12em" }}>
          Gdańsk, Poland · 2026
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "6rem clamp(2rem, 6vw, 4rem)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem", marginBottom: "0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400 }}>Projects</h2>
          </div>
          <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>Study Work · BSc</span>
        </div>

        {projects.map((p) => (
          <div key={p.id}>
            <button
              style={{
                width: "100%", textAlign: "left", padding: "1.75rem 0",
                borderBottom: `1px solid ${BORDER}`, background: "none", border: "none",
                borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "rgba(240,237,230,0.08)",
                cursor: "pointer",
              }}
              onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem, 3vw, 2.5rem)", flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: COPPER, flexShrink: 0 }}>{p.id}</span>
                  <span
                    style={{ fontFamily: SERIF, fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", color: activeProject === p.id ? COPPER : FG, transition: "color 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {p.title}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM, display: window.innerWidth > 768 ? "block" : "none" }}>{p.type}</span>
                  <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>{p.year}</span>
                  <span style={{ color: DIM, fontSize: "0.9rem", display: "inline-block", transform: activeProject === p.id ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </div>
              </div>
            </button>

            {activeProject === p.id && (
              <div style={{ paddingBottom: "2.5rem", borderBottom: `1px solid rgba(240,237,230,0.08)`, display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="md:grid-cols-2">
               <div style={{ overflow: "hidden", backgroundColor: SURFACE, position: "relative", maxHeight: "38vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
  {p.images && p.images.length > 0 && (
    <>
      <img
        src={p.images[slideIndex[p.id] ?? 0]}
        alt={p.title}
        style={{ width: "100%", height: "100%", maxHeight: "65%", objectFit: "contain", objectPosition: "center", opacity: 0.88, transition: "opacity 0.4s" }}
      />

      {p.images.length > 1 && (
        <>
          {/* Prev / Next arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(p.id, p.images.length); }}
            style={{
              position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
              width: "2rem", height: "2rem", borderRadius: "50%",
              background: "rgba(13,39,32,0.6)", border: `1px solid ${BORDER}`, color: FG,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: MONO, fontSize: "0.9rem",
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(p.id, p.images.length); }}
            style={{
              position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
              width: "2rem", height: "2rem", borderRadius: "50%",
              background: "rgba(13,39,32,0.6)", border: `1px solid ${BORDER}`, color: FG,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: MONO, fontSize: "0.9rem",
            }}
          >
            ›
          </button>

          {/* Dot indicators */}
          <div style={{ position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem" }}>
            {p.images.map((_, i) => (
              <span
                key={i}
                onClick={(e) => { e.stopPropagation(); setSlideIndex(prev => ({ ...prev, [p.id]: i })); }}
                style={{
                  width: "6px", height: "6px", borderRadius: "50%", cursor: "pointer",
                  background: (slideIndex[p.id] ?? 0) === i ? COPPER : "rgba(240,237,230,0.35)",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  )}
</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "0.5rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                    {[["Location", p.location], ["Type", p.type], ["Year", p.year], ["Capacity", p.capacity]].map(([label, val]) => (
                      <div key={`${p.id}-${label}`}>
                        <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{label}</p>
                        <p style={{ fontSize: "0.85rem", color: FG, fontWeight: 400 }}>{val}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: DIM, fontWeight: 300 }}>{p.description}</p>
                  <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(184,176,160,0.35)", cursor: "pointer" }} onClick={() => setActiveProject(null)}>↑ Collapse</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── SKETCHBOOK ───────────────────────────────────────── */}
      <section id="sketchbook" style={{ padding: "6rem clamp(2rem, 6vw, 4rem)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400 }}>Sketchbook</h2>
          </div>
          <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>Observational Drawing</span>
        </div>

        <p style={{ maxWidth: "34rem", fontSize: "0.9rem", lineHeight: 1.85, color: DIM, fontWeight: 300, marginBottom: "3rem" }}>
          Alongside project work, a sustained drawing practice — cafés, interiors, and spaces encountered during Erasmus in Belgium. Pencil and ink on paper.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="md:grid-cols-4">
          {sketchbook.map((s, i) => (
            <div
              key={s.id}
              style={{ marginTop: i === 1 ? "3rem" : i === 3 ? "1.5rem" : "0" }}
            >
              <div style={{ overflow: "hidden", backgroundColor: SURFACE, position: "relative", cursor: "pointer" }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector(".sk-overlay") as HTMLElement;
                  if (img) { img.style.opacity = "1"; img.style.transform = "scale(1.05)"; }
                  if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector(".sk-overlay") as HTMLElement;
                  if (img) { img.style.opacity = "0.75"; img.style.transform = "scale(1)"; }
                  if (overlay) overlay.style.opacity = "0";
                }}
              >
                <img
                  src={s.image}
                  alt={s.caption}
                  style={{ width: "100%", height: "auto", display: "block", opacity: 0, transition: "opacity 0.4s, transform 0.5s" }}
                />
                <div
                  className="sk-overlay"
                  style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: "1rem", background: "linear-gradient(to top, rgba(13,39,32,0.85) 0%, transparent 55%)" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.1em" }}>{s.medium}</span>
                </div>
              </div>
              <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <p style={{ fontFamily: SERIF, fontSize: "0.9rem", lineHeight: 1.3 }}>{s.caption}</p>
                <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, flexShrink: 0, marginTop: "2px" }}>{s.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* ── DIGITAL WORKS ───────────────────────────────────────── */}
      <section id="digital" style={{ padding: "6rem clamp(2rem, 6vw, 4rem)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400 }}>Digital Works</h2>
          </div>
        </div>


        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="md:grid-cols-4">
          {digital.map((s, i) => (
            <div
              key={s.id}
              style={{ marginTop: i % 4 === 1 ? "3rem" : i % 4 === 3 ? "1.5rem" : "0" }}
            >
              <div style={{ overflow: "hidden", backgroundColor: SURFACE, position: "relative", cursor: "pointer" }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector(".sk-overlay") as HTMLElement;
                  if (img) { img.style.opacity = "1"; img.style.transform = "scale(1.05)"; }
                  if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  const overlay = e.currentTarget.querySelector(".sk-overlay") as HTMLElement;
                  if (img) { img.style.opacity = "0.75"; img.style.transform = "scale(1)"; }
                  if (overlay) overlay.style.opacity = "0";
                }}
              >
                <img
                  src={s.image}
                  alt={s.caption}
                  style={{ width: "100%", height: "auto", display: "block", opacity: 0.75, transition: "opacity 0.4s, transform 0.5s" }}
                />
                <div
                  className="sk-overlay"
                  style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: "1rem", background: "linear-gradient(to top, rgba(13,39,32,0.85) 0%, transparent 55%)" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.1em" }}>{s.medium}</span>
                </div>
              </div>
              <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <p style={{ fontFamily: SERIF, fontSize: "0.9rem", lineHeight: 1.3 }}>{s.caption}</p>
                <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, flexShrink: 0, marginTop: "2px" }}>{s.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "6rem clamp(2rem, 6vw, 4rem)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem", marginBottom: "4rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: COPPER, letterSpacing: "0.2em" }}></span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400 }}>About</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="md:grid-cols-2">

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.35, fontWeight: 400 }}>
              Architecture graduate with a background in mathematics and an eye trained by constant drawing.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: DIM, fontWeight: 300, lineHeight: 1.85, fontSize: "0.9rem" }}>
              <p>
                Currently completing a MSc in Artificial Intelligence for Science and Technology at University of Milano-Bicocca (2026 - current). BSc in Architecture at Politechnika Gdańska (2021 – 2026). Previously studied Applied Mathematics and Computer Science at St Petersburg State University (2018 – 2021). Erasmus+ exchange at Universiteit Hasselt, Belgium (2023 – 2024).
              </p>
              <p>
                The mathematical training informs how I think about structure and systems. The sketchbook practice keeps me honest about what buildings actually feel like from the inside.
              </p>
            </div>

            {/* Skills */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>Tools & Skills</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skills.map(s => (
                  <span
                    key={s}
                    style={{ fontFamily: MONO, fontSize: "0.65rem", padding: "0.3rem 0.75rem", border: `1px solid rgba(240,237,230,0.15)`, color: DIM, letterSpacing: "0.05em" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>Languages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem 2rem" }}>
                {[
                  ["Russian", "native"], ["English", "fluent"],
                  ["Polish", "conversational"], ["German", "basic"],["French", "basic"],["Spanish", "basic"], ["Swedish", "basic"],["Italian", "basic"]
                ].map(([lang, level]) => (
                  <div key={lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 400 }}>{lang}</span>
                    <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, letterSpacing: "0.06em" }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: COPPER, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>Education</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  ["University of Milano-Bicocca", "AI4ST, MSc", "2026 – current"],
                  ["Politechnika Gdańska", "Architecture, BSc", " 2021 – 2026"],
                  ["Universiteit Hasselt", "Architecture, Erasmus+", "2023 – 2024"],
                  ["St Petersburg State University", "Applied Mathematics & CS, BSc", "2018 – 2021"],
                ].map(([school, degree, years]) => (
                  <div key={school} style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 400 }}>{school}</p>
                      <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, marginTop: "0.1rem" }}>{degree}</p>
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, flexShrink: 0 }}>{years}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "6rem clamp(2rem, 6vw, 4rem)", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: COPPER, letterSpacing: "0.2em" }}></span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400 }}>Contact</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="md:grid-cols-2">
          <div>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.2, fontWeight: 400, marginBottom: "2.5rem" }}>
              Open to collaborations, paid internships, and project work.
            </p>
            <a
              href="mailto:rumylera@yandex.ru"
              style={{ fontSize: "1rem", color: DIM, fontWeight: 300, textDecoration: "underline", textUnderlineOffset: "6px", textDecorationColor: "rgba(184,176,160,0.3)", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = COPPER)}
              onMouseLeave={e => (e.currentTarget.style.color = DIM)}
            >
              rumylera@yandex.ru
            </a>
            <br />
             <a
              href="mailto:rumylera@gmail.com"
              style={{ fontSize: "1rem", color: DIM, fontWeight: 300, textDecoration: "underline", textUnderlineOffset: "6px", textDecorationColor: "rgba(184,176,160,0.3)", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = COPPER)}
              onMouseLeave={e => (e.currentTarget.style.color = DIM)}
            >
              rumylera@gmail.com
            </a>
            <br />
          </div>

          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            {[
              ["Phone", "+48 793 170 854"],
              ["Location", "80-870 Gdańsk, Poland"],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", borderBottom: `1px solid rgba(240,237,230,0.06)` }}
              >
                <span style={{ fontFamily: MONO, fontSize: "0.62rem", color: DIM, letterSpacing: "0.16em", textTransform: "uppercase" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 300 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          padding: "2rem clamp(2rem, 6vw, 4rem)",
          borderTop: `1px solid rgba(240,237,230,0.07)`,
          display: "flex", flexDirection: "column", gap: "0.75rem",
        }}
        className="md:flex-row md:justify-between md:items-center"
      >
        <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(184,176,160,0.35)", letterSpacing: "0.12em" }}>
          © 2026 Valeriia Rumiantceva — Portfolio 
        </span>
        <button
          onClick={() => scrollTo("hero")}
          style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(184,176,160,0.35)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = DIM)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(184,176,160,0.35)")}
        >
          ↑ Back to top
        </button>
      </footer>
    </div>
  );
}
