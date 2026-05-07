import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Splash,
  head: () => ({ meta: [{ title: "ConnectApp — Stay Connected" }] }),
});

function Splash() {
  return (
    <PhoneFrame>
      <div
        className="flex-1 flex flex-col items-center justify-between px-8 pt-24 pb-10 text-center relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-6">
          <div className="h-24 w-24 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
            <Zap className="h-12 w-12 text-white" strokeWidth={2.4} />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white tracking-tight">ConnectApp</h1>
            <p className="text-white/80 mt-3 text-base max-w-xs">
              Reach anyone, anywhere — in just one tap.
            </p>
          </div>
        </div>

        <div className="relative w-full flex flex-col gap-4">
          <Button
            asChild
            className="w-full h-14 rounded-2xl text-base font-semibold bg-white text-primary hover:bg-white/95 shadow-xl"
          >
            <Link to="/register">
              Get Started <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
          <Link to="/login" className="text-sm text-white/85 hover:text-white">
            I already have an account
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
