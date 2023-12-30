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

const BackButton = () => {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={router.back}
            className="text-2xl text-gray-300 hover:text-primary-foreground hover:text-3xl transition-all duration-300"
          >
            <BsFillArrowLeftCircleFill />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {/* <p>Go to {desc}</p> */}
          <p>Back</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BackButton;
