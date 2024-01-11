import { ArrowRight, ArrowUpRightSquare, Building } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Departments = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="w-full p-2 bg-primary-foreground shadow-lg hover:scale-105 duration-300 rounded-md">
      <div className="flex justify-center items-center gap-2 p-2">
        <div className="w-1/4">
          <div className="w-full flex justify-center items-center bg-primary opacity-80 text-secondary-foreground py-4 rounded-lg">
            <Building size={34} />
          </div>
        </div>
        <div className="w-3/4">
          <h3 className="font-medium">
            <Link href={href}>{title}</Link>
          </h3>
          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="font-bold" href={href}>
                    <ArrowUpRightSquare />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show Detail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
