import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — VRUDHI IMPEX" }] }),
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <section className="container-luxe py-16 md:py-20">
      <div className="text-center mb-14">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Wishlist</div>
        <h1 className="font-display text-5xl md:text-6xl">Pieces close to your heart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Your wishlist is waiting to be filled with treasures.</p>
          <Link to="/shop" className="mt-8 inline-block bg-foreground text-cream px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
            Explore the Atelier
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </section>
  );
}
