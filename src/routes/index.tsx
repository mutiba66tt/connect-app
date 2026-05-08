import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/")({
  component: Splash,
  head: () => ({ meta: [{ title: "ConnectApp — Stay Connected" }] }),
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) navigate({ to: "/home" });
    });
    return unsub;
  }, [navigate]);

  return (
    <PhoneFrame>
      <div
        className="flex-1 flex flex-col items-center justify-between px-8 pt-20 pb-10 text-center relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-7">
          <div className="relative">
            <span className="absolute inset-0 rounded-[2rem] bg-white/30 animate-ring-pulse" />
            <span className="absolute inset-0 rounded-[2rem] bg-white/20 animate-ring-pulse" style={{ animationDelay: "0.8s" }} />
            <div className="relative animate-logo-pop">
              <div className="animate-logo-float">
                <Logo size={104} className="rounded-[2rem]" />
              </div>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Connect<span className="text-white/80">App</span>
            </h1>
            <p className="text-white/85 mt-4 text-base max-w-xs leading-relaxed">
              Reach anyone, anywhere — in just one tap.
            </p>
          </div>
        </div>

        <div className="relative w-full flex flex-col gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <Button
            asChild
            className="w-full h-14 rounded-2xl text-base font-semibold bg-white text-primary hover:bg-white/95 shadow-2xl"
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
