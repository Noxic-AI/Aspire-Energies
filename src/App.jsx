import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Banknote,
  Check,
  CircleCheck,
  Factory,
  Grid2X2,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import "./App.css";
import { siteCompany, siteImages } from "./config/siteConfig";

const navItems = [
  ["About", "about"],
  ["Types of Solar", "types"],
  ["Projects", "projects"],
  ["Banking & Finance", "finance"],
  ["Features", "features"],
  ["Photos", "photos"],
  ["Contact Us", "contact"],
];

const projects = [
  {
    title: "Bharat Institute of Technology",
    place: "Bengaluru · 2.4 MWp",
    image: siteImages.projects.campus,
    copy: "A campus-wide canopy that turns parking infrastructure into a productive energy asset.",
  },
  {
    title: "Kaveri Precision Works",
    place: "Pune · 780 kWp",
    image: siteImages.projects.factory,
    copy: "Rooftop generation engineered around shift patterns, demand charges, and expansion plans.",
  },
  {
    title: "The Mehta Residence",
    place: "Ahmedabad · 12.6 kWp",
    image: siteImages.projects.home,
    copy: "Quiet, high-yield generation designed around a family home and its future energy needs.",
  },
  {
    title: "Aranya Logistics Hub",
    place: "Hyderabad · 1.1 MWp",
    image: siteImages.projects.warehouse,
    copy: "A high-output warehouse system built to reduce daytime demand and keep operations moving.",
  },
];

function scrollToId(id, close) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (close) close();
}

function Motion({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-in ${className}`}
      style={{ "--motion-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <a
      href="#home"
      onClick={(event) => {
        event.preventDefault();
        scrollToId("home");
      }}
      className="flex items-center gap-3"
      data-testid="link-logo"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(220,168,38,.22)]">
        <Sun size={22} strokeWidth={2.5} />
      </span>

      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[.12em] text-secondary">
          HELIOGRID
        </span>

        <span className="mt-1 block text-[9px] font-semibold tracking-[.3em] text-muted-foreground">
          SOLAR SYSTEMS
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    scrollToId(id, () => setOpen(false));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-secondary/10 bg-background/90 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Logo />

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-[12px] font-semibold text-muted-foreground transition-colors hover:text-secondary"
              data-testid={`link-nav-${id}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${siteCompany.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-[12px] font-bold text-secondary"
            data-testid="link-header-phone"
          >
            <Phone size={14} />
            {siteCompany.phone}
          </a>

          <button
            onClick={() => go("contact")}
            className="rounded-full bg-secondary px-5 py-3 text-xs font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5"
            data-testid="button-header-consultation"
          >
            Book a consultation
            <ArrowRight className="ml-2 inline" size={14} />
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-secondary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          data-testid="button-mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-4 lg:hidden">
          <div className="container-shell flex flex-col gap-1">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="border-b border-border py-3 text-left text-sm font-semibold text-secondary"
                data-testid={`link-mobile-nav-${id}`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => go("contact")}
              className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              data-testid="button-mobile-consultation"
            >
              Book a consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, copy, dark = false }) {
  return (
    <Motion className="max-w-2xl">
      <p className={`eyebrow mb-4 ${dark ? "text-primary" : "text-accent"}`}>
        {eyebrow}
      </p>

      <h2
        className={`display-font text-4xl font-extrabold leading-[.98] sm:text-5xl ${
          dark ? "text-secondary-foreground" : "text-secondary"
        }`}
      >
        {title}
      </h2>

      {copy && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 ${
            dark ? "text-secondary-foreground/65" : "text-muted-foreground"
          }`}
        >
          {copy}
        </p>
      )}
    </Motion>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] scroll-mt-24 items-end overflow-hidden bg-secondary pt-24 text-secondary-foreground sm:min-h-[740px] sm:pt-28"
    >
      <img
        src={siteImages.hero}
        alt="Modern home with rooftop solar panels at sunrise"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,36,43,.94)_0%,rgba(9,36,43,.74)_40%,rgba(9,36,43,.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,36,43,.82),transparent_42%)]" />

      <div className="container-shell relative z-10 pb-20 pt-20 sm:pb-24">
        <div className="max-w-[720px]">
          <p className="eyebrow reveal text-primary">
            Engineering a brighter baseline
          </p>

          <h1 className="display-font reveal delay-1 mt-5 text-6xl font-extrabold leading-[.9] tracking-[-.065em] sm:text-8xl">
            The power
            <br />
            <span className="text-primary">to choose.</span>
          </h1>

          <p className="reveal delay-2 mt-7 max-w-lg text-lg leading-8 text-secondary-foreground/75">
            HelioGrid designs and delivers solar systems that make energy more
            predictable, more independent, and ready for what comes next.
          </p>

          <div className="reveal delay-3 mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("contact")}
              className="rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1"
              data-testid="button-hero-consultation"
            >
              Plan your switch
              <ArrowRight className="ml-2 inline" size={16} />
            </button>

            <button
              onClick={() => scrollToId("projects")}
              className="rounded-full border border-secondary-foreground/30 bg-secondary-foreground/5 px-6 py-4 text-sm font-bold text-secondary-foreground backdrop-blur-sm transition-colors hover:bg-secondary-foreground/15"
              data-testid="button-hero-projects"
            >
              <Play className="mr-2 inline" size={14} fill="currentColor" />
              See our work
            </button>
          </div>
        </div>

        <div className="mt-20 grid max-w-2xl grid-cols-3 gap-5 border-t border-secondary-foreground/20 pt-6 sm:gap-10">
          {[
            ["12+", "years building"],
            ["48.6 MWp", "installed capacity"],
            ["25 yr", "performance promise"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className="reveal delay-3"
              data-testid={`stat-hero-${index}`}
            >
              <p className="display-font text-2xl font-bold text-primary sm:text-3xl">
                {value}
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[.12em] text-secondary-foreground/55">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-8 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-secondary-foreground/50 lg:flex">
        <span className="h-px w-12 bg-secondary-foreground/30" />
        Scroll to explore
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-background py-24 sm:py-32">
      <div className="container-shell grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Why HelioGrid"
            title="Good energy is a long-term relationship."
            copy="A solar system is an important decision. We bring the care of an owner, the rigor of an engineer, and the clarity of a good advisor to every project."
          />

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-7 sm:grid-cols-3">
            {[
              [
                "01",
                "Listen first",
                "We start with how your site actually uses energy.",
              ],
              [
                "02",
                "Design honestly",
                "Every recommendation is grounded in real generation data.",
              ],
              [
                "03",
                "Stay involved",
                "Our service team remains accountable long after handover.",
              ],
            ].map(([num, title, text]) => (
              <div key={num}>
                <span className="font-mono text-xs font-bold text-primary">
                  {num}
                </span>

                <h3 className="mt-3 text-sm font-bold text-secondary">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-accent/20">
          <div className="absolute left-8 top-8 z-10 rounded-full border border-secondary/15 bg-background/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-secondary backdrop-blur">
            Est. 2012 · Bengaluru
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--accent)/.38),transparent_55%)]" />

          <div className="absolute bottom-0 right-0 h-[82%] w-[83%] rounded-tl-[160px] bg-secondary/90" />

          <div className="absolute bottom-[25%] right-[14%] h-40 w-56 -skew-y-12 rounded-lg border-4 border-primary/75 bg-[repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(226,178,46,.4)_26px,transparent_27px),repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(226,178,46,.4)_25px,transparent_26px)] shadow-2xl" />

          <div className="absolute bottom-8 left-8 max-w-[230px] text-sm leading-6 text-secondary-foreground/70">
            From rooftop assessments to commissioning day, we make the complex
            feel considered.
          </div>
        </div>
      </div>
    </section>
  );
}

function SolarTypes() {
  const [active, setActive] = useState("dcr");

  const content =
    active === "dcr"
      ? {
          title: "DCR solar modules",
          label: "Domestic Content Requirement",
          copy: "Modules made with locally manufactured cells and modules. DCR systems are often the preferred path for subsidy-linked residential projects and programs that prioritize domestic manufacturing.",
          points: [
            "Eligible for select government subsidy programs",
            "Indian-made cells and modules",
            "Best fit for homes, institutions and subsidy-led projects",
          ],
        }
      : {
          title: "NDCR solar modules",
          label: "Non-Domestic Content Requirement",
          copy: "High-performance modules manufactured with globally sourced cells. NDCR opens a wider technical palette for commercial and industrial projects where output, footprint and project economics lead the decision.",
          points: [
            "Wider choice of high-efficiency technologies",
            "Ideal for C&I rooftops and open-access projects",
            "Optimized for maximum yield per square metre",
          ],
        };

  return (
    <section id="types" className="scroll-mt-24 bg-[#e7eee9] py-24 sm:py-32">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Choose your path"
            title="Two routes. One clear outcome."
            copy="The right module is the one that matches your project goals, eligibility, and operating reality. We will help you make that call with confidence."
          />

          <div
            className="flex rounded-full border border-secondary/15 bg-background/60 p-1"
            role="tablist"
          >
            <button
              onClick={() => setActive("dcr")}
              className={`rounded-full px-5 py-3 text-xs font-bold transition-all ${
                active === "dcr"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              }`}
              data-testid="tab-dcr"
            >
              DCR
            </button>

            <button
              onClick={() => setActive("ndcr")}
              className={`rounded-full px-5 py-3 text-xs font-bold transition-all ${
                active === "ndcr"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              }`}
              data-testid="tab-ndcr"
            >
              NDCR
            </button>
          </div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[28px] bg-secondary lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[310px] overflow-hidden p-8 sm:p-12">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-primary/30" />
            <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border border-primary/20" />

            <div className="solar-drift absolute bottom-10 left-10 grid h-28 w-28 place-items-center rounded-full bg-primary text-center text-xs font-bold uppercase tracking-[.12em] text-primary-foreground">
              Power
              <br />
              forward
            </div>

            <div className="relative max-w-xs">
              <p className="eyebrow text-primary">{content.label}</p>

              <h3 className="display-font mt-5 text-4xl font-bold leading-none text-secondary-foreground">
                {content.title}
              </h3>
            </div>
          </div>

          <div className="bg-background p-8 sm:p-12">
            <p className="max-w-xl text-lg leading-8 text-secondary">
              {content.copy}
            </p>

            <ul className="mt-9 grid gap-4">
              {content.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm font-medium text-muted-foreground"
                >
                  <CircleCheck
                    className="mt-0.5 shrink-0 text-accent"
                    size={18}
                  />
                  {point}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToId("contact")}
              className="mt-10 text-sm font-bold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-accent"
              data-testid={`button-${active}-advice`}
            >
              Talk to a solar advisor
              <ArrowRight className="ml-2 inline" size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="isolate scroll-mt-24 overflow-hidden bg-secondary py-24 text-secondary-foreground sm:py-32"
    >
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <SectionHeading
            dark
            eyebrow="Built for the real world"
            title="A portfolio with a point of view."
            copy="Every installation is different. The standard stays the same: thoughtful design, disciplined delivery, and performance you can see."
          />

          <button
            onClick={() => scrollToId("contact")}
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary"
            data-testid="button-projects-enquire"
          >
            Start a project
            <ArrowDownRight size={18} />
          </button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Motion key={project.title} delay={index * 90}>
              <article
                className="group relative min-h-[300px] overflow-hidden rounded-[24px] sm:min-h-[350px]"
                data-testid={`card-project-${index}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="image-wash absolute inset-0" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="eyebrow text-primary">{project.place}</p>

                  <h3 className="display-font mt-2 text-2xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-secondary-foreground/70">
                    {project.copy}
                  </p>
                </div>
              </article>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finance() {
  const financeOptions = [
    {
      icon: Banknote,
      title: "Capex purchase",
      copy: "Own the system outright. Maximize long-term savings and asset value with a straightforward capital investment.",
    },
    {
      icon: Grid2X2,
      title: "Solar loan",
      copy: "Spread the investment across a structured tenure while your system begins offsetting the electricity bill.",
    },
    {
      icon: Factory,
      title: "Opex / RESCO",
      copy: "Generate clean power without upfront capex through a long-term power purchase agreement.",
    },
    {
      icon: ShieldCheck,
      title: "What we prepare",
      copy: "Project report, generation estimate, payback model, documentation, and lender-ready technical inputs.",
    },
  ];

  return (
    <section id="finance" className="scroll-mt-24 bg-background py-24 sm:py-32">
      <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Banking & finance"
          title="A better return starts with a better plan."
          copy="Solar is an infrastructure investment. We help you build the case clearly, then connect it to finance partners who understand the asset."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {financeOptions.map(({ icon: Icon, title, copy }, index) => (
            <div
              key={title}
              className={`rounded-2xl border border-border p-6 transition-colors hover:border-primary ${
                index === 3 ? "bg-[#e7eee9]" : "bg-card"
              }`}
              data-testid={`card-finance-${index}`}
            >
              <Icon className="text-accent" size={23} />

              <h3 className="mt-8 font-bold text-secondary">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    [
      "Yield-led engineering",
      "We model shade, heat, orientation, tariff and load - not just roof area.",
    ],
    [
      "One accountable team",
      "Design, procurement, installation and commissioning move as one considered process.",
    ],
    [
      "Measured performance",
      "Remote monitoring makes output visible and service proactive, with clear reporting.",
    ],
    [
      "Designed to last",
      "Premium components, precise installation and a service plan built around your horizon.",
    ],
  ];

  return (
    <section
      id="features"
      className="scroll-mt-24 border-y border-secondary/10 bg-[#f0d36b] py-24 sm:py-28"
    >
      <div className="container-shell grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
        <div>
          <p className="eyebrow text-secondary/65">The HelioGrid standard</p>

          <h2 className="display-font mt-4 text-4xl font-extrabold leading-none text-secondary sm:text-5xl">
            Good systems are felt in the details.
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {features.map(([title, text], index) => (
            <div
              key={title}
              className="border-t border-secondary/20 pt-5"
              data-testid={`feature-${index}`}
            >
              <span className="font-mono text-xs text-secondary/55">
                0{index + 1}
              </span>

              <h3 className="mt-4 text-lg font-bold text-secondary">{title}</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-secondary/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photos() {
  const photos = siteImages.gallery;

  return (
    <section
      id="photos"
      className="isolate scroll-mt-24 overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="container-shell">
        <SectionHeading
          eyebrow="In the field"
          title="A closer look at the work."
          copy="A solar installation should feel like it belongs where it is. Explore the textures, scale, and quiet precision behind our projects."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-[1.35fr_.65fr]">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[1.35]">
            <img
              src={photos[0]}
              alt="Residential solar project"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <span className="absolute bottom-5 left-5 rounded-full bg-background/85 px-4 py-2 text-[11px] font-bold text-secondary backdrop-blur">
              Residential / rooftop
            </span>
          </div>

          <div className="grid gap-4">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[1.35]">
              <img
                src={photos[1]}
                alt="Industrial solar project"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <span className="absolute bottom-5 left-5 rounded-full bg-background/85 px-4 py-2 text-[11px] font-bold text-secondary backdrop-blur">
                Industrial / rooftop
              </span>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[1.35]">
              <img
                src={photos[2]}
                alt="Home solar project at dusk"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <span className="absolute bottom-5 left-5 rounded-full bg-background/85 px-4 py-2 text-[11px] font-bold text-secondary backdrop-blur">
                Home / integrated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative isolate z-10 scroll-mt-24 overflow-hidden bg-[#e7eee9] py-24 sm:py-32"
    >
      <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Let's talk energy"
            title="Your roof has more to say."
            copy="Tell us a little about your site. A HelioGrid advisor will get back to you within one business day with a useful first conversation - not a hard sell."
          />

          <div className="mt-10 space-y-3 text-sm font-medium text-secondary">
            <a
              href={`tel:${siteCompany.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 hover:text-accent"
              data-testid="link-contact-phone"
            >
              <Phone size={17} />
              {siteCompany.phone}
            </a>

            <p className="flex items-center gap-3">
              <span className="h-[17px] w-[17px] rounded-full border-2 border-accent" />
              {siteCompany.locations}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-background p-7 shadow-[0_16px_50px_rgba(19,48,55,.08)] sm:p-10">
          {sent ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check size={26} />
              </span>

              <h3 className="display-font mt-6 text-3xl font-bold text-secondary">
                We have your details.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Thank you for reaching out. Our solar advisor will be in touch
                within one business day.
              </p>

              <button
                onClick={() => setSent(false)}
                className="mt-7 text-sm font-bold text-secondary underline decoration-primary underline-offset-4"
                data-testid="button-send-another"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="grid gap-5"
              data-testid="form-contact"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-bold text-secondary">
                  Your name
                  <input
                    required
                    name="name"
                    placeholder="Name"
                    className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    data-testid="input-name"
                  />
                </label>

                <label className="grid gap-2 text-xs font-bold text-secondary">
                  Work email
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    data-testid="input-email"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-xs font-bold text-secondary">
                I am exploring
                <select
                  name="interest"
                  className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-normal outline-none focus:border-primary"
                  data-testid="select-interest"
                >
                  <option>Solar for my home</option>
                  <option>Solar for my business</option>
                  <option>DCR / subsidy guidance</option>
                  <option>Project finance</option>
                </select>
              </label>

              <label className="grid gap-2 text-xs font-bold text-secondary">
                A little about your site
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Roof type, location, approximate monthly bill..."
                  className="resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  data-testid="textarea-message"
                />
              </label>

              <button
                type="submit"
                className="mt-1 rounded-xl bg-secondary px-5 py-4 text-sm font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5"
                data-testid="button-submit-contact"
              >
                Request a consultation
                <ArrowRight className="ml-2 inline" size={16} />
              </button>

              <p className="text-[11px] leading-5 text-muted-foreground">
                By submitting, you agree to be contacted about your enquiry. We
                keep your details private and never sell your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary py-12 text-secondary-foreground">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div>
            <Logo />

            <p className="mt-5 max-w-xs text-sm leading-6 text-secondary-foreground/55">
              Independent energy, engineered for the places that matter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs font-semibold text-secondary-foreground/65 sm:grid-cols-3">
            {navItems.slice(0, 6).map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="text-left hover:text-primary"
                data-testid={`link-footer-${id}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-secondary-foreground/15 pt-5 text-[11px] text-secondary-foreground/45 sm:flex-row">
          <span>© 2024 HelioGrid Solar Systems Pvt. Ltd.</span>
          <span>Made for a brighter baseline.</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.title = "HelioGrid Solar - The power to choose";
  }, []);

  return (
    <div className="grain min-h-dvh overflow-hidden bg-background">
      <Header />

      <main>
        <Hero />
        <About />
        <SolarTypes />
        <Projects />
        <Finance />
        <Features />
        <Photos />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
