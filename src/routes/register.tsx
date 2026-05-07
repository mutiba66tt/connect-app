import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Create account — ConnectApp" }] }),
});

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Welcome to ConnectApp!");
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col">
        <div
          className="px-7 pt-14 pb-12 text-white relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.4} />
            </div>
            <span className="text-lg font-semibold tracking-tight">ConnectApp</span>
          </div>
          <h1 className="text-3xl font-bold mt-6 tracking-tight">Create account</h1>
          <p className="text-white/80 mt-1.5 text-sm">Join the network. Stay connected.</p>
        </div>

        <div className="px-7 pt-7 pb-8 flex-1 flex flex-col">
          <form onSubmit={onSubmit} className="space-y-4 flex-1">
            <Field icon={<User className="h-4 w-4" />} label="Full name">
              <Input required value={form.name} onChange={onChange("name")} placeholder="Jane Doe" className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card" />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <Input type="email" required value={form.email} onChange={onChange("email")} placeholder="you@example.com" className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card" />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <Input type="password" required value={form.password} onChange={onChange("password")} placeholder="••••••••" className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card" />
            </Field>
            <Field icon={<ShieldCheck className="h-4 w-4" />} label="Confirm password">
              <Input type="password" required value={form.confirm} onChange={onChange("confirm")} placeholder="••••••••" className="rounded-2xl h-12 pl-10 bg-secondary/60 border-transparent focus-visible:bg-card" />
            </Field>

            <Button
              type="submit"
              className="w-full h-13 py-4 rounded-2xl text-base font-semibold mt-3 text-white"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}
