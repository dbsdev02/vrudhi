import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, Heart, Settings, LogOut, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { useStore } from "@/lib/store";
import { getProduct, formatINR } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "My Account — Vrudhi Fashion" }] }),
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockOrders = [
  { id: "VF-2024-001", date: "12 Jan 2024", status: "Delivered", items: ["Emerald Dulha Mala", "Gold Brooch"], total: 4299 },
  { id: "VF-2024-002", date: "28 Mar 2024", status: "Processing", items: ["Royal Maroon Safa"], total: 1899 },
  { id: "VF-2023-089", date: "5 Nov 2023", status: "Delivered", items: ["Pearl Kamarbandh", "Cufflinks Set"], total: 3150 },
];

const statusColor: Record<string, string> = {
  Delivered: "text-green-700 bg-green-50 border-green-200",
  Processing: "text-gold bg-amber-50 border-amber-200",
  Shipped: "text-blue-700 bg-blue-50 border-blue-200",
};

function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { wishlist } = useStore();
  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <section className="container-luxe py-16 md:py-20">
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">My Account</div>
      <h1 className="font-display text-5xl md:text-6xl mb-12">Welcome back.</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          {/* Avatar card */}
          <div className="bg-cream border border-border p-8 text-center mb-4">
            <div className="h-20 w-20 rounded-full bg-secondary border border-border mx-auto grid place-items-center mb-4">
              <User className="h-9 w-9 text-muted-foreground" />
            </div>
            <div className="font-display text-xl">Rahul Sharma</div>
            <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Member since 2023</div>
          </div>

          {/* Nav */}
          <nav className="border border-border divide-y divide-border">
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${
                    activeTab === t.id
                      ? "bg-foreground text-cream"
                      : "bg-cream hover:bg-secondary text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-[12px] tracking-[0.2em] uppercase">{t.label}</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                </button>
              );
            })}
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-cream hover:bg-secondary text-muted-foreground hover:text-maroon transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="text-[12px] tracking-[0.2em] uppercase">Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "wishlist" && (
            <div>
              <TabHeader title="My Wishlist" subtitle={`${wishlistItems.length} saved piece${wishlistItems.length !== 1 ? "s" : ""}`} />
              {wishlistItems.length === 0 ? (
                <EmptyState message="Your wishlist is empty." cta="Browse the Shop" to="/shop" />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistItems.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              )}
            </div>
          )}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </section>
  );
}

function TabHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-border pb-6 mb-8">
      <h2 className="font-display text-3xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

function EmptyState({ message, cta, to }: { message: string; cta: string; to: string }) {
  return (
    <div className="text-center py-20 border border-border">
      <p className="text-muted-foreground mb-6">{message}</p>
      <Link to={to} className="inline-block bg-foreground text-cream px-8 py-3 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
        {cta}
      </Link>
    </div>
  );
}

function ProfileTab() {
  return (
    <div>
      <TabHeader title="My Profile" subtitle="Manage your personal information" />
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Field label="First Name" value="Rahul" />
        <Field label="Last Name" value="Sharma" />
        <Field label="Email" value="rahul.sharma@email.com" />
        <Field label="Phone" value="+91 98765 43210" />
      </div>

      <div className="border-t border-border pt-8 mb-8">
        <h3 className="font-display text-xl mb-6">Saved Address</h3>
        <div className="border border-border p-6 bg-cream flex gap-4">
          <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm">Home</div>
            <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
              42, Shivaji Nagar, Pune — 411005<br />Maharashtra, India
            </div>
          </div>
        </div>
      </div>

      <button className="bg-foreground text-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
        Save Changes
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">{label}</label>
      <input
        defaultValue={value}
        className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function OrdersTab() {
  return (
    <div>
      <TabHeader title="My Orders" subtitle={`${mockOrders.length} orders placed`} />
      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="border border-border bg-cream p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="font-display text-lg">{order.id}</div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{order.date}</div>
              </div>
              <span className={`text-[10px] tracking-[0.2em] uppercase border px-3 py-1 ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {order.items.join(" · ")}
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-display text-lg">{formatINR(order.total)}</span>
              <button className="text-[11px] tracking-[0.22em] uppercase text-foreground border-b border-foreground hover:text-maroon hover:border-maroon transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <TabHeader title="Settings" subtitle="Manage your account preferences" />

      <div className="space-y-6">
        <SettingRow title="Email Notifications" desc="Receive updates on orders and new collections" defaultChecked />
        <SettingRow title="SMS Alerts" desc="Get delivery and dispatch alerts via SMS" />
        <SettingRow title="Promotional Offers" desc="Exclusive deals and seasonal collection previews" defaultChecked />
        <SettingRow title="WhatsApp Updates" desc="Order tracking and support via WhatsApp" defaultChecked />
      </div>

      <div className="border-t border-border mt-10 pt-8">
        <h3 className="font-display text-xl mb-6">Change Password</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-lg">
          <Field label="Current Password" value="" />
          <Field label="New Password" value="" />
        </div>
        <button className="mt-6 bg-foreground text-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
          Update Password
        </button>
      </div>

      <div className="border-t border-border mt-10 pt-8">
        <h3 className="font-display text-xl text-destructive mb-2">Danger Zone</h3>
        <p className="text-muted-foreground text-sm mb-5">Permanently delete your account and all associated data.</p>
        <button className="border border-destructive text-destructive px-8 py-3 text-[11px] tracking-[0.28em] uppercase hover:bg-destructive hover:text-white transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}

function SettingRow({ title, desc, defaultChecked }: { title: string; desc: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between gap-6 py-5 border-b border-border">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${on ? "bg-foreground" : "bg-border"}`}
        aria-checked={on}
        role="switch"
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
