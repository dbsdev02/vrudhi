import img1 from "@/assets/vrudhi-img/1.jpeg";
import img2 from "@/assets/vrudhi-img/2.jpeg";
import img3 from "@/assets/vrudhi-img/3.jpeg";
import img4 from "@/assets/vrudhi-img/4.jpeg";
import img5 from "@/assets/vrudhi-img/5.jpeg";
import img6 from "@/assets/vrudhi-img/6.jpeg";
import img7 from "@/assets/vrudhi-img/7.jpeg";
import img8 from "@/assets/vrudhi-img/8.jpeg";
import img9 from "@/assets/vrudhi-img/9.jpeg";
import img10 from "@/assets/vrudhi-img/10.jpeg";
import img11 from "@/assets/vrudhi-img/11.jpeg";
import img12 from "@/assets/vrudhi-img/12.jpeg";
import img13 from "@/assets/vrudhi-img/13.jpeg";
import img14 from "@/assets/vrudhi-img/14.jpeg";
import img15 from "@/assets/vrudhi-img/15.jpeg";
import img16 from "@/assets/vrudhi-img/16.jpeg";
import img17 from "@/assets/vrudhi-img/17.jpeg";
import img18 from "@/assets/vrudhi-img/18.jpeg";

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
  { slug: "safa", name: "Safa & Pagdi", image: img1 },
  { slug: "mojadi", name: "Mojadi", image: img4 },
  { slug: "mala", name: "Mala", image: img7 },
  { slug: "brooch", name: "Brooch", image: img10 },
  { slug: "kamarbandh", name: "Kamarbandh", image: img13 },
  { slug: "pocket-square", name: "Pocket Squares", image: img16 },
];

export const products: Product[] = [
  { id: "p1", name: "Maroon Velvet Royal Safa", category: "safa", price: 4999, oldPrice: 6499, image: img1, colors: ["#5b1320", "#c8a24b", "#f3e6c9"], badge: "Bestseller", description: "Hand-pleated silk safa with gold zari border and a kundan brooch. A timeless heirloom for the modern groom." },
  { id: "p2", name: "Crimson Zardozi Mojadi", category: "mojadi", price: 3299, image: img4, colors: ["#5b1320", "#1a1a1a"], badge: "New", description: "Maroon velvet mojaris with intricate gold zardozi paisleys, hand-stitched by master artisans of Jaipur." },
  { id: "p3", name: "Pearl & Ruby Layered Mala", category: "mala", price: 5899, oldPrice: 7299, image: img7, colors: ["#f3e6c9", "#5b1320"], description: "Three-strand pearl mala with gold filigree spacers and ruby beads — the centerpiece of regal sherwani styling." },
  { id: "p4", name: "Kundan Heritage Brooch", category: "brooch", price: 1899, image: img10, colors: ["#c8a24b", "#f3e6c9"], badge: "Limited", description: "Antique-finish kundan brooch with seed pearls and an articulated pin — the finishing touch for safa or sherwani." },
  { id: "p5", name: "Imperial Zari Kamarbandh", category: "kamarbandh", price: 2799, image: img13, colors: ["#5b1320", "#c8a24b"], description: "Maroon velvet waistband with gold zari work and silk tassels — sculpts and elevates the wedding silhouette." },
  { id: "p6", name: "Banarasi Pocket Square Duo", category: "pocket-square", price: 999, image: img16, colors: ["#5b1320", "#e2bf6f"], description: "A pair of pure silk pocket squares, woven in Banaras with paisley motifs in maroon and ivory." },
  { id: "p7", name: "Ivory Pearl Tassel Safa", category: "safa", price: 4499, image: img2, colors: ["#f3e6c9", "#c8a24b"], description: "Soft ivory silk safa with pearl trims and a delicate gold kalgi — refined and ceremonial." },
  { id: "p8", name: "Black Velvet Mojadi", category: "mojadi", price: 2999, image: img5, colors: ["#1a1a1a", "#c8a24b"], description: "Sleek black velvet mojaris with subtle gold thread work — pairs effortlessly with bandhgala and sherwani." },
  { id: "p9", name: "Gold Zari Safa", category: "safa", price: 5499, image: img3, colors: ["#c8a24b", "#f3e6c9"], badge: "New", description: "Luxurious gold zari safa with intricate weave patterns, perfect for the royal baraat procession." },
  { id: "p10", name: "Embroidered Silk Mojadi", category: "mojadi", price: 3799, oldPrice: 4499, image: img6, colors: ["#c8a24b", "#5b1320"], description: "Silk mojaris with hand-embroidered floral motifs in gold thread — a statement of refined taste." },
  { id: "p11", name: "Emerald Beaded Mala", category: "mala", price: 6299, image: img8, colors: ["#2d6a4f", "#c8a24b"], badge: "Limited", description: "Emerald and gold bead mala with a hand-crafted pendant — a jewel for the discerning groom." },
  { id: "p12", name: "Pearl Strand Mala", category: "mala", price: 4799, oldPrice: 5999, image: img9, colors: ["#f3e6c9", "#c8a24b"], description: "Classic single-strand pearl mala with gold clasp — timeless elegance for every wedding ceremony." },
  { id: "p13", name: "Floral Enamel Brooch", category: "brooch", price: 2199, image: img11, colors: ["#c8a24b", "#5b1320"], description: "Hand-painted enamel brooch with floral motif and gold border — adds a pop of colour to any sherwani." },
  { id: "p14", name: "Silver Filigree Brooch", category: "brooch", price: 1699, image: img12, colors: ["#c0c0c0", "#f3e6c9"], badge: "New", description: "Delicate silver filigree brooch with pearl centre — a subtle yet striking accessory for the modern groom." },
  { id: "p15", name: "Velvet Zari Kamarbandh", category: "kamarbandh", price: 3199, image: img14, colors: ["#1a1a1a", "#c8a24b"], description: "Deep black velvet kamarbandh with gold zari embroidery — pairs beautifully with ivory or cream sherwanis." },
  { id: "p16", name: "Silk Tassel Kamarbandh", category: "kamarbandh", price: 2499, oldPrice: 2999, image: img15, colors: ["#5b1320", "#f3e6c9"], badge: "Bestseller", description: "Maroon silk kamarbandh with ivory tassel ends and gold thread detailing — a classic bridal accessory." },
  { id: "p17", name: "Ivory Silk Pocket Square", category: "pocket-square", price: 799, image: img17, colors: ["#f3e6c9", "#c8a24b"], description: "Pure ivory silk pocket square with gold border — the perfect finishing touch for any sherwani or bandhgala." },
  { id: "p18", name: "Paisley Brocade Pocket Square", category: "pocket-square", price: 1199, image: img18, colors: ["#5b1320", "#c8a24b"], badge: "New", description: "Rich brocade pocket square with traditional paisley pattern in maroon and gold — woven on a Banarasi loom." },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const byCategory = (slug: string) => products.filter(p => p.category === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
