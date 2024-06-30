import { cn } from "@/lib/utils";
import { BadgeCheck, LucideTerminalSquare } from "lucide-react";

export function FormSuccess({
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
          "w-full bg-emerald-500/50 text-emerald-500 font-semibold text-sm p-2 rounded-md flex items-center gap-2",
          className
        )}
      >
        <BadgeCheck size={16} />
        <span>{message}</span>
      </div>
    </>
  );
}
