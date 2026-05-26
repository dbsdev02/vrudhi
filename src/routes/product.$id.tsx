import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Minus, Plus, Truck, ShieldCheck, Sparkles,
  ChevronRight, ChevronDown, Star, Share2, RotateCcw, ZoomIn,
} from "lucide-react";
import { getProduct, products, formatINR, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { cartActions, wishlistActions, useStore } from "@/lib/store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Vrudhi Fashion` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <p className="font-display text-3xl">Product not found.</p>
      <Link to="/shop" className="mt-6 inline-block text-[11px] tracking-[0.28em] uppercase border-b border-foreground hover:text-maroon hover:border-maroon">
        Back to Shop
      </Link>
    </div>
  ),
});

const reviews = [
  { name: "Aarav M.", city: "Mumbai", rating: 5, date: "Jan 2024", text: "Absolutely stunning quality. The craftsmanship is unreal — every detail is perfect." },
  { name: "Vikram S.", city: "Delhi", rating: 5, date: "Mar 2024", text: "Wore this on my wedding day and received so many compliments. Worth every rupee." },
  { name: "Rohan K.", city: "Pune", rating: 4, date: "Nov 2023", text: "Beautiful product, fast delivery. Packaging was also very premium." },
];

const accordionItems = [
  { title: "Product Details", content: "Handcrafted by master artisans in Mumbai. Each piece is individually inspected before dispatch. Materials are ethically sourced and of the highest quality." },
  { title: "Shipping & Delivery", content: "Free delivery on orders above ₹4,999. Standard delivery in 5–7 business days. Express delivery available at checkout. Ships across India and internationally." },
  { title: "Returns & Exchange", content: "Unworn items can be returned within 14 days of delivery. Custom and made-to-order pieces are non-returnable. Contact us at vrudhifashion@gmail.com for assistance." },
  { title: "Care Instructions", content: "Store in the provided dust bag away from direct sunlight. Avoid contact with water and perfume. For metal pieces, wipe gently with a soft dry cloth." },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const wished = wishlist.includes(product.id);

  const images = [product.image, product.image, product.image, product.image];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).concat(
    products.filter(p => p.id !== product.id)
  ).slice(0, 4);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container-luxe py-3 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" search={{ c: product.category } as any} className="hover:text-foreground transition-colors capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <section className="container-luxe py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16">

          {/* LEFT — Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${activeImg === i ? "border-foreground" : "border-transparent hover:border-border"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div
                className="relative overflow-hidden bg-secondary aspect-[4/5] cursor-zoom-in group"
                onClick={() => setZoomed(true)}
              >
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-foreground text-cream text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="bg-maroon text-cream text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 h-9 w-9 bg-white/80 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>

              {/* Mobile thumbnails */}
              <div className="flex gap-2 mt-3 md:hidden">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 aspect-square overflow-hidden border-2 transition-colors ${activeImg === i ? "border-foreground" : "border-transparent"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Product Info (sticky) */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            {/* Brand + title */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Vrudhi Fashion</div>
              <h1 className="font-display text-3xl md:text-4xl leading-tight">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{reviews.length} reviews</span>
              <span className="text-border">|</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-5 border-b border-border">
              <span className="font-display text-3xl">{formatINR(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-muted-foreground line-through text-lg">{formatINR(product.oldPrice)}</span>
                  <span className="text-[11px] bg-maroon text-cream px-2 py-0.5 tracking-[0.15em]">
                    Save {formatINR(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>

            {/* Color */}
            <div>
              <div className="text-[11px] tracking-[0.28em] uppercase mb-3">
                Colour — <span className="text-muted-foreground normal-case tracking-normal">{selectedColor}</span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                    className={`h-8 w-8 rounded-full transition-all ${selectedColor === c ? "ring-2 ring-foreground ring-offset-2" : "ring-1 ring-border hover:ring-foreground"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] tracking-[0.28em] uppercase">Size</div>
                <button className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground underline hover:text-foreground">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-11 min-w-[44px] px-3 border text-sm transition-colors ${
                      selectedSize === s
                        ? "border-foreground bg-foreground text-cream"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 grid place-items-center hover:bg-secondary transition-colors">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-12 w-12 grid place-items-center hover:bg-secondary transition-colors">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => { cartActions.add(product.id, qty); toast("Added to cart"); }}
                className="flex-1 min-w-[160px] bg-foreground text-cream h-12 px-6 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => { wishlistActions.toggle(product.id); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
                className={`h-12 w-12 grid place-items-center border transition-colors ${wished ? "border-maroon bg-maroon/5" : "border-border hover:border-maroon"}`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-maroon text-maroon" : ""}`} />
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={() => { cartActions.add(product.id, qty); toast("Proceeding to checkout…"); }}
              className="w-full border border-foreground h-12 text-[11px] tracking-[0.28em] uppercase hover:bg-foreground hover:text-cream transition-colors"
            >
              Buy It Now
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-border text-center">
              {[
                [Truck, "Free Delivery", "Above ₹4,999"],
                [ShieldCheck, "Secure Payment", "100% Protected"],
                [RotateCcw, "Easy Returns", "14-day policy"],
              ].map(([Icon, title, sub], i) => {
                const I = Icon as any;
                return (
                  <div key={i}>
                    <I className="h-5 w-5 text-gold mx-auto mb-1.5" />
                    <div className="text-[10px] tracking-[0.18em] uppercase font-medium">{title as string}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">{sub as string}</div>
                  </div>
                );
              })}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" /> Share this product
            </button>

            {/* Accordion */}
            <div className="border-t border-border">
              {accordionItems.map((item, i) => (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-[12px] tracking-[0.22em] uppercase font-medium">{item.title}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed pb-4">{item.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-secondary/20">
        <div className="container-luxe py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Customer Reviews</div>
              <h2 className="font-display text-3xl md:text-4xl">What our customers say</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-display text-5xl">5.0</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-cream border border-border p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  <span>{r.name} · {r.city}</span>
                  <span>{r.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="container-luxe py-16 md:py-20">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3 text-center">You May Also Like</div>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Zoom lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[activeImg]}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
