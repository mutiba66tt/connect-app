import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Phone, Map, MessageCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({ meta: [{ title: "Home" }] }),
});

function Home() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col">
        <div className="px-7 pt-12 pb-10 text-white" style={{ background: "var(--gradient-primary)" }}>
          <p className="text-white/80 text-sm">Hello,</p>
          <h1 className="text-3xl font-bold mt-1">Welcome back 👋</h1>
          <p className="text-white/80 mt-2 text-sm">What would you like to do today?</p>
        </div>

        <div className="px-7 -mt-6">
          <div className="grid grid-cols-3 gap-3">
            <ActionCard icon={<Phone className="h-6 w-6" />} label="Call" />
            <ActionCard icon={<Map className="h-6 w-6" />} label="Map" />
            <ActionCard icon={<MessageCircle className="h-6 w-6" />} label="Message" />
          </div>
        </div>

        <div className="px-7 mt-8 flex-1">
          <h2 className="text-lg font-semibold mb-3">Recent activity</h2>
          <div className="space-y-3">
            {["Coffee with Alex", "Trip to downtown", "Team sync"].map((t) => (
              <div key={t} className="rounded-2xl bg-secondary p-4 flex items-center justify-between">
                <span className="font-medium text-secondary-foreground">{t}</span>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-7">
          <Button
            onClick={() => navigate({ to: "/login" })}
            variant="outline"
            className="w-full h-12 rounded-2xl border-2"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ActionCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="rounded-2xl bg-card p-4 flex flex-col items-center gap-2 shadow-md hover:scale-105 transition-transform" style={{ boxShadow: "var(--shadow-soft)" }}>
      <span className="h-12 w-12 rounded-2xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        {icon}
      </span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </button>
  );
}
