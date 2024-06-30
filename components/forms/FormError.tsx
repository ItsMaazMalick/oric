import { cn } from "@/lib/utils";
import { BadgeX } from "lucide-react";

export function FormError({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full bg-destructive/50 text-destructive font-semibold text-sm p-2 rounded-md flex items-center gap-2",
          className
        )}
      >
        <BadgeX size={16} />
        <span>{message}</span>
      </div>
    </>
  );
}
