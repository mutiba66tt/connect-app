import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Splash,
  head: () => ({ meta: [{ title: "Welcome" }] }),
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center" style={{ background: "var(--gradient-primary)" }}>
        <div className="h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
          <Sparkles className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Lumi</h1>
        <p className="text-white/80">Connect. Explore. Chat.</p>
        <Link to="/login" className="absolute bottom-10 text-sm text-white/70 underline-offset-4 hover:underline">Skip</Link>
      </div>
    </PhoneFrame>
  );
}
