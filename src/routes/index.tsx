import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Wrench, Gauge, Car, ShieldCheck, Sparkles, Cog, Battery, Droplet,
  Thermometer, ClipboardCheck, CalendarCheck2, Hammer, Phone, Mail, MapPin,
  Clock, Menu, X, ChevronDown, Star, ArrowRight, ArrowUp, MessageCircle,
  Check, CircleDot, Search, FileCheck2, KeyRound, PhoneCall,
} from "lucide-react";
import heroAsset from "../assets/hero.jpg.asset.json";
import heroVideoAsset from "../assets/hero-bg.mp4.asset.json";
import logoAsset from "../assets/logo.jpg.asset.json";
import aboutAsset from "../assets/about.jpg.asset.json";
import g1Asset from "../assets/g1.jpg.asset.json";
import g2Asset from "../assets/g2.jpg.asset.json";
import g3Asset from "../assets/g3.jpg.asset.json";
import g4Asset from "../assets/g4.jpg.asset.json";
import g5Asset from "../assets/g5.jpg.asset.json";
import g6Asset from "../assets/g6.jpg.asset.json";
import g7Asset from "../assets/g7.jpg.asset.json";
import beforeAsset from "../assets/before.jpg.asset.json";
import afterAsset from "../assets/after.jpg.asset.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

const BUSINESS = {
  name: "The Cartell Auto",
  tagline: "Vehicle Servicing & Maintenance Professionals",
  address: "52 Castle Street, Cape Town",
  email: "admin@thecartell.co.za",
  phone: "+27 (0)21 000 0000",
  hours: "Mon – Fri: 8:00 – 17:30 · Sat: 8:00 – 13:00",
};

function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <BeforeAfter />
      <Gallery />
      <Testimonials />
      <Faq />
      <Booking />
      <Contact />
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" theme="light" richColors />
    </div>
  );
}

/* ---------- Scroll progress ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-gold"
    />
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#process", label: "Process" },
    { href: "#gallery", label: "Gallery" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-black shadow-luxe ring-1 ring-[color:var(--gold)]/40 transition-transform group-hover:scale-105">
            <img src={logoAsset.url} alt="The Cartell Auto logo" className="h-full w-full object-cover" />
          </span>
          <span className={`font-display text-lg font-semibold tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            The Cartell <span className="text-gradient-gold">Auto</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors ${
                scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
              } after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-gold after:transition-all hover:after:w-full`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden md:inline-flex btn-gold items-center gap-2 rounded-full px-5 py-2.5 text-sm">
            Book a Service <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className={`lg:hidden rounded-full p-2 transition ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-b border-black/5"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-2 btn-gold rounded-full px-5 py-2.5 text-center text-sm"
              >
                Book a Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          src={heroVideoAsset.url}
          className="block h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroAsset.url}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,160,69,0.28),transparent_55%)]" />
      </motion.div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-[oklch(0.78_0.13_82/0.25)] blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[oklch(0.78_0.13_82/0.15)] blur-3xl animate-float-slow" style={{ animationDelay: "-3s" }} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-gold" />
          Cape Town · Since day one
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Cape Town's Trusted{" "}
          <span className="text-shimmer">Vehicle Service</span> Specialists.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#booking" className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base">
            Book a Service
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur transition hover:border-[color:var(--gold)] hover:bg-white/10"
          >
            Get a Quote
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-10 w-[2px] bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Trust bar ---------- */
function TrustBar() {
  const items = [
    { icon: Wrench, label: "Professional Technicians" },
    { icon: ShieldCheck, label: "Premium Quality Parts" },
    { icon: Sparkles, label: "Transparent Pricing" },
    { icon: Clock, label: "Fast Turnaround" },
    { icon: Star, label: "Customer Satisfaction" },
  ];
  return (
    <section className="relative border-b border-black/5 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="group flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 text-[color:var(--gold-deep)] transition-all group-hover:bg-gradient-gold group-hover:text-black">
                <it.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-foreground/80">{it.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { n: 12500, s: "+", label: "Vehicles Serviced" },
    { n: 15, s: "+", label: "Years Experience" },
    { n: 9800, s: "+", label: "Satisfied Customers" },
    { n: 28000, s: "+", label: "Services Completed" },
  ];
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-gold opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
              <img
                src={aboutAsset.url}
                alt="Cartell Auto technicians servicing a premium vehicle"
                loading="lazy"
                width={1408}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-black/5 bg-white p-5 shadow-luxe sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold">
                  <ShieldCheck className="h-5 w-5 text-black" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Guaranteed</div>
                  <div className="font-display text-sm font-semibold">Workmanship & Parts</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> About Us
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Precision engineering. <br />
              <span className="text-gradient-gold">Honest workmanship.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              The Cartell Auto provides reliable servicing, diagnostics, repairs and
              preventative maintenance for a wide range of vehicles. Every service is
              completed with attention to detail, honest workmanship and a commitment
              to keeping customers safely on the road.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.08}>
                <div className="border-l-2 border-[color:var(--gold)] pl-5">
                  <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    { icon: Wrench, title: "Vehicle Servicing", desc: "Comprehensive servicing to keep your car in peak condition." },
    { icon: Gauge, title: "Major Services", desc: "Full mechanical inspection with premium fluids and filters." },
    { icon: Cog, title: "Minor Services", desc: "Interval maintenance that protects long-term reliability." },
    { icon: CircleDot, title: "Brake Repairs", desc: "Pads, discs and fluid — braked and balanced to spec." },
    { icon: Car, title: "Suspension Repairs", desc: "Shocks, struts and bushes for a composed ride." },
    { icon: Search, title: "Engine Diagnostics", desc: "OBD & dealership-level fault code diagnostics." },
    { icon: Battery, title: "Battery Replacement", desc: "Premium batteries, fitted and coded on site." },
    { icon: Droplet, title: "Oil Changes", desc: "Manufacturer-spec oils with new OEM filters." },
    { icon: Thermometer, title: "Cooling System", desc: "Radiators, hoses, water pumps and flushes." },
    { icon: ClipboardCheck, title: "Vehicle Inspections", desc: "Pre-purchase and roadworthy inspections." },
    { icon: ShieldCheck, title: "Preventative Maintenance", desc: "Proactive care that avoids expensive surprises." },
    { icon: Hammer, title: "General Mechanical Repairs", desc: "Trusted repairs across all major makes." },
  ];

  return (
    <section id="services" className="relative bg-[oklch(0.985_0.003_90)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything your vehicle needs, <span className="text-gradient-gold">under one roof.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-foreground/60">
              From routine servicing to complex diagnostics — expertise you can trust,
              delivered with dealership-level precision.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="card-luxe group relative h-full p-7">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.97_0.03_85)] to-white ring-1 ring-[color:var(--gold)]/25 transition-all group-hover:from-[color:var(--gold)] group-hover:to-[color:var(--gold-deep)] group-hover:ring-transparent">
                  <s.icon className="h-6 w-6 text-[color:var(--gold-deep)] transition-colors group-hover:text-black" />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{s.desc}</p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[color:var(--gold-deep)] opacity-0 transition group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why choose us ---------- */
function WhyChooseUs() {
  const reasons = [
    { t: "Experienced technicians", d: "Decades of combined workshop experience across every major make and model." },
    { t: "Reliable workmanship", d: "Every job is signed off with a strict quality-control checklist before collection." },
    { t: "Quality replacement parts", d: "OEM and premium aftermarket parts — never compromised for margin." },
    { t: "Honest advice", d: "Clear explanations, real photos of your car, and no unnecessary upsells." },
    { t: "Competitive pricing", d: "Fair, itemised quotes approved before any work begins." },
    { t: "Fast turnaround", d: "Efficient bookings and stocked parts to get you back on the road quickly." },
    { t: "Attention to detail", d: "The small things — torque specs, coding, sealed fittings — done right." },
    { t: "Customer-first approach", d: "A service experience that respects your time and your vehicle." },
  ];
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
                <span className="h-1 w-6 bg-gradient-gold" /> Why Cartell
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                A service standard <br /> your car deserves.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-foreground/60">
                We treat every vehicle like it belongs in a showroom — because to
                someone, it does. Here's what sets our workshop apart.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#booking" className="mt-8 inline-flex btn-gold items-center gap-2 rounded-full px-6 py-3 text-sm">
                Book with confidence <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.05}>
                <div className="group relative rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/50 hover:shadow-luxe">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold">
                    <Check className="h-4 w-4 text-black" strokeWidth={3} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{r.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    { icon: CalendarCheck2, t: "Book your vehicle", d: "Reserve a slot online or over the phone in seconds." },
    { icon: Search, t: "Inspection & Diagnostics", d: "A full assessment identifies exactly what your car needs." },
    { icon: FileCheck2, t: "Quote Approval", d: "You receive a clear, itemised quote before any work begins." },
    { icon: Wrench, t: "Repairs & Servicing", d: "Our technicians carry out the work using premium parts." },
    { icon: ShieldCheck, t: "Quality Check", d: "Every job passes a rigorous multi-point inspection." },
    { icon: KeyRound, t: "Vehicle Collection", d: "Collect your car — cleaned, tested, and ready to drive." },
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-gradient-ink py-28 text-white lg:py-36">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-soft)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Our Process
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Six steps. <span className="text-shimmer">Zero guesswork.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--gold)]/40 to-transparent lg:block" />
          <div className="space-y-14 lg:space-y-24">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={s.t}>
                  <div className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]`}>
                    <div className={`${left ? "lg:text-right" : "lg:col-start-3"}`}>
                      <div className="font-display text-6xl font-semibold text-[color:var(--gold)]/40">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-semibold">{s.t}</h3>
                      <p className="mt-2 max-w-md text-white/60 lg:ml-auto">
                        {s.d}
                      </p>
                    </div>
                    <div className="hidden lg:flex">
                      <div className="grid h-16 w-16 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-black shadow-luxe">
                        <s.icon className="h-6 w-6 text-[color:var(--gold)]" />
                      </div>
                    </div>
                    <div />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Before / After ---------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (clientX: number) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Before / After
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              See the transformation.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-foreground/60">Drag the handle to reveal a real engine bay before and after servicing.</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={wrap}
            className="relative mt-14 aspect-[16/10] w-full select-none overflow-hidden rounded-3xl shadow-luxe"
            onMouseMove={(e) => dragging.current && onMove(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
          >
            <img src={afterAsset.url} alt="After servicing" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={beforeAsset.url} alt="Before servicing" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${(100 / pos) * 100}%` }} />
            </div>
            <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">Before</div>
            <div className="absolute top-4 right-4 rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold uppercase tracking-widest text-black">After</div>
            <div
              className="absolute inset-y-0 z-10 -ml-[1px] w-0.5 cursor-ew-resize bg-gradient-gold"
              style={{ left: `${pos}%` }}
              onMouseDown={() => (dragging.current = true)}
              onTouchStart={() => (dragging.current = true)}
            >
              <button
                type="button"
                onMouseDown={() => (dragging.current = true)}
                className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-luxe ring-2 ring-[color:var(--gold)]"
                aria-label="Drag to compare"
              >
                <div className="flex items-center gap-0.5 text-[color:var(--gold-deep)]">
                  <ArrowRight className="h-3.5 w-3.5 -scale-x-100" />
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const images = [
    { src: g3Asset.url, alt: "Modern service workshop", h: "row-span-2" },
    { src: g2Asset.url, alt: "Polished engine bay", h: "" },
    { src: g1Asset.url, alt: "Engine diagnostics scanner", h: "row-span-2" },
    { src: g5Asset.url, alt: "Wheel and brake service", h: "" },
    { src: g6Asset.url, alt: "BMW M-series service in progress", h: "row-span-2" },
    { src: g7Asset.url, alt: "Performance vehicles in the workshop", h: "" },
    { src: g4Asset.url, alt: "Precision tools", h: "" },
    { src: aboutAsset.url, alt: "Technicians at work", h: "row-span-2" },
  ];
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative bg-[oklch(0.985_0.003_90)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Gallery
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Inside the workshop.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <button
                onClick={() => setActive(img.src)}
                className={`group relative block h-full w-full overflow-hidden rounded-2xl shadow-soft ${img.h}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 translate-y-2 text-sm font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={active}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-luxe"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reviews = [
    { n: "Thandi M.", r: 5, t: "Absolutely faultless service. Honest quote, clean workshop, and my car has never driven better." },
    { n: "Sipho D.", r: 5, t: "They diagnosed an issue three other workshops missed. Fair pricing and beautifully done." },
    { n: "Rebecca L.", r: 5, t: "The Cartell Auto treats every car like it's their own. Highly recommended for anyone in Cape Town." },
    { n: "James O.", r: 5, t: "Booked online, dropped off, collected the same day. A truly premium experience." },
    { n: "Naledi K.", r: 5, t: "Transparent communication and top-tier workmanship. My go-to workshop now." },
    { n: "Marco V.", r: 5, t: "Immaculate attention to detail. They even sent photos of the work in progress." },
  ];
  const track = useRef<HTMLDivElement>(null);
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Loved by Cape Town drivers.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <motion.div
          ref={track}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          className="flex w-max gap-6 px-6"
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="w-[360px] shrink-0 rounded-2xl border border-black/5 bg-white p-7 shadow-soft">
              <div className="flex items-center gap-1 text-[color:var(--gold)]">
                {Array.from({ length: r.r }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/75">"{r.t}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold font-display font-semibold text-black">
                  {r.n[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.n}</div>
                  <div className="text-xs text-muted-foreground">Verified customer</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    { q: "How often should I service my car?", a: "As a general rule, every 12 months or 15,000 km — whichever comes first. Your vehicle's service book will confirm the manufacturer-recommended interval, and we're happy to advise based on your driving conditions." },
    { q: "Do you service all vehicle brands?", a: "Yes. Our technicians work across all major European, Japanese, Korean and American makes and models, from daily runabouts to luxury and performance vehicles." },
    { q: "Can I book online?", a: "Absolutely. Use our booking form below and we'll confirm your slot by email or phone within business hours." },
    { q: "How long does servicing take?", a: "A minor service typically takes 2–3 hours. Major services and diagnostics may take longer — we'll always give you a realistic time estimate upfront." },
    { q: "Do you provide diagnostics?", a: "Yes — we run full OBD and manufacturer-level diagnostic scans, and provide a plain-English explanation of any faults and recommendations." },
    { q: "Do you use genuine parts?", a: "We use OEM or premium-quality aftermarket parts. We'll always let you know your options and pricing before we fit anything." },
  ];
  return (
    <section id="faq" className="relative bg-[oklch(0.985_0.003_90)] py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> FAQ
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {items.map((it, i) => (
              <AccordionItem
                key={i}
                value={`i${i}`}
                className="overflow-hidden rounded-2xl border border-black/5 bg-white px-5 shadow-soft data-[state=open]:border-[color:var(--gold)]/40"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-foreground/70">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Booking ---------- */
function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    toast.success("Booking request received — we'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-gradient-ink py-28 text-white lg:py-36">
      <div className="pointer-events-none absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-soft)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Book a Service
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Reserve your <span className="text-shimmer">service slot.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-white/70">
              Tell us about your vehicle. We'll confirm your booking and provide a
              transparent quote — no obligation, no pressure.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4 text-sm text-white/70">
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[color:var(--gold)]" /> {BUSINESS.address}</div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[color:var(--gold)]" /> {BUSINESS.email}</div>
            <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-[color:var(--gold)]" /> {BUSINESS.hours}</div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[540px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold shadow-luxe"
                  >
                    <Check className="h-10 w-10 text-black" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">Booking received</h3>
                  <p className="mt-2 max-w-sm text-white/70">
                    Thank you — a member of our team will confirm your appointment shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <Field label="Name"><Input required name="name" placeholder="Your name" className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Phone Number"><Input required name="phone" type="tel" placeholder="+27 ..." className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Email" full><Input required name="email" type="email" placeholder="you@example.com" className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Vehicle Make"><Input required name="make" placeholder="e.g. BMW" className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Vehicle Model"><Input required name="model" placeholder="e.g. 320i" className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Year"><Input required name="year" placeholder="e.g. 2020" className="bg-white/10 border-white/15 text-white placeholder:text-white/40" /></Field>
                  <Field label="Preferred Date"><Input required name="date" type="date" className="bg-white/10 border-white/15 text-white placeholder:text-white/40 [color-scheme:dark]" /></Field>
                  <Field label="Service Required" full>
                    <select required name="service" className="h-10 w-full rounded-md border border-white/15 bg-white/10 px-3 text-sm text-white outline-none transition focus:border-[color:var(--gold)]">
                      <option value="" className="bg-black">Select a service...</option>
                      {["Minor Service", "Major Service", "Diagnostics", "Brake Repairs", "Suspension Repairs", "Oil Change", "General Repair", "Other"].map((s) => (
                        <option key={s} value={s} className="bg-black">{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message" full>
                    <Textarea name="message" rows={4} placeholder="Tell us anything else that might help..." className="bg-white/10 border-white/15 text-white placeholder:text-white/40" />
                  </Field>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base disabled:opacity-70"
                    >
                      {loading ? "Sending..." : (<>Submit Booking <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>)}
                    </button>
                    <p className="mt-3 text-center text-xs text-white/50">
                      By submitting, you agree to be contacted about your booking.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}>
      <Label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{label}</Label>
      {children}
    </div>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-deep)]">
              <span className="h-1 w-6 bg-gradient-gold" /> Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Find us in the heart of Cape Town.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-soft">
              <ContactRow icon={MapPin} title="Address">
                {BUSINESS.name}<br />{BUSINESS.address}
              </ContactRow>
              <ContactRow icon={Mail} title="Email">
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-[color:var(--gold-deep)]">{BUSINESS.email}</a>
              </ContactRow>
              <ContactRow icon={Phone} title="Phone">
                <a href="tel:+27000000000" className="hover:text-[color:var(--gold-deep)]">{BUSINESS.phone}</a>
              </ContactRow>
              <ContactRow icon={Clock} title="Business Hours">
                {BUSINESS.hours}
              </ContactRow>
              <a href="#booking" className="btn-gold mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm">
                Book a Service <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxe lg:aspect-auto lg:h-full">
              <iframe
                title="The Cartell Auto location"
                src="https://www.google.com/maps?q=52+Castle+Street,+Cape+Town&output=embed"
                className="h-full w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, title, children }: { icon: any; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold">
        <Icon className="h-5 w-5 text-black" />
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
        <div className="mt-1 text-foreground/80">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative bg-[#0B0B0B] text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-black ring-1 ring-[color:var(--gold)]/40">
                <img src={logoAsset.url} alt="The Cartell Auto logo" className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                The Cartell <span className="text-gradient-gold">Auto</span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              {BUSINESS.tagline}. Servicing Cape Town with dealership-level precision
              and honest workmanship.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[{h:"#services",l:"Services"},{h:"#about",l:"About"},{h:"#process",l:"Process"},{h:"#faq",l:"FAQ"},{h:"#booking",l:"Book a Service"}].map(l=>(
                <li key={l.h}><a href={l.h} className="transition hover:text-[color:var(--gold)]">{l.l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>{BUSINESS.address}</li>
              <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-[color:var(--gold)]">{BUSINESS.email}</a></li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>
        </div>
        <div className="my-10 gold-hairline" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
          <div>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</div>
          <div>Designed with precision in Cape Town.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating actions ---------- */
function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-foreground shadow-luxe transition hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/27000000000"
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href="tel:+27000000000"
        className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-black shadow-luxe transition hover:scale-105"
        aria-label="Call"
      >
        <PhoneCall className="h-5 w-5" />
      </a>
    </div>
  );
}

// suppress unused ChevronDown warning
void ChevronDown;
