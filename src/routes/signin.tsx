import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import logo from "@/assets/PISTA Vrudhi Fashion.pdf.png";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
  head: () => ({ meta: [{ title: "Sign In — Vrudhi Fashion" }] }),
});

function SignInPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-foreground p-14">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
        </div>
        <div className="relative">
          <Link to="/">
            <img src={logo} alt="Vrudhi Fashion" className="h-16 w-auto object-contain" />
          </Link>
        </div>
        <div className="relative">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Crafting Elegance Since 2009</div>
          <blockquote className="font-display text-4xl text-cream leading-[1.1]">
            Every groom deserves to walk into forever looking like royalty.
          </blockquote>
          <div className="mt-8 flex gap-3">
            {["Dulha Mala", "Brooches", "Safas", "Cufflinks"].map(t => (
              <span key={t} className="border border-cream/20 text-cream/60 px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative text-[11px] tracking-[0.2em] uppercase text-cream/40">
          Mumbai · Dadar West · 400028
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-20 bg-background">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <Link to="/">
            <img src={logo} alt="Vrudhi Fashion" className="h-14 w-auto object-contain mx-auto" />
          </Link>
        </div>

        {/* Tab switcher */}
        <div className="flex border border-border mb-10 max-w-sm">
          {(["signin", "signup"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[11px] tracking-[0.28em] uppercase transition-colors ${
                tab === t ? "bg-foreground text-cream" : "bg-cream text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {tab === "signin" ? <SignInForm /> : <SignUpForm onSuccess={() => setTab("signin")} />}

        <p className="mt-10 text-xs text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-foreground">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer hover:text-foreground">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

function SignInForm() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/account" });
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Welcome back</div>
        <h1 className="font-display text-4xl">Sign in to your account</h1>
      </div>

      <InputField label="Email Address" type="email" icon={<Mail className="h-4 w-4" />} placeholder="you@example.com" required />
      <InputField
        label="Password"
        type={show ? "text" : "password"}
        icon={<Lock className="h-4 w-4" />}
        placeholder="Your password"
        required
        suffix={
          <button type="button" onClick={() => setShow(v => !v)} className="text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex justify-end">
        <button type="button" className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-maroon transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-foreground text-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
      >
        {loading ? "Signing in…" : <>Sign In <ArrowRight className="h-4 w-4" /></>}
      </button>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button
        type="button"
        className="w-full border border-border bg-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:border-gold transition-colors flex items-center justify-center gap-3"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Join us</div>
        <h1 className="font-display text-4xl">Create your account</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField label="First Name" type="text" icon={<User className="h-4 w-4" />} placeholder="Rahul" required />
        <InputField label="Last Name" type="text" icon={<User className="h-4 w-4" />} placeholder="Sharma" required />
      </div>
      <InputField label="Email Address" type="email" icon={<Mail className="h-4 w-4" />} placeholder="you@example.com" required />
      <InputField label="Phone Number" type="tel" icon={<Phone className="h-4 w-4" />} placeholder="+91 98765 43210" required />
      <InputField
        label="Password"
        type={show ? "text" : "password"}
        icon={<Lock className="h-4 w-4" />}
        placeholder="Min. 8 characters"
        required
        suffix={
          <button type="button" onClick={() => setShow(v => !v)} className="text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" required className="mt-0.5 accent-current" />
        <span className="text-xs text-muted-foreground leading-relaxed">
          I agree to receive order updates and exclusive offers from Vrudhi Fashion.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-foreground text-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
      >
        {loading ? "Creating account…" : <>Create Account <ArrowRight className="h-4 w-4" /></>}
      </button>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button
        type="button"
        className="w-full border border-border bg-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:border-gold transition-colors flex items-center justify-center gap-3"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </form>
  );
}

function InputField({
  label, type, icon, placeholder, required, suffix,
}: {
  label: string; type: string; icon: React.ReactNode;
  placeholder?: string; required?: boolean; suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">{label}</label>
      <div className="flex items-center border border-border bg-cream focus-within:border-gold transition-colors px-4 gap-3">
        <span className="text-muted-foreground shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className="flex-1 bg-transparent py-3 text-sm focus:outline-none placeholder:text-muted-foreground/60"
        />
        {suffix && <span className="shrink-0">{suffix}</span>}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
