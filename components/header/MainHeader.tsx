import { contactNumber, siteTitle } from "@/constants/basicInfo";
import { Phone } from "lucide-react";
import React from "react";
import MainNavbar from "../navigation/MainNavbar";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const MainHeader = () => {
  return (
    <>
      <div className="w-full h-8 bg-secondary flex items-center justify-center text-secondary-foreground gap-2">
        <Phone size={20} />
        {contactNumber}
      </div>
      <div className="my-4 px-2 lg:px-36 flex justify-between items-center">
        <div className="w-1/4">
          <div className="relative lg:w-24 h-20">
            <Image src={"/images/site-logo.png"} alt="AIOU ORIC" fill />
          </div>
        </div>
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-secondary">{siteTitle}</h2>
        </div>
      </div>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center  w-full h-12 bg-primary text-gray-400  px-2 lg:px-36 font-medium text-lg">
        <MainNavbar />
        <div className="flex gap-4">
          {/* USER LOGIN BUTTON */}
          <Link href="/user/login">
            <Button className="bg-destructive hover:bg-accent hover:text-accent-foreground">
              User Login
            </Button>
          </Link>
          {/* ADMIN LOGIN BUTTON */}
          <Link href="/admin/login">
            <Button className="bg-destructive hover:bg-accent hover:text-accent-foreground">
              Admin Login
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
