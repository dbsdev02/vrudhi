import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail, Globe, Instagram } from "lucide-react";
import img28 from "@/assets/vrudhi-img/28.jpeg";
import img29 from "@/assets/vrudhi-img/29.jpeg";
import img30 from "@/assets/vrudhi-img/30.jpeg";
import img31 from "@/assets/vrudhi-img/31.jpeg";
import img32 from "@/assets/vrudhi-img/32.jpeg";
import img33 from "@/assets/vrudhi-img/33.jpeg";
import img37 from "@/assets/vrudhi-img/37.jpeg";
import img38 from "@/assets/vrudhi-img/38.jpeg";
import img39 from "@/assets/vrudhi-img/39.jpeg";
import img41 from "@/assets/vrudhi-img/41.jpeg";
import img42 from "@/assets/vrudhi-img/42.jpeg";
import img43 from "@/assets/vrudhi-img/43.jpeg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — Vrudhi Fashion" },
      { name: "description", content: "Vrudhi Fashion — Premium Men's ethnic accessories crafted in Mumbai since 2009." },
    ],
  }),
});

const values = [
  { num: "01", title: "Customer Satisfaction", desc: "Every decision we make begins and ends with the groom's experience — from first browse to wedding day." },
  { num: "02", title: "Quality Assurance", desc: "Only premium materials pass our hands. No shortcuts, no compromises — ever." },
  { num: "03", title: "Punctuality", desc: "Your wedding date is sacred. We treat every deadline with the same reverence." },
  { num: "04", title: "Innovation", desc: "Fresh seasonal collections that honour tradition while speaking to the modern groom." },
];

const milestones = [
  { year: "2009", event: "Founded in Mumbai's historic textile district" },
  { year: "2013", event: "Launched the signature Dulha Mala collection" },
  { year: "2017", event: "Expanded to international markets across 7 countries" },
  { year: "2021", event: "Introduced bespoke concierge service for weddings" },
  { year: "2024", event: "Crossed 10,000 grooms adorned across India & abroad" },
];

const categories = [
  { img: img28, name: "Dulha Mala", desc: "Emerald, pearl & ruby malas strung by hand for the royal groom." },
  { img: img29, name: "Safa & Pagdi", desc: "Hand-pleated silk safas with gold zari borders and kundan brooches." },
  { img: img30, name: "Mojadi", desc: "Velvet mojaris with intricate zardozi paisleys from Jaipur artisans." },
  { img: img31, name: "Brooches", desc: "Antique-finish kundan and enamel brooches — the perfect finishing touch." },
  { img: img32, name: "Kamarbandh", desc: "Zari-embroidered waistbands that sculpt and elevate the silhouette." },
  { img: img33, name: "Pocket Squares", desc: "Pure silk Banarasi pocket squares woven with traditional motifs." },
];

const markets = ["UK", "USA", "UAE", "Africa", "Bangladesh", "Nepal", "Sri Lanka"];

const galleryImgs = [img37, img38, img39, img41, img42, img43];

const team = [
  { img: img41, name: "Rajesh Vrudhi", role: "Founder & Master Artisan" },
  { img: img42, name: "Priya Vrudhi", role: "Creative Director" },
  { img: img43, name: "Arjun Mehta", role: "Head of Craftsmanship" },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-foreground text-cream" style={{ minHeight: "80vh" }}>
        <div className="absolute inset-0">
          <img src={img28} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/55 to-foreground/10" />
        </div>
        <div className="relative container-luxe flex flex-col justify-center py-32 md:py-48 max-w-3xl" style={{ minHeight: "80vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">About Us</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
              Crafting Elegance<br />
              <span className="italic text-gold">Since 2009</span>
            </h1>
            <p className="mt-7 text-cream/80 leading-relaxed max-w-xl text-lg">
              Vrudhi Fashion is a leading specialist in premium Men's ethnic accessories,
              born in Mumbai's historic textile district and worn by grooms across the world.
            </p>
            <Link
              to="/shop"
              className="mt-10 group inline-flex items-center gap-3 bg-gold text-foreground px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-cream transition-colors"
            >
              Explore the Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="container-luxe py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img src={img29} alt="Vrudhi Fashion Story" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-10 bg-cream border border-border px-7 py-6 shadow-xl max-w-[220px]">
            <div className="font-display text-5xl text-foreground">15+</div>
            <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Years of craft</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Our Story</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            A decade of perfecting<br />the finishing touch.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Based in Mumbai's historic textile district, we have dedicated over a decade to
            perfecting the finishing touches that transform traditional attire into a statement
            of royalty. What began as a small atelier has grown into a trusted name for grooms
            across India and seven countries worldwide.
          </p>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From our signature Dulha Mala collections to bespoke metal hardware and formal
            accents, every piece is crafted with precision and passion — because the groom
            deserves nothing less than perfection.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[["2009", "Est."], ["10K+", "Grooms"], ["7+", "Countries"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-foreground">{n}</div>
                <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Our Journey</div>
            <h2 className="font-display text-4xl md:text-5xl">Milestones</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-8 pb-10 last:pb-0"
              >
                <div className="h-9 w-9 shrink-0 rounded-full border-2 border-gold bg-cream grid place-items-center z-10">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </div>
                <div className="pt-1">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">{m.year}</div>
                  <p className="text-foreground leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="container-luxe py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">What Drives Us</div>
          <h2 className="font-display text-4xl md:text-5xl">Our Core Values</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-cream border border-border p-8 hover:border-gold transition-colors"
            >
              <div className="text-gold font-display text-4xl mb-4">{v.num}</div>
              <h3 className="font-display text-xl mb-3">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">What We Offer</div>
            <h2 className="font-display text-4xl md:text-5xl">Our Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.07 }}
              >
                <Link to="/shop" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-cream">
                      <div className="font-display text-xl md:text-2xl">{c.name}</div>
                      <p className="mt-1.5 text-[11px] text-cream/75 leading-snug hidden md:block">{c.desc}</p>
                      <div className="text-[10px] tracking-[0.3em] uppercase mt-2 inline-flex items-center gap-2 opacity-80 group-hover:gap-4 transition-all">
                        Shop <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={img30} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative container-luxe py-28 md:py-40 text-cream text-center max-w-3xl mx-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Our Promise</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Eleven hands. Forty hours.<br />
            <span className="italic text-gold">One unrepeatable piece.</span>
          </h2>
          <p className="mt-7 text-cream/80 leading-relaxed max-w-lg mx-auto">
            Every Vrudhi Fashion accessory is finished entirely by hand — from the threading
            of pearls to the final pleat of the safa. The patience of our karigars is the
            quiet luxury you wear.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="container-luxe py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">The People</div>
          <h2 className="font-display text-4xl md:text-5xl">Meet the Artisans</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="aspect-square overflow-hidden bg-secondary mb-5">
                <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
              <div className="font-display text-xl">{t.name}</div>
              <div className="mt-1 text-[10px] tracking-[0.28em] uppercase text-gold">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">@vrudhi.fashion</div>
            <h2 className="font-display text-4xl md:text-5xl">From the Atelier</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {galleryImgs.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group aspect-square overflow-hidden bg-cream relative"
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/35 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="bg-foreground text-cream py-24 md:py-32">
        <div className="container-luxe text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Global Reach</div>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Serving a diverse international clientele.
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-12 leading-relaxed">
            From Mumbai to the world — our accessories adorn grooms across continents.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {markets.map(m => (
              <span key={m} className="border border-gold/40 text-gold px-6 py-2.5 text-[11px] tracking-[0.28em] uppercase hover:border-gold hover:bg-gold/10 transition-colors">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Get In Touch</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
              Let's create something<br />
              <span className="italic text-maroon">unforgettable together.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Whether you're planning a wedding, sourcing for a fashion house, or simply
              want to know more — our team is here to help.
            </p>
            <Link
              to="/contact"
              className="mt-8 group inline-flex items-center gap-3 bg-foreground text-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors"
            >
              Contact Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="border border-border p-10 md:p-14 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">
                Cosmos Platinum, Dadar West, Mumbai — 400028
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-gold shrink-0" />
              <a href="tel:+919137499369" className="text-muted-foreground hover:text-maroon transition-colors">
                +91 9137499369
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gold shrink-0" />
              <a href="mailto:vrudhifashion@gmail.com" className="text-muted-foreground hover:text-maroon transition-colors">
                vrudhifashion@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 text-gold shrink-0" />
              <a href="https://www.vrudhifashion.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-maroon transition-colors">
                www.vrudhifashion.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="h-5 w-5 text-gold shrink-0" />
              <a href="https://instagram.com/vrudhi.fashion" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-maroon transition-colors">
                @vrudhi.fashion
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
