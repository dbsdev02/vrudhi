import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook } from "lucide-react";
import logo from "@/assets/PISTA Vrudhi Fashion-logo.png";

export function Footer() {
  return (
    <footer className="mt-32 bg-foreground text-cream">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/">
            <img src={logo} alt="Vrudhi Fashion" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-cream/65 mt-6 text-sm leading-relaxed">
            A leading specialist in premium Men's ethnic accessories — based in Mumbai's
            historic textile district, crafting elegance since 2009.
          </p>
        </div>

        <FooterCol title="Discover" links={[
          ["Shop All", "/shop"],
          ["Heritage", "/about"],
          ["Contact", "/contact"],
          ["Wedding Concierge", "/contact"],
        ]} />

        <FooterCol title="Care" links={[
          ["Shipping & Returns", "/about"],
          ["Size Guide", "/about"],
          ["Care Instructions", "/about"],
          ["FAQs", "/contact"],
        ]} />

        <div>
          <h4 className="text-[12px] tracking-[0.22em] uppercase text-cream/90 mb-5">The Atelier</h4>
          <p className="text-sm text-cream/65 leading-relaxed">
            Cosmos Platinum, Dadar West,<br />
            Mumbai — 400028<br />
            +91 9137499369<br />
            vrudhifashion@gmail.com
          </p>
          <div className="flex gap-4 mt-6 text-cream/70">
            <a href="https://instagram.com/vrudhi.fashion" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-cream/50">
          <span>© {new Date().getFullYear()} Vrudhi Fashion · All rights reserved</span>
          <span>Made with reverence in India</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[12px] tracking-[0.22em] uppercase text-cream/90 mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-cream/65 hover:text-gold transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
