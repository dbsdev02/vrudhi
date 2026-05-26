import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useStore, cartActions } from "@/lib/store";
import { getProduct, formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — VRUDHI IMPEX" }] }),
});

function CartPage() {
  const { cart } = useStore();
  const items = Object.entries(cart)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter(x => x.product) as { product: NonNullable<ReturnType<typeof getProduct>>; qty: number }[];

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="container-luxe py-32 text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Your Cart</div>
        <h1 className="font-display text-5xl">Your cart awaits adornment.</h1>
        <p className="mt-5 text-muted-foreground">Begin with a piece worthy of the day.</p>
        <Link to="/shop" className="mt-10 inline-block bg-foreground text-cream px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
          Explore the Atelier
        </Link>
      </section>
    );
  }

  return (
    <section className="container-luxe py-16 md:py-20">
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Your Cart</div>
      <h1 className="font-display text-5xl md:text-6xl">{items.length} piece{items.length > 1 ? "s" : ""}</h1>

      <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="divide-y divide-border border-y border-border">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="py-6 flex gap-5">
              <Link to="/product/$id" params={{ id: product.id }} className="w-24 md:w-32 aspect-[4/5] overflow-hidden bg-secondary shrink-0">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-3">
                  <Link to="/product/$id" params={{ id: product.id }} className="font-display text-xl hover:text-maroon">{product.name}</Link>
                  <button onClick={() => cartActions.remove(product.id)} className="text-muted-foreground hover:text-maroon" aria-label="Remove">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground mt-1 capitalize">{product.category}</div>
                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                  <div className="flex items-center border border-border">
                    <button onClick={() => cartActions.setQty(product.id, qty - 1)} className="h-10 w-10 grid place-items-center hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                    <span className="w-10 text-center text-sm">{qty}</span>
                    <button onClick={() => cartActions.setQty(product.id, qty + 1)} className="h-10 w-10 grid place-items-center hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="text-right">
                    <div className="text-foreground">{formatINR(product.price * qty)}</div>
                    <div className="text-xs text-muted-foreground">{formatINR(product.price)} each</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-cream border border-border p-8 h-fit lg:sticky lg:top-32">
          <h3 className="font-display text-2xl mb-6">Order Summary</h3>
          <Row label="Subtotal" value={formatINR(subtotal)} />
          <Row label="Shipping" value={shipping === 0 ? "Complimentary" : formatINR(shipping)} />
          <div className="border-t border-border my-5" />
          <Row label="Total" value={formatINR(total)} bold />
          <button className="mt-8 w-full bg-foreground text-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
            Proceed to Checkout
          </button>
          <Link to="/shop" className="block mt-4 text-center text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-maroon">
            Continue Browsing
          </Link>
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className={bold ? "font-medium text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "font-display text-lg" : "text-foreground"}>{value}</span>
    </div>
  );
}
