import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import craftImg from "@/assets/craft.jpg";
import collectionImg from "@/assets/collection-wedding.jpg";
import heroImg from "@/assets/hero-groom.jpg";
import { MapPin, Phone, Mail, Globe, Instagram } from "lucide-react";

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
  { title: "Customer Satisfaction", desc: "Our driving force in everything we do." },
  { title: "Quality Assurance", desc: "Premium products only — no compromises." },
  { title: "Punctuality", desc: "On-time completion, every single order." },
  { title: "Innovation", desc: "Fresh seasonal collections, always evolving." },
];

const products = [
  { cat: "Dulha Mala Collection", items: ["Emerald & Pearl Dulha Mala", "Ruby Stone Mala", "Premium Pearl Strings"] },
  { cat: "Metal Fancy Buttons", items: ["Wedding & Ethnic Buttons", "Metal Show Buttons", "Designer Hardware"] },
  { cat: "Formal & Custom", items: ["Ties & Bows", "Cufflinks", "Bespoke Accessories"] },
  { cat: "Signature Brooches", items: ["Emerald Elephant Brooches", "Gold Crest Brooches", "Metal Brooches"] },
];

const markets = ["UK", "USA", "UAE", "Africa", "Bangladesh", "Nepal", "Sri Lanka"];

function AboutPage() {
  return (
    <>
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-foreground text-cream">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
        </div>
        <div className="relative container-luxe py-28 md:py-40 max-w-3xl">
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
              based in Mumbai's historic textile district.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="container-luxe py-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={collectionImg} alt="Vrudhi Fashion Collection" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Our Story</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            A decade of perfecting the finishing touch.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Based in Mumbai's historic textile district, we have dedicated over a decade to
            perfecting the finishing touches that transform traditional attire into a statement
            of royalty.
          </p>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From our signature Dulha Mala collections to bespoke metal hardware and formal
            accents, every piece is crafted with precision and passion — serving grooms and
            fashion houses across India and the world.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[["2009", "Est."], ["15+", "Years"], ["7+", "Countries"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-foreground">{n}</div>
                <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-secondary/40 py-24">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">What Drives Us</div>
            <h2 className="font-display text-4xl md:text-5xl">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-cream border border-border p-8"
              >
                <div className="text-gold font-display text-4xl mb-4">0{i + 1}</div>
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="container-luxe py-24">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">What We Offer</div>
          <h2 className="font-display text-4xl md:text-5xl">Product Showcase</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="border border-border p-8 hover:border-gold transition-colors"
            >
              <div className="text-gold mb-1">✦</div>
              <h3 className="font-display text-xl mb-4">{p.cat}</h3>
              <ul className="space-y-2">
                {p.items.map(item => (
                  <li key={item} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-gold/60 mt-0.5">·</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CRAFT IMAGE BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={craftImg} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container-luxe py-28 text-cream text-center max-w-3xl mx-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Featured</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Emerald & Pearl<br />
            <span className="italic text-gold">Dulha Mala</span>
          </h2>
          <p className="mt-6 text-cream/80 leading-relaxed max-w-lg mx-auto">
            Our signature collection — premium pearls, ruby stones and emerald accents,
            strung by hand for the groom who commands attention.
          </p>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="bg-foreground text-cream py-24">
        <div className="container-luxe text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Global Reach</div>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Serving a diverse international clientele.
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-12 leading-relaxed">
            From Mumbai to the world — our accessories adorn grooms across continents.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {markets.map(m => (
              <span key={m} className="border border-gold/40 text-gold px-6 py-2 text-[11px] tracking-[0.28em] uppercase">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="container-luxe py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Get In Touch</div>
          <h2 className="font-display text-4xl md:text-5xl mb-12">Vrudhi Fashion</h2>
          <div className="border border-border p-10 md:p-14 space-y-6">
            <div className="flex items-start gap-4 text-left">
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
