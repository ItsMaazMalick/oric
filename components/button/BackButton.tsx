"use client";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import TooltipComponent from "../tooltip/TooltipComponent";

const BackButton = () => {
  const router = useRouter();
  return (
    <TooltipComponent title="Back">
      <div
        onClick={router.back}
        className="text-2xl text-gray-300 hover:text-primary-foreground hover:text-3xl transition-all duration-300"
      >
        <BsFillArrowLeftCircleFill />
      </div>
    </TooltipComponent>
  );
};

export default BackButton;
