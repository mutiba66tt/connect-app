import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { firebaseErrorMessage } from "@/lib/auth-errors";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — ConnectApp" }] }),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate({ to: "/home" });
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      toast.error(firebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col">
        <div
          className="px-7 pt-14 pb-14 text-white relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="relative flex items-center gap-3 animate-fade-up">
            <Logo size={44} className="rounded-xl" />
            <span className="text-lg font-semibold tracking-tight">ConnectApp</span>
          </div>
          <h1 className="text-3xl font-bold mt-7 tracking-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>Welcome back</h1>
          <p className="text-white/80 mt-1.5 text-sm animate-fade-up" style={{ animationDelay: "0.15s" }}>Sign in to continue to your account</p>
        </div>

        <div className="px-7 pt-7 pb-8 flex-1 flex flex-col -mt-6 bg-card rounded-t-[2rem] relative z-10 shadow-[0_-12px_40px_-20px_rgba(67,56,202,0.25)]">
          <form onSubmit={onSubmit} className="space-y-5 flex-1">
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card"
              />
            </Field>

            <div className="flex justify-end -mt-1">
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-13 py-4 rounded-2xl text-base font-semibold mt-2 text-white"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}
