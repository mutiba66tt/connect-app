import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6"
      style={{ background: "var(--gradient-soft)" }}
    >
      <div className="w-full max-w-md min-h-screen sm:min-h-[860px] sm:max-h-[920px] sm:rounded-[2.75rem] bg-card sm:shadow-2xl overflow-hidden relative flex flex-col sm:border sm:border-white/60">
        {children}
      </div>
    </div>
  );
}
