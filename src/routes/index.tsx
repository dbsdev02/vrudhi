import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Gem, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import heroImg from "@/assets/hero-groom.jpg";
import collectionImg from "@/assets/collection-wedding.jpg";
import craftImg from "@/assets/craft.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "VRUDHI IMPEX — Heritage Accessories for the Modern Indian Groom" },
      { name: "description", content: "Heirloom safa, mojadi, mala, brooch, kamarbandh and pocket squares — hand-crafted in India for the wedding day." },
    ],
  }),
});

function HomePage() {
  return (
    <>
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* CATEGORIES */}
      <section className="container-luxe py-24 md:py-32">
        <SectionHeader eyebrow="The Collections" title="Curated by ceremony" subtitle="From the haldi to the baraat — each accessory chosen with intention, crafted with patience." />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Link to="/shop" search={{ c: c.slug } as any} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-cream">
                    <div className="font-display text-2xl md:text-3xl">{c.name}</div>
                    <div className="text-[10px] tracking-[0.32em] uppercase mt-2 inline-flex items-center gap-2 opacity-90 group-hover:gap-4 transition-all">
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeader eyebrow="Bestsellers" title="Most cherished pieces" align="left" />
            <Link to="/shop" className="text-[11px] tracking-[0.28em] uppercase border-b border-foreground pb-1 hover:text-maroon hover:border-maroon transition-colors self-start md:self-end">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* WEDDING COLLECTION FEATURE */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={collectionImg} alt="The Wedding Collection" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 lg:-right-10 bg-cream border border-border px-7 py-6 shadow-xl max-w-[260px]">
              <div className="text-[9px] tracking-[0.4em] uppercase text-gold mb-2">Limited</div>
              <div className="font-display text-xl leading-snug">The Maharaja Edit — only 50 pieces</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">The Wedding Collection</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              For the groom who walks into <em className="text-maroon">forever</em>.
            </h2>
            <p className="mt-7 text-muted-foreground leading-relaxed max-w-lg">
              A complete adornment edit — safa, mala, brooch, kamarbandh and mojadi —
              composed as a single, harmonious silhouette. Crafted in cream, gold and
              the deepest shades of maroon.
            </p>
            <Link to="/shop" className="mt-10 group inline-flex items-center gap-3 bg-foreground text-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
              Discover the Edit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={craftImg} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="relative container-luxe py-28 md:py-40 text-cream max-w-3xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Craftsmanship</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Eleven hands. Forty hours.<br/> One unrepeatable piece.
          </h2>
          <p className="mt-7 text-cream/80 leading-relaxed max-w-xl">
            Every VRUDHI IMPEX accessory is finished entirely by hand — from the threading
            of pearls to the final pleat of the safa. The patience of our karigars is the
            quiet luxury you wear.
          </p>
        </div>
      </section>

      {/* PRESS / AS SEEN IN */}
      <section className="border-y border-border bg-cream">
        <div className="container-luxe py-10 md:py-12">
          <div className="text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-7">
            As featured in
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {["VOGUE", "ELLE", "GQ", "HARPER'S BAZAAR", "CONDÉ NAST", "FORBES"].map(p => (
              <span key={p} className="font-display text-base md:text-lg tracking-[0.18em] text-foreground/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-luxe py-24 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
          {[
            ["1974", "Atelier est."],
            ["32", "Master karigars"],
            ["120+", "Cities delivered"],
            ["4.9★", "Verified reviews"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl md:text-6xl text-foreground">{n}</div>
              <div className="mt-3 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-24 md:py-32">
        <SectionHeader eyebrow="Loved by Grooms" title="Worn on the most important day" />
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-cream border border-border p-9"
            >
              <div className="text-gold text-2xl font-display leading-none mb-4">“</div>
              <blockquote className="font-display text-xl leading-snug text-foreground">{t.quote}</blockquote>
              <figcaption className="mt-7 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                {t.name} · {t.city}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeader eyebrow="@vrudhi.impex" title="Carried into your moments" />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
            {[heroImg, collectionImg, craftImg, categories[0].image, categories[2].image, categories[1].image].map((src, i) => (
              <a key={i} href="#" className="group block aspect-square overflow-hidden bg-cream relative">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors grid place-items-center">
                  <span className="text-cream opacity-0 group-hover:opacity-100 text-[10px] tracking-[0.3em] uppercase transition-opacity">View</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="container-luxe py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeader eyebrow="The Journal" title="Notes from the atelier" align="left" />
          <Link to="/about" className="text-[11px] tracking-[0.28em] uppercase border-b border-foreground pb-1 hover:text-maroon hover:border-maroon transition-colors self-start md:self-end">All Stories</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {[
            { tag: "Craft", img: craftImg, title: "The forty-hour pleat: anatomy of a safa", read: "6 min read" },
            { tag: "Heritage", img: collectionImg, title: "Why kundan still matters in 2026", read: "4 min read" },
            { tag: "Wedding", img: heroImg, title: "Dressing the groom: a complete guide", read: "9 min read" },
          ].map((j, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img src={j.img} alt={j.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              </div>
              <div className="mt-5 text-[10px] tracking-[0.32em] uppercase text-gold">{j.tag} · {j.read}</div>
              <h3 className="mt-3 font-display text-2xl leading-snug group-hover:text-maroon transition-colors">{j.title}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      {/* GIFTING */}
      <section className="container-luxe pb-24 md:pb-32">
        <div className="relative overflow-hidden bg-secondary/50 grid lg:grid-cols-2 gap-0">
          <div className="aspect-[4/3] lg:aspect-auto">
            <img src={categories[3]?.image ?? collectionImg} alt="Gifting" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Private Gifting</div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1]">A gift, hand-delivered in heirloom packaging.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Bespoke trousseaus, groomsmen sets and family ensembles — composed by our concierge,
              shipped worldwide in linen-wrapped wooden caskets.
            </p>
            <Link to="/contact" className="mt-9 group inline-flex items-center gap-3 self-start border border-foreground px-7 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-foreground hover:text-cream transition-colors">
              Speak to Concierge <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-luxe pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Questions</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">Considered, with care.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Everything you might wonder before placing your trust in us.
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="container-luxe py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          [Truck, "White-Glove Delivery"],
          [ShieldCheck, "Lifetime Repair"],
          [Sparkles, "Hand-Finished"],
          [Gem, "Heirloom Quality"],
        ].map(([Icon, label], i) => {
          const I = Icon as any;
          return (
            <div key={i} className="text-center">
              <I className="h-7 w-7 text-gold mx-auto" />
              <div className="mt-4 text-[11px] tracking-[0.28em] uppercase text-foreground">{label as string}</div>
            </div>
          );
        })}
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe pb-24">
        <div className="bg-foreground text-cream px-8 py-16 md:py-24 text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">The Atelier Letter</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
            Be the first to receive new editions, private previews and atelier stories.
          </h2>
          <form className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="Your email address" className="flex-1 bg-transparent border border-cream/30 px-5 py-4 text-sm placeholder:text-cream/50 focus:outline-none focus:border-gold" />
            <button className="bg-gold text-foreground px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-cream transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

const slides = [
  {
    img: heroImg,
    eyebrow: "Wedding Couture · Edit 2026",
    title: ["Adorned for the", "most sacred", "of days."],
    titleAccent: 1,
    subtitle: "Heirloom safa, mala and ornament for the modern Indian groom — each piece crafted by hand, finished in zari and gold.",
    cta1: { label: "Explore the Edit", to: "/shop" },
    cta2: { label: "Our Heritage", to: "/about" },
  },
  {
    img: collectionImg,
    eyebrow: "Wedding & Ethnic · 2026",
    title: ["Dulha Mala", "Collection", ""],
    titleAccent: 1,
    subtitle: "Premium pearls, ruby stones and emerald accents — strung by hand, worn with pride on your most sacred day.",
    cta1: { label: "Shop Collection", to: "/shop" },
    cta2: { label: "About Us", to: "/about" },
  },
  {
    img: craftImg,
    eyebrow: "Crafted in Mumbai · Since 2009",
    title: ["Metal Hardware", "& Brooches", ""],
    titleAccent: 1,
    subtitle: "Designer buttons, signature brooches and cufflinks in gold and silver — the finishing touches that define royalty.",
    cta1: { label: "View Products", to: "/shop" },
    cta2: { label: "Contact Us", to: "/contact" },
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const s = slides[current];

  return (
    <section className="relative overflow-hidden bg-foreground" style={{ minHeight: "92vh" }}>
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img src={s.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-foreground/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full min-h-[92vh] container-luxe flex flex-col justify-center py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-2xl"
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">{s.eyebrow}</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-cream">
              {s.title[0]}<br />
              <span className="italic text-gold">{s.title[1]}</span>
              {s.title[2] && <><br />{s.title[2]}</>}
            </h1>
            <p className="mt-7 text-cream/75 max-w-md leading-relaxed">{s.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={s.cta1.to}
                className="group inline-flex items-center gap-3 bg-gold text-foreground px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-cream transition-colors"
              >
                {s.cta1.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to={s.cta2.to}
                className="inline-flex items-center px-2 py-4 text-[11px] tracking-[0.28em] uppercase text-cream border-b border-cream/50 hover:text-gold hover:border-gold transition-colors"
              >
                {s.cta2.label}
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase text-cream/60">
              <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-gold" /> Hand-crafted</span>
              <span className="hidden sm:flex items-center gap-2"><Gem className="h-3.5 w-3.5 text-gold" /> Heirloom Quality</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 border border-cream/30 text-cream hover:border-gold hover:text-gold transition-colors grid place-items-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 border border-cream/30 text-cream hover:border-gold hover:text-gold transition-colors grid place-items-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators + counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-gold" : "w-3 bg-cream/40 hover:bg-cream/70"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-8 right-8 text-[11px] tracking-[0.3em] text-cream/40 font-display">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Marquee strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-cream/10 py-4 overflow-hidden bg-foreground/40 backdrop-blur-sm">
        <div className="marquee whitespace-nowrap font-display text-xl text-cream/50">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10 shrink-0">
              {["Safa", "Mala", "Mojadi", "Brooch", "Kamarbandh", "Pocket Square", "Sherwani Edit"].map(w => (
                <span key={w} className="flex items-center gap-10">
                  {w}<span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { quote: "The safa was, without exaggeration, the most photographed thing on our wedding day.", name: "Aarav Mehta", city: "Mumbai" },
  { quote: "Felt like wearing a piece of our family's history — modern, but rooted.", name: "Vikram Singh", city: "Jaipur" },
  { quote: "Detailing on the kundan brooch is unreal. Worth every paisa.", name: "Rohan Kapoor", city: "Delhi" },
];

const faqs = [
  { q: "Do you ship internationally?", a: "Yes — we deliver to over 120 cities worldwide via insured, signature-on-delivery courier in linen-wrapped wooden caskets." },
  { q: "Can pieces be customised?", a: "Every safa, mala and brooch can be tailored in colour, size and stone composition. Lead time is typically 3–4 weeks." },
  { q: "What is your return policy?", a: "Unworn pieces may be returned within 14 days of delivery. Bespoke and made-to-order commissions are final sale." },
  { q: "Do you offer a wedding concierge?", a: "Our atelier team curates complete grooms­wear edits — from mehendi to reception — in a private virtual or in-person consultation." },
  { q: "How are pieces cared for?", a: "Each order ships with a care card and complimentary lifetime repair on hand-finished components." },
];

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((f, i) => {
        const active = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-maroon transition-colors">{f.q}</span>
              {active ? <Minus className="h-4 w-4 text-gold shrink-0" /> : <Plus className="h-4 w-4 text-gold shrink-0" />}
            </button>
            <div className={`grid transition-all duration-500 ease-out ${active ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
