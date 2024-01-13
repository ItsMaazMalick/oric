"use client";
import { Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import TooltipComponent from "../tooltip/TooltipComponent";

const BackButton = () => {
  const router = useRouter();
  return (
    <TooltipComponent title="Back">
      <div
        onClick={router.back}
        className="p-2 bg-primary hover:bg-secondary text-primary-foreground rounded-lg"
      >
        <Undo />
      </div>
    </TooltipComponent>
  );
};

export default BackButton;
