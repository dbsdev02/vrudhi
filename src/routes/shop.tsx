import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, formatINR } from "@/lib/products";
import { cartActions, wishlistActions, useStore } from "@/lib/store";
import { toast } from "sonner";
import {
  Search, SlidersHorizontal, X, Heart, ShoppingBag,
  ChevronDown, ChevronRight, LayoutGrid, List, Star,
} from "lucide-react";

type SearchParams = { c?: string; q?: string };

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    c: typeof s.c === "string" ? s.c : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — Vrudhi Fashion" },
      { name: "description", content: "Browse premium Men's ethnic accessories — Dulha Mala, Brooches, Safas and more." },
    ],
  }),
});

const priceRanges = [
  { label: "Under ₹1,500", min: 0, max: 1500 },
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

function ShopPage() {
  const { c, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(q || "");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedSections, setExpandedSections] = useState({ categories: true, price: true });

  const filtered = useMemo(() => {
    let list = products;
    if (c) list = list.filter(p => p.category === c);
    const term = (query || q || "").trim().toLowerCase();
    if (term) list = list.filter(p => p.name.toLowerCase().includes(term) || p.category.includes(term));
    if (priceFilter !== null) {
      const range = priceRanges[priceFilter];
      list = list.filter(p => p.price >= range.min && p.price < range.max);
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [c, q, query, sort, priceFilter]);

  const activeCategory = categories.find(cat => cat.slug === c);
  const activeFiltersCount = (c ? 1 : 0) + (priceFilter !== null ? 1 : 0) + (query ? 1 : 0);

  function clearAll() {
    navigate({ search: {} as any });
    setQuery("");
    setPriceFilter(null);
  }

  const toggleSection = (key: keyof typeof expandedSections) =>
    setExpandedSections(s => ({ ...s, [key]: !s[key] }));

  const Sidebar = () => (
    <div className="space-y-0 divide-y divide-border border border-border">
      {/* Search */}
      <div className="p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-secondary/50 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-transparent focus:border-gold"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium">Categories</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections.categories ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.categories && (
          <div className="px-5 pb-5 space-y-1">
            <button
              onClick={() => navigate({ search: { c: undefined } as any })}
              className={`w-full flex items-center justify-between py-2 text-sm transition-colors ${!c ? "text-maroon font-medium" : "text-foreground/80 hover:text-maroon"}`}
            >
              <span>All Products</span>
              <span className="text-xs text-muted-foreground">{products.length}</span>
            </button>
            {categories.map(cat => {
              const count = products.filter(p => p.category === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => navigate({ search: { c: cat.slug } as any })}
                  className={`w-full flex items-center justify-between py-2 text-sm transition-colors ${c === cat.slug ? "text-maroon font-medium" : "text-foreground/80 hover:text-maroon"}`}
                >
                  <span className="flex items-center gap-2">
                    {c === cat.slug && <span className="h-1.5 w-1.5 rounded-full bg-maroon" />}
                    {cat.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium">Price Range</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.price && (
          <div className="px-5 pb-5 space-y-1">
            {priceRanges.map((range, i) => (
              <button
                key={range.label}
                onClick={() => setPriceFilter(priceFilter === i ? null : i)}
                className={`w-full flex items-center gap-3 py-2 text-sm transition-colors ${priceFilter === i ? "text-maroon font-medium" : "text-foreground/80 hover:text-maroon"}`}
              >
                <span className={`h-4 w-4 border shrink-0 grid place-items-center transition-colors ${priceFilter === i ? "border-maroon bg-maroon" : "border-border"}`}>
                  {priceFilter === i && <span className="h-2 w-2 bg-white" />}
                </span>
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="p-5">
        <div className="text-[11px] tracking-[0.28em] uppercase font-medium mb-4">Availability</div>
        <div className="flex flex-wrap gap-2">
          {["Bestseller", "New", "Limited"].map(badge => (
            <span key={badge} className="border border-border px-3 py-1 text-xs text-muted-foreground hover:border-gold hover:text-foreground cursor-pointer transition-colors">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Breadcrumb + Header */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container-luxe py-4 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          {activeCategory && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{activeCategory.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-cream border-b border-border">
        <div className="container-luxe py-10 md:py-14">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            {activeCategory ? activeCategory.name : "All Products"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl">
            {activeCategory ? activeCategory.name : "Shop the Collection"}
          </h1>
          <p className="mt-3 text-muted-foreground text-sm">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} · Premium Men's Ethnic Accessories
          </p>
        </div>
      </div>

      <div className="container-luxe py-8 md:py-12">
        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Active filters:</span>
            {c && (
              <FilterChip label={activeCategory?.name || c} onRemove={() => navigate({ search: { c: undefined } as any })} />
            )}
            {priceFilter !== null && (
              <FilterChip label={priceRanges[priceFilter].label} onRemove={() => setPriceFilter(null)} />
            )}
            {query && (
              <FilterChip label={`"${query}"`} onRemove={() => setQuery("")} />
            )}
            <button onClick={clearAll} className="text-[11px] tracking-[0.2em] uppercase text-maroon hover:underline ml-2">
              Clear all
            </button>
          </div>
        )}

        <div className="grid gap-10">
          {/* No static sidebar — handled by overlay */}

          {/* Main */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-border">
              <div className="flex items-center gap-3">
                {/* Filter toggle — works on all screen sizes */}
                <button
                  onClick={() => setSidebarOpen(v => !v)}
                  className="flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase hover:border-gold transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
                <span className="hidden md:block text-sm text-muted-foreground">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="hidden sm:flex border border-border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-foreground text-cream" : "hover:bg-secondary"}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-foreground text-cream" : "hover:bg-secondary"}`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-gold cursor-pointer"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="text-center py-32 border border-border">
                <p className="font-display text-3xl mb-4">No products found.</p>
                <p className="text-muted-foreground mb-8">Try adjusting your filters or search term.</p>
                <button onClick={clearAll} className="bg-foreground text-cream px-8 py-3 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p, i) => <GridCard key={p.id} product={p} index={i} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p, i) => <ListCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter drawer — all screen sizes */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 max-w-[90%] bg-background z-50 overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
                <span className="font-display text-xl">Filters</span>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <Sidebar />
              </div>
              <div className="p-5 border-t border-border shrink-0">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full bg-foreground text-cream py-3 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors"
                >
                  Show {filtered.length} Products
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


    </>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1 text-xs">
      {label}
      <button onClick={onRemove} className="text-muted-foreground hover:text-maroon transition-colors">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function GridCard({ product, index }: { product: ReturnType<typeof products[0]["valueOf"]>; index: number }) {
  const { wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06 }}
      className="group"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-foreground text-cream text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-maroon text-cream text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => { wishlistActions.toggle(product.id); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
          className="absolute top-3 right-3 h-8 w-8 grid place-items-center bg-white/90 hover:bg-white transition-colors shadow-sm"
          aria-label="Wishlist"
        >
          <Heart className={`h-3.5 w-3.5 ${wished ? "fill-maroon text-maroon" : "text-foreground"}`} />
        </button>

        {/* Hover CTA */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => { cartActions.add(product.id); toast("Added to cart"); }}
            className="w-full bg-foreground text-cream py-3 text-[10px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1 capitalize">
          {product.category.replace("-", " ")}
        </div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-display text-base leading-snug hover:text-maroon transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-medium text-sm">{formatINR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-muted-foreground line-through text-xs">{formatINR(product.oldPrice)}</span>
          )}
        </div>
        {/* Stars */}
        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(24)</span>
        </div>
        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.map(col => (
            <span key={col} title={col} className="h-3 w-3 rounded-full ring-1 ring-border ring-offset-1 cursor-pointer hover:scale-125 transition-transform" style={{ backgroundColor: col }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ListCard({ product, index }: { product: ReturnType<typeof products[0]["valueOf"]>; index: number }) {
  const { wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group flex gap-5 border border-border bg-cream p-4 hover:border-gold transition-colors"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="relative w-32 md:w-44 aspect-[3/4] shrink-0 overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-foreground text-cream text-[9px] tracking-[0.2em] uppercase px-2 py-0.5">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex-1 flex flex-col py-1">
        <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1 capitalize">
          {product.category.replace("-", " ")}
        </div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-display text-xl md:text-2xl leading-snug hover:text-maroon transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(24)</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden md:block">
          {product.description}
        </p>
        <div className="flex gap-1.5 mt-3">
          {product.colors.map(col => (
            <span key={col} className="h-3.5 w-3.5 rounded-full ring-1 ring-border ring-offset-1" style={{ backgroundColor: col }} />
          ))}
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-muted-foreground line-through text-sm">{formatINR(product.oldPrice)}</span>
                {discount && <span className="text-[10px] bg-maroon text-cream px-2 py-0.5 tracking-[0.15em]">-{discount}%</span>}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { wishlistActions.toggle(product.id); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
              className="h-10 w-10 border border-border grid place-items-center hover:border-gold transition-colors"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-maroon text-maroon" : ""}`} />
            </button>
            <button
              onClick={() => { cartActions.add(product.id); toast("Added to cart"); }}
              className="flex items-center gap-2 bg-foreground text-cream px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase hover:bg-maroon transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
