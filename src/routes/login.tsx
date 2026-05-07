import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login" }] }),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="flex-1 px-7 py-10 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 flex-1">
          <Field icon={<Mail className="h-4 w-4" />} label="Email">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-2xl h-12 pl-10" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Password">
            <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="rounded-2xl h-12 pl-10" />
          </Field>

          <Button type="submit" className="w-full h-12 rounded-2xl text-base font-semibold mt-4" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">Sign up</Link>
        </p>
      </div>
    </PhoneFrame>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}
