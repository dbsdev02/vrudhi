import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { type Product, formatINR } from "@/lib/products";
import { cartActions, wishlistActions, useStore } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-4 left-4 bg-cream/95 text-foreground text-[10px] tracking-[0.22em] uppercase px-3 py-1.5">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => {
            wishlistActions.toggle(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Wishlist"
          className="absolute top-4 right-4 h-9 w-9 grid place-items-center bg-cream/95 hover:bg-cream transition-colors"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-maroon text-maroon" : "text-foreground"}`} />
        </button>
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={() => { cartActions.add(product.id); toast("Added to cart"); }}
            className="flex-1 bg-foreground text-cream text-[11px] tracking-[0.22em] uppercase py-3 hover:bg-maroon transition-colors"
          >
            Add to Cart
          </button>
          <Link
            to="/product/$id" params={{ id: product.id }}
            className="h-[42px] w-[42px] grid place-items-center bg-cream/95 hover:bg-cream"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="pt-5 text-center">
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <h3 className="font-display text-lg leading-snug text-foreground group-hover:text-maroon transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-3 text-sm">
          <span className="text-foreground">{formatINR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-muted-foreground line-through text-xs">{formatINR(product.oldPrice)}</span>
          )}
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {product.colors.map(c => (
            <span key={c} className="h-2.5 w-2.5 rounded-full ring-1 ring-border" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
