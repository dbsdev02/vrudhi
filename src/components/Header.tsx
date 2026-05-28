import { Link } from "@tanstack/react-router";
import logo from "@/assets/PISTA Vrudhi Fashion-logo.png";
import { Search, ShoppingBag, Menu, X, User, ChevronDown, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/products";

const nav = [
  { to: "/", label: "Home", exact: true },
  { to: "/shop", label: "Shop", dropdown: true },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, wishlist } = useStore();
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ROW 1 — Announcement bar */}
      <div className="bg-foreground text-cream text-[11px] tracking-[0.22em] uppercase">
        <div className="container-luxe py-2.5 text-center">
          Complimentary white-glove delivery on orders above ₹4,999 &nbsp;·&nbsp; Crafted in India
        </div>
      </div>

      <header className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : ""}`}>

        {/* ROW 2 — Search | Logo | Icons */}
        <div className="border-b border-border">
          <div className="container-luxe flex items-center justify-between h-[72px]">

            {/* Left — Search */}
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSearchOpen(v => !v)}
                aria-label="Search"
                className="hidden md:block text-foreground/60 hover:text-foreground transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden text-foreground/70 hover:text-foreground"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Center — Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logo} alt="Vrudhi Fashion" className="h-14 md:h-16 w-auto object-contain" />
            </Link>

            {/* Right — Account, Wishlist, Cart */}
            <div className="flex items-center gap-5 flex-1 justify-end">
              <Link to="/signin" aria-label="My Account" className="hidden md:block text-foreground/60 hover:text-foreground transition-colors">
                <User className="h-5 w-5" />
              </Link>
              <Link to="/wishlist" aria-label="Wishlist" className="hidden md:flex relative text-foreground/60 hover:text-foreground transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-[9px] bg-maroon text-cream rounded-full h-4 w-4 grid place-items-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" aria-label="Cart" className="relative text-foreground/60 hover:text-foreground transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-[9px] bg-gold text-foreground rounded-full h-4 w-4 grid place-items-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar expand */}
          {searchOpen && (
            <div className="border-t border-border px-6 py-3 hidden md:block">
              <input
                autoFocus
                type="text"
                placeholder="Search products…"
                onBlur={() => setSearchOpen(false)}
                className="w-full text-sm px-0 py-1 border-b border-foreground/30 focus:border-foreground focus:outline-none bg-transparent placeholder:text-muted-foreground"
              />
            </div>
          )}
        </div>

        {/* ROW 3 — Nav links */}
        <nav className="hidden md:block border-b border-border">
          <div className="container-luxe flex items-center justify-center gap-0">
            {nav.map((n) =>
              n.dropdown ? (
                <div key={n.to} className="relative group">
                  <button className="flex items-center gap-1 px-5 py-4 text-[12px] tracking-[0.2em] uppercase text-foreground/75 hover:text-foreground transition-colors">
                    {n.label} <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 min-w-[200px]">
                    <div className="bg-background border border-border shadow-xl mt-px">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to="/shop"
                          search={{ c: cat.slug } as any}
                          className="flex items-center gap-3 px-5 py-3 text-[11px] tracking-[0.18em] uppercase text-foreground/75 hover:text-maroon hover:bg-secondary/50 transition-colors"
                        >
                          <div className="h-8 w-8 overflow-hidden bg-secondary shrink-0">
                            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                          </div>
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.exact }}
                  className="px-5 py-4 text-[12px] tracking-[0.2em] uppercase text-foreground/75 hover:text-foreground transition-colors border-b-2 border-transparent"
                  activeProps={{ className: "px-5 py-4 text-[12px] tracking-[0.2em] uppercase text-foreground font-medium border-b-2 border-foreground" }}
                >
                  {n.label}
                </Link>
              )
            )}
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-background flex flex-col shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-6 py-5 border-b border-border">
            <img src={logo} alt="Vrudhi Fashion" className="h-10 w-auto object-contain" />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.exact }}
                className="py-3.5 text-[13px] tracking-[0.2em] uppercase text-foreground/80 hover:text-maroon border-b border-border/50 transition-colors"
                activeProps={{ className: "py-3.5 text-[13px] tracking-[0.2em] uppercase text-maroon border-b border-border/50 font-medium" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-5">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Collections</div>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/shop"
                  search={{ c: cat.slug } as any}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-[12px] tracking-[0.15em] uppercase text-foreground/70 hover:text-maroon transition-colors"
                >
                  <div className="h-8 w-8 overflow-hidden bg-secondary shrink-0">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                  </div>
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center gap-5">
              <Link to="/signin" onClick={() => setOpen(false)} className="text-foreground/70 hover:text-maroon transition-colors">
                <User className="h-5 w-5" />
              </Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="relative text-foreground/70 hover:text-maroon transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-[9px] bg-maroon text-cream rounded-full h-4 w-4 grid place-items-center">{wishlist.length}</span>
                )}
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="relative text-foreground/70 hover:text-maroon transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-[9px] bg-gold text-foreground rounded-full h-4 w-4 grid place-items-center">{cartCount}</span>
                )}
              </Link>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
