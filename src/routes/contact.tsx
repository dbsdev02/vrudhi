import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — VRUDHI IMPEX Atelier" },
      { name: "description", content: "Visit our Jaipur atelier or speak with our wedding concierge." },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <section className="bg-cream py-20 md:py-28 text-center">
        <div className="container-luxe">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Be in touch</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">A note to the atelier</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Whether for a private appointment, a custom commission or simply a conversation —
            we would be honoured to hear from you.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 grid lg:grid-cols-[1fr_1.2fr] gap-16">
        <div className="space-y-10">
          {[
            [MapPin, "Visit", "27 Heritage Lane\nJaipur 302001, India"],
            [Phone, "Call", "+91 98 1234 5678\nMon — Sat · 10am to 7pm IST"],
            [Mail, "Write", "atelier@vrudhiimpex.com\nconcierge@vrudhiimpex.com"],
          ].map(([Icon, t, body]) => {
            const I = Icon as any;
            return (
              <div key={t as string} className="flex gap-5">
                <div className="h-12 w-12 grid place-items-center border border-gold text-gold shrink-0"><I className="h-5 w-5" /></div>
                <div>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-foreground">{t as string}</div>
                  <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{body as string}</p>
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); toast("Thank you — our concierge will be in touch."); (e.target as HTMLFormElement).reset(); }}
          className="bg-cream border border-border p-8 md:p-12 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="First Name" name="first" />
            <Field label="Last Name" name="last" />
          </div>
          <Field label="Email" name="email" type="email" />
          <Field label="Wedding Date (optional)" name="date" type="date" />
          <div>
            <label className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">Your Message</label>
            <textarea required rows={5} name="msg" className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-sm resize-none" />
          </div>
          <button className="w-full bg-foreground text-cream py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-maroon transition-colors">
            Send to the Atelier
          </button>
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">{label}</label>
      <input required={type !== "date"} type={type} name={name} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-sm" />
    </div>
  );
}
