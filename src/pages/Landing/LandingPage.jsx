import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Anchor,
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Building2,
  ChevronRight,
  Lock,
  Menu,
  Package,
  Route as RouteIcon,
  ShieldCheck,
  Ship,
  Wrench,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Platform", id: "platform" },
  { label: "Operations", id: "operations" },
  { label: "Modules", id: "modules" },
  { label: "Security", id: "security" },
];

const modules = [
  {
    number: "01",
    title: "Fleet Management",
    description:
      "Live vessel status, position and operational health across the entire fleet.",
    icon: Ship,
  },
  {
    number: "02",
    title: "Maintenance",
    description:
      "Planned, corrective and statutory work with complete traceability.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Procurement",
    description:
      "Requisitions, approvals, purchase orders and receipts in one flow.",
    icon: Package,
  },
  {
    number: "04",
    title: "Inventory",
    description:
      "Critical spares and minimum-level enforcement across every vessel.",
    icon: Boxes,
  },
  {
    number: "05",
    title: "Compliance",
    description:
      "Certificates, surveys and inspections that never disappear from view.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "QHSE",
    description:
      "Incidents, deviations, risk and corrective actions in one system.",
    icon: Anchor,
  },
];

export default function Landing() {
  const root = useRef(null);
  const heroImage = useRef(null);
  const heroText = useRef(null);
  const heroTitle = useRef(null);
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!root.current) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let raf = 0;

    const update = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    const ctx = gsap.context(() => {
      // HERO IMAGE ENTRY
      gsap.fromTo(
        heroImage.current,
        {
          scale: 1.22,
          clipPath: "inset(12% 12% 12% 12% round 24px)",
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.8,
          ease: "power4.out",
          delay: 0.15,
        }
      );

      // HERO TEXT ENTRY
      gsap.fromTo(
        ".hero-line",
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.35,
        }
      );

      gsap.fromTo(
        ".hero-meta",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.65,
          ease: "power3.out",
        }
      );

      // HERO IMAGE SCROLL PARALLAX
      gsap.to(heroImage.current, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // HERO TITLE PARALLAX
      gsap.to(heroText.current, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // SECTION REVEALS
      gsap.utils.toArray(".reveal").forEach((item) => {
        gsap.fromTo(
          item,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // IMAGE REVEALS
      gsap.utils.toArray(".image-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          {
            clipPath: "inset(10% 10% 10% 10%)",
            scale: 1.08,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // MODULE ROWS
      gsap.utils.toArray(".module-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // LARGE SECTION IMAGE PARALLAX
      gsap.utils.toArray(".parallax-image").forEach((image) => {
        gsap.to(image, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // MARQUEE
      gsap.to(".marquee-track", {
        xPercent: -35,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // SCALE FEATURE IMAGE
      gsap.fromTo(
        ".platform-image",
        {
          scale: 1.2,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".platform-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div
      ref={root}
      className="min-h-screen overflow-x-hidden bg-[#0A0A09] text-[#F3F0E8]"
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <header className="fixed left-0 top-0 z-[100] w-full">
        <div className="flex h-[88px] items-center justify-between px-5 md:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl transition group-hover:border-white/50">
              <Anchor className="size-4" />
            </span>

            <div>
              <div className="text-sm font-bold tracking-[0.22em]">
                NAUTICORE
              </div>

              <div className="hidden text-[8px] tracking-[0.35em] text-white/40 sm:block">
                MARINE OPERATIONS
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}

            <Link
              to="/login"
              className="flex items-center gap-2 border border-white/20 px-5 py-3 text-[10px] font-bold tracking-[0.18em] transition hover:bg-white hover:text-black"
            >
              BOOK A DEMO
              <ArrowUpRight className="size-3" />
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-11 place-items-center border border-white/20 bg-black/20 backdrop-blur-xl lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          ref={menuRef}
          className={[
            "mx-4 overflow-hidden border border-white/10 bg-[#10100F]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden",
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="p-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex w-full items-center justify-between border-b border-white/10 px-3 py-5 text-left text-xs tracking-[0.16em]"
              >
                {item.label.toUpperCase()}
                <ChevronRight className="size-4 text-white/40" />
              </button>
            ))}

            <Link
              to="/login"
              className="mt-3 flex items-center justify-center gap-2 bg-[#D9F56C] px-5 py-4 text-xs font-bold tracking-[0.18em] text-black"
            >
              BOOK A DEMO
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="hero relative h-[110vh] min-h-[760px] overflow-hidden">
        <div ref={heroImage} className="absolute inset-0 will-change-transform">
          <img
            src="/images/hero-vessel.jpg"
            alt="Flagship container vessel bow sailing through ocean waves at dusk"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-transparent to-black/20" />
        </div>

        {/* HERO CONTENT */}
        <div ref={heroText} className="relative z-10 flex h-full items-end">
          <div className="w-full px-5 pb-20 md:px-8 md:pb-24 lg:px-12 lg:pb-28">
            <div className="max-w-[1600px]">
              <div className="hero-meta mb-8 flex items-center gap-4 opacity-0">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#D9F56C]">
                  01
                </span>

                <span className="h-px w-16 bg-white/40" />

                <span className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                  THE MARINE OPERATIONS PLATFORM
                </span>
              </div>

              <h1
                ref={heroTitle}
                className="font-display text-[18vw] font-bold leading-[0.74] tracking-[-0.075em] sm:text-[15vw] lg:text-[12.3vw]"
              >
                <span className="hero-line block overflow-hidden opacity-0">
                  MANAGE
                </span>

                <span className="hero-line block overflow-hidden opacity-0">
                  YOUR
                </span>

                <span className="hero-line block overflow-hidden text-[#D9F56C] opacity-0">
                  FLEET.
                </span>
              </h1>

              <div className="mt-10 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                <p className="hero-meta max-w-xl text-sm leading-7 text-white/65 opacity-0 md:text-base">
                  Maintenance, procurement, compliance, QHSE and fleet
                  intelligence — connected in one command center for modern
                  vessel operators.
                </p>

                <button
                  onClick={() => scrollTo("operations")}
                  className="hero-meta flex w-fit items-center gap-3 border border-white/30 bg-white/10 px-6 py-4 text-[10px] font-bold tracking-[0.18em] opacity-0 backdrop-blur-xl transition hover:bg-white hover:text-black"
                >
                  EXPLORE
                  <ArrowDown className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-7 z-20 hidden text-[9px] tracking-[0.25em] text-white/40 lg:block">
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section
        id="platform"
        className="relative bg-[#0A0A09] px-5 py-28 md:px-8 md:py-36 lg:px-12 lg:py-48"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="reveal lg:col-span-3">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-white/40">
                <span className="text-[#D9F56C]">02</span>
                <span>WHY NAUTICORE</span>
              </div>
            </div>

            <div className="reveal lg:col-span-8 lg:col-start-5">
              <h2 className="max-w-6xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[7vw]">
                Your fleet should not be managed across{" "}
                <span className="text-white/30">
                  spreadsheets, emails and disconnected systems.
                </span>
              </h2>

              <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-sm leading-7 text-white/45 md:text-base">
                  Nauticore brings the operational picture together: vessels,
                  maintenance, procurement, inventory, compliance, QHSE and
                  analytics.
                </p>

                <div className="font-mono text-5xl tracking-[-0.05em] text-[#D9F56C]">
                  01<span className="text-white/20">/</span>01
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BIG IMAGE / PARALLAX HERO
      ========================================= */}

      <section
        id="operations"
        className="relative overflow-hidden bg-[#11110F]"
      >
        <div className="relative h-[85vh] min-h-[600px]">
          <img
            src="/images/container-ship.jpg"
            alt="Fleet operations top-down vessel photography"
            className="parallax-image absolute inset-0 h-[115%] w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-8 md:pb-16 lg:px-12 lg:pb-20">
            <div className="mx-auto max-w-[1500px]">
              <div className="flex items-end justify-between gap-10">
                <div className="reveal max-w-4xl">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#D9F56C]">
                      03
                    </span>

                    <span className="h-px w-16 bg-white/40" />

                    <span className="text-[10px] tracking-[0.25em] text-white/60">
                      FLEET OPERATIONS
                    </span>
                  </div>

                  <h2 className="font-display text-[14vw] font-medium leading-[0.78] tracking-[-0.07em] sm:text-[9rem]">
                    SEE
                    <br />
                    EVERYTHING.
                  </h2>
                </div>

                <div className="reveal hidden max-w-xs pb-2 text-sm leading-7 text-white/60 lg:block">
                  Live vessel status, operational health and fleet-wide
                  visibility from one place.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MODULES
      ========================================= */}

      <section
        id="modules"
        className="bg-[#EFECE2] px-5 py-28 text-[#11110F] md:px-8 md:py-36 lg:px-12 lg:py-44"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="reveal flex items-center gap-3 text-[10px] tracking-[0.25em] text-black/40">
                <span className="text-black">04</span>
                <span>ONE SYSTEM</span>
              </div>

              <h2 className="reveal mt-8 font-display text-5xl font-medium leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[6vw]">
                Everything
                <br />
                connected.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {modules.map((module) => {
                const IconComponent = module.icon;

                return (
                  <div
                    key={module.number}
                    className="module-row group border-t border-black/15 py-7 opacity-0"
                  >
                    <div className="grid gap-5 md:grid-cols-12 md:items-center">
                      <div className="font-mono text-[10px] text-black/35 md:col-span-1">
                        {module.number}
                      </div>

                      <div className="md:col-span-5">
                        <div className="flex items-center gap-4">
                          <IconComponent className="size-5 transition-transform duration-500 group-hover:-rotate-12" />

                          <h3 className="font-display text-2xl tracking-[-0.04em] md:text-3xl">
                            {module.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-sm leading-6 text-black/55 md:col-span-5">
                        {module.description}
                      </div>

                      <div className="md:col-span-1 md:text-right">
                        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COMMAND CENTER OVERVIEW
      ========================================= */}

      <section className="platform-section relative overflow-hidden bg-[#DCD8CD] py-24 text-[#11110F] md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="reveal order-2 lg:order-1 lg:col-span-5">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-black/45">
                <span>05</span>
                <span>COMMAND CENTER</span>
              </div>

              <h2 className="mt-7 font-display text-5xl leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[6vw]">
                One view.
                <br />
                Every signal.
              </h2>

              <p className="mt-8 max-w-md text-sm leading-7 text-black/55 md:text-base">
                Operational information should feel obvious. Nauticore turns
                fragmented fleet data into a clear view of what needs attention
                now.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <Stat value="24" label="Vessels" />
                <Stat value="21" label="Operational" />
                <Stat value="118" label="Open work orders" />
                <Stat value="94%" label="Completion" />
              </div>
            </div>

            <div className="reveal image-reveal order-1 overflow-hidden lg:order-2 lg:col-span-7">
              <div className="platform-image relative aspect-[4/3] overflow-hidden bg-[#0C1623]">
                <img
                  src="/images/command-center.jpg"
                  alt="Command center vessel operational bridge overview"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-5 top-5 border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-xl text-white">
                  <div className="text-[8px] tracking-[0.25em] text-white/50">
                    FLEET OPERATIONAL OVERVIEW
                  </div>

                  <div className="mt-2 font-mono text-xs text-[#D9F56C]">
                    OCEANIC MARINE GROUP
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 text-white">
                  {[
                    ["VESSELS", "24"],
                    ["OPERATIONAL", "21"],
                    ["CRITICAL", "01"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border border-white/15 bg-black/40 p-4 backdrop-blur-xl"
                    >
                      <div className="text-[8px] tracking-[0.18em] text-white/40">
                        {label}
                      </div>

                      <div className="mt-2 text-2xl font-bold text-white">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECURITY & ARCHITECTURE
      ========================================= */}

      <section
        id="security"
        className="bg-[#0A0A09] px-5 py-28 md:px-8 md:py-36 lg:px-12 lg:py-48"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="reveal flex items-center gap-3 text-[10px] tracking-[0.25em] text-white/40">
                <span className="text-[#D9F56C]">06</span>
                <span>ARCHITECTURE</span>
              </div>

              <h2 className="reveal mt-8 font-display text-5xl font-medium leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[6vw]">
                Built around
                <br />
                your
                <br />
                organization.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="reveal max-w-2xl text-lg leading-8 text-white/45 md:text-2xl md:leading-10">
                Strict tenant isolation with an operating hierarchy that
                matches the way marine organizations actually work.
              </p>

              <div className="mt-12 border-t border-white/10">
                {[
                  [Building2, "Organization / tenant"],
                  [RouteIcon, "Fleet"],
                  [Ship, "Vessel"],
                  [Wrench, "Departments & teams"],
                  [Lock, "Security & governance"],
                ].map(([IconComponent, text], index) => (
                  <div
                    key={text}
                    className="reveal flex items-center justify-between border-b border-white/10 py-6"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[10px] text-[#D9F56C]">
                        0{index + 1}
                      </span>

                      <IconComponent className="size-5 text-white/45" />

                      <span className="text-lg text-white/70">{text}</span>
                    </div>

                    <ChevronRight className="size-5 text-white/20" />
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  "RBAC",
                  "MFA",
                  "SAML SSO",
                  "AUDIT TRAILS",
                  "TENANT ISOLATION",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 px-4 py-2 text-[9px] tracking-[0.18em] text-white/35"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NEON MARQUEE BANNER
      ========================================= */}

      <section className="overflow-hidden border-y border-white/10 bg-[#D9F56C] py-5 text-black">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...Array(8)].map((_, index) => (
            <React.Fragment key={index}>
              <span className="font-display text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                MARINE OPERATIONS
              </span>
              <span className="text-xl md:text-3xl">✦</span>
              <span className="font-display text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                ONE COMMAND CENTER
              </span>
              <span className="text-xl md:text-3xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* =========================================
          CALL TO ACTION (CTA)
      ========================================= */}

      <section className="relative min-h-[90vh] overflow-hidden bg-[#11110F] px-5 md:px-8 lg:px-12">
        <div className="absolute inset-0">
          <img
            src="/images/cta-vessel.jpg"
            alt="Futuristic illuminated container vessel sailing under night sky"
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-[#0A0A09]/70" />
        </div>

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center py-24 text-center">
          <div className="reveal max-w-6xl">
            <div className="mb-7 text-[10px] tracking-[0.3em] text-[#D9F56C]">
              07 — NAUTICORE
            </div>

            <h2 className="font-display text-[15vw] font-medium leading-[0.8] tracking-[-0.075em] sm:text-[9rem]">
              BRING YOUR
              <br />
              <span className="text-[#D9F56C]">FLEET</span>
              <br />
              TOGETHER.
            </h2>

            <p className="mx-auto mt-10 max-w-xl text-sm leading-7 text-white/50 md:text-base">
              Maintenance, procurement, compliance, QHSE and analytics — one
              operational command center.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="flex items-center gap-3 bg-[#D9F56C] px-7 py-4 text-[10px] font-bold tracking-[0.18em] text-black transition hover:bg-white"
              >
                BOOK A DEMO
                <ArrowUpRight className="size-4" />
              </Link>

              <Link
                to="/select-organization"
                className="flex items-center gap-3 border border-white/20 bg-white/5 px-7 py-4 text-[10px] font-bold tracking-[0.18em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
              >
                EXPLORE PLATFORM
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="border-t border-white/10 bg-[#0A0A09] px-5 py-8 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 text-xs text-white/30 md:flex-row">
          <div>© 2026 Nauticore</div>
          <div>Marine engineering management platform</div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================
   SUB-COMPONENTS
========================================= */

function Stat({ value, label }) {
  return (
    <div className="border border-black/10 bg-black/[0.03] p-4">
      <div className="font-display text-3xl tracking-[-0.05em]">{value}</div>

      <div className="mt-1 text-[8px] uppercase tracking-[0.16em] text-black/40">
        {label}
      </div>
    </div>
  );
}
