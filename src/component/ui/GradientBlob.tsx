import { cn } from "@/lib/utils";
interface GradientBlobProps {
  className?: string;
}

export const GradientBlob = ({ className }: GradientBlobProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute left-1/2 top-0 z-0",
      "-translate-x-1/2",
      " w-full",
      "h-[20rem]",
      "rounded-[50%] opacity-85",
      "opacity-60",
      className,
    )}
    style={{
      background:
        "radial-gradient(ellipse at 50% 0%, #a78bfa 0%, #c4b5fd 40%, #e0d9fc 70%, transparent 100%)",
    }}
  />
);
