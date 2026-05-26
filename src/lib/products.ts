import safa from "@/assets/cat-safa.jpg";
import mojadi from "@/assets/cat-mojadi.jpg";
import mala from "@/assets/cat-mala.jpg";
import brooch from "@/assets/cat-brooch.jpg";
import kamarbandh from "@/assets/cat-kamarbandh.jpg";
import pocket from "@/assets/cat-pocket.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  badge?: string;
  description: string;
};

export const categories = [
  { slug: "safa", name: "Safa & Pagdi", image: safa },
  { slug: "mojadi", name: "Mojadi", image: mojadi },
  { slug: "mala", name: "Mala", image: mala },
  { slug: "brooch", name: "Brooch", image: brooch },
  { slug: "kamarbandh", name: "Kamarbandh", image: kamarbandh },
  { slug: "pocket-square", name: "Pocket Squares", image: pocket },
];

export const products: Product[] = [
  { id: "p1", name: "Maroon Velvet Royal Safa", category: "safa", price: 4999, oldPrice: 6499, image: safa, colors: ["#5b1320", "#c8a24b", "#f3e6c9"], badge: "Bestseller", description: "Hand-pleated silk safa with gold zari border and a kundan brooch. A timeless heirloom for the modern groom." },
  { id: "p2", name: "Crimson Zardozi Mojadi", category: "mojadi", price: 3299, image: mojadi, colors: ["#5b1320", "#1a1a1a"], badge: "New", description: "Maroon velvet mojaris with intricate gold zardozi paisleys, hand-stitched by master artisans of Jaipur." },
  { id: "p3", name: "Pearl & Ruby Layered Mala", category: "mala", price: 5899, oldPrice: 7299, image: mala, colors: ["#f3e6c9", "#5b1320"], description: "Three-strand pearl mala with gold filigree spacers and ruby beads — the centerpiece of regal sherwani styling." },
  { id: "p4", name: "Kundan Heritage Brooch", category: "brooch", price: 1899, image: brooch, colors: ["#c8a24b", "#f3e6c9"], badge: "Limited", description: "Antique-finish kundan brooch with seed pearls and an articulated pin — the finishing touch for safa or sherwani." },
  { id: "p5", name: "Imperial Zari Kamarbandh", category: "kamarbandh", price: 2799, image: kamarbandh, colors: ["#5b1320", "#c8a24b"], description: "Maroon velvet waistband with gold zari work and silk tassels — sculpts and elevates the wedding silhouette." },
  { id: "p6", name: "Banarasi Pocket Square Duo", category: "pocket-square", price: 999, image: pocket, colors: ["#5b1320", "#e2bf6f"], description: "A pair of pure silk pocket squares, woven in Banaras with paisley motifs in maroon and ivory." },
  { id: "p7", name: "Ivory Pearl Tassel Safa", category: "safa", price: 4499, image: safa, colors: ["#f3e6c9", "#c8a24b"], description: "Soft ivory silk safa with pearl trims and a delicate gold kalgi — refined and ceremonial." },
  { id: "p8", name: "Black Velvet Mojadi", category: "mojadi", price: 2999, image: mojadi, colors: ["#1a1a1a", "#c8a24b"], description: "Sleek black velvet mojaris with subtle gold thread work — pairs effortlessly with bandhgala and sherwani." },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const byCategory = (slug: string) => products.filter(p => p.category === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
