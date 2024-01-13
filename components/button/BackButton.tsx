"use client";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import TooltipComponent from "../tooltip/TooltipComponent";
import { Button } from "../ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <TooltipComponent title="Back">
      <div
        onClick={router.back}
        className="p-2 bg-primary hover:bg-secondary text-primary-foreground rounded-lg"
      >
        <RotateCcw />
      </div>
    </TooltipComponent>
  );
};

export default BackButton;
