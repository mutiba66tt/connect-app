import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Create account" }] }),
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
    toast.success("Account created!");
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="flex-1 px-7 py-10 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create account</h1>
          <p className="text-muted-foreground mt-1">Join us in a few seconds</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 flex-1">
          <Field icon={<User className="h-4 w-4" />} label="Full name">
            <Input required value={form.name} onChange={onChange("name")} placeholder="Jane Doe" className="rounded-2xl h-12 pl-10" />
          </Field>
          <Field icon={<Mail className="h-4 w-4" />} label="Email">
            <Input type="email" required value={form.email} onChange={onChange("email")} placeholder="you@example.com" className="rounded-2xl h-12 pl-10" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Password">
            <Input type="password" required value={form.password} onChange={onChange("password")} placeholder="••••••••" className="rounded-2xl h-12 pl-10" />
          </Field>
          <Field icon={<ShieldCheck className="h-4 w-4" />} label="Confirm password">
            <Input type="password" required value={form.confirm} onChange={onChange("confirm")} placeholder="••••••••" className="rounded-2xl h-12 pl-10" />
          </Field>

          <Button type="submit" className="w-full h-12 rounded-2xl text-base font-semibold mt-4" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </PhoneFrame>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}
