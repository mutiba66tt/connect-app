import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo}
      alt="ConnectApp logo"
      width={size}
      height={size}
      className={cn("object-contain drop-shadow-xl", className)}
      style={{ width: size, height: size }}
    />
  );
}
