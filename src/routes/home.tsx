import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, MessageCircle, LogOut, ShieldAlert, Headphones, ChevronRight } from "lucide-react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({ meta: [{ title: "Home — ConnectApp" }] }),
});

const SUPPORT_PHONE = "+18005551234";
const SUPPORT_LOCATION = "ConnectApp HQ";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) navigate({ to: "/login" });
    });
    return unsub;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out");
      navigate({ to: "/login" });
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Welcome";
  const initials = (user?.displayName || user?.email || "U")
    .split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");

  const handleCall = () => { window.location.href = `tel:${SUPPORT_PHONE}`; };
  const handleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SUPPORT_LOCATION)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleMessage = () => { window.location.href = `sms:${SUPPORT_PHONE}`; };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col bg-background">
        {/* Hero */}
        <div
          className="px-7 pt-12 pb-20 text-white relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/75 text-xs uppercase tracking-widest">ConnectApp</p>
              <p className="text-white/85 text-sm mt-2">Good to see you,</p>
              <h1 className="text-3xl font-bold mt-0.5 tracking-tight">Jane Doe</h1>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-base font-semibold">
              JD
            </div>
          </div>
        </div>

        {/* Welcome card */}
        <div className="px-6 -mt-12 relative z-10">
          <div
            className="rounded-3xl p-5 border border-white/40"
            style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-elegant)" }}
          >
            <p className="text-sm text-muted-foreground">Today's tip</p>
            <p className="text-base font-semibold text-foreground mt-1 leading-snug">
              Stay connected with your team — one tap is all it takes.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-6 mt-7">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base font-semibold text-foreground">Quick actions</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ActionCard icon={<Phone className="h-5 w-5" />} label="Call" desc="Talk now" onClick={handleCall} />
            <ActionCard icon={<MapPin className="h-5 w-5" />} label="Map" desc="Find us" onClick={handleMap} />
            <ActionCard icon={<MessageCircle className="h-5 w-5" />} label="Message" desc="Send SMS" onClick={handleMessage} />
          </div>
        </div>

        {/* Emergency / Support */}
        <div className="px-6 mt-7 flex-1">
          <h2 className="text-base font-semibold text-foreground mb-3.5">Need help?</h2>
          <div className="space-y-3">
            <SupportRow
              icon={<ShieldAlert className="h-5 w-5" />}
              title="Emergency contact"
              subtitle="24/7 priority line"
              tone="danger"
              onClick={handleCall}
            />
            <SupportRow
              icon={<Headphones className="h-5 w-5" />}
              title="Customer support"
              subtitle="Avg. reply in 2 min"
              tone="primary"
              onClick={handleMessage}
            />
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 pt-8">
          <Button
            onClick={() => navigate({ to: "/login" })}
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 border-border hover:bg-secondary"
          >
            <LogOut className="h-4 w-4 mr-2" /> Log out
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ActionCard({
  icon, label, desc, onClick,
}: { icon: React.ReactNode; label: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-3.5 flex flex-col items-center gap-2 text-center transition-all active:scale-95 hover:-translate-y-0.5"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <span
        className="h-11 w-11 rounded-xl flex items-center justify-center text-white"
        style={{ background: "var(--gradient-primary)" }}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground -mt-1">{desc}</span>
    </button>
  );
}

function SupportRow({
  icon, title, subtitle, tone, onClick,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
  tone: "primary" | "danger"; onClick: () => void;
}) {
  const iconBg =
    tone === "danger"
      ? "bg-destructive/10 text-destructive"
      : "bg-primary/10 text-primary";
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl bg-card border border-border p-4 flex items-center gap-4 text-left transition-all hover:border-primary/30 active:scale-[0.99]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <span className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
