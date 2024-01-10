import Logout from "@/components/logout/UserLogout";
import { NavLinks } from "@/components/navigation/NavLinks";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full text-primary mb-4">
      {/* ...................... */}
      <div className="flex justify-start items-center  gap-10 p-2 border-b-2">
        <div className="w-[10%]">
          <div className="relative w-16 h-14 md:w-24 md:h-20">
            <Image src={"/images/site-logo.png"} alt="ORIC" fill />
          </div>
        </div>
        <div className="w-[80%]">
          <h1 className="font-bold lg:text-2xl text-secondary">
            Office of Research, Innovation and Commercialization
          </h1>
        </div>
        {/* <div className="hidden sm:block">
          <Logout />
        </div> */}
      </div>
      {/* <EditUserProfile /> */}
      {/* DASHBOARD */}
      <div className="relative w-[100%] h-[310px] sm:h-[340px] lg:h-[373px]">
        <Image
          src={"/images/aiou-bg.jpg"}
          alt="ORIC"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
