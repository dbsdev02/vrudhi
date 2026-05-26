import { Link } from "@tanstack/react-router";
import logo from "@/assets/PISTA Vrudhi Fashion-logo.png";
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, wishlist } = useStore();
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-black text-white text-[11px] tracking-[0.2em] uppercase">
        <div className="container-luxe py-2 text-center">
          Complimentary white-glove delivery on orders above ₹4,999 · Crafted in India
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxe flex items-center justify-between h-20">
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-9 flex-1">
            {nav.slice(0, 2).map((n, i) => (
              <Link
                key={i}
                to={n.to}
                className="text-[12px] tracking-[0.22em] uppercase text-foreground/80 hover:text-maroon transition-colors"
                activeProps={{ className: "text-maroon" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            {/* Categories dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[12px] tracking-[0.22em] uppercase text-foreground/80 hover:text-maroon transition-colors">
                Categories <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 min-w-[160px] z-50">
              <div className="bg-background border border-border shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to="/shop"
                    search={{ c: cat.slug } as any}
                    className="block px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase text-foreground/80 hover:text-maroon hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              </div>
            </div>
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo} alt="Vrudhi Fashion" className="h-14 md:h-16 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-5 flex-1 justify-end">
            {nav.slice(3).map((n, i) => (
              <Link
                key={i}
                to={n.to}
                className="hidden md:inline text-[12px] tracking-[0.22em] uppercase text-foreground/80 hover:text-maroon transition-colors"
                activeProps={{ className: "text-maroon" }}
              >
                {n.label}
              </Link>
            ))}
            <button aria-label="Search" className="text-foreground/80 hover:text-maroon transition-colors">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/signin" className="text-foreground/80 hover:text-maroon transition-colors" aria-label="My Account">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" className="relative text-foreground/80 hover:text-maroon transition-colors" aria-label="Wishlist">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-maroon text-primary-foreground rounded-full h-4 w-4 grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-foreground/80 hover:text-maroon transition-colors" aria-label="Cart">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-gold text-foreground rounded-full h-4 w-4 grid place-items-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-foreground/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-cream p-8 shadow-2xl transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <img src={logo} alt="Vrudhi Fashion" className="h-10 w-auto object-contain" />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5"/></button>
          </div>
          <nav className="flex flex-col gap-6">
            {nav.map((n, i) => (
              <Link
                key={i}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-[13px] tracking-[0.22em] uppercase text-foreground hover:text-maroon"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pl-3 border-l border-border">
              <span className="text-[11px] tracking-[0.22em] uppercase text-foreground/50">Categories</span>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/shop"
                  search={{ c: cat.slug } as any}
                  onClick={() => setOpen(false)}
                  className="text-[12px] tracking-[0.18em] uppercase text-foreground/80 hover:text-maroon"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
