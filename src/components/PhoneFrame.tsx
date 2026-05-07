import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "var(--gradient-soft)" }}>
      <div className="w-full max-w-md min-h-screen sm:min-h-[90vh] sm:my-8 sm:rounded-[2.5rem] bg-card sm:shadow-2xl overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
