import { socialLinks } from "@/constants/socialLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-primary-foreground text-primary flex flex-col lg:flex-row justify-center lg:justify-between items-center text-xs sm:text-base p-2 lg:p-4 ring-1">
      <p className="p-2 text-sm text-center">
        &copy; 2023 ORIC. All rights reserved.&nbsp;
      </p>
      <div className="p-2 text-2xl flex gap-4">
        {socialLinks.map((social) => (
          <Link
            key={social.id}
            className="text-gray-400 rounded-md transition-all duration-300 hover:scale-125"
            href={social.url}
            target="_blank"
          >
            <Image src={social.image} alt={social.alt} width={30} height={30} />
          </Link>
        ))}
      </div>
      <p className="p-2 text-sm text-center">
        Developed by&nbsp;
        <Link
          className="text-black hover:underline transition-all duration-300"
          href={"https://maazmalick.vercel.app"}
          target="_blank"
        >
          Department of Computer Science AIOU
        </Link>
      </p>
    </div>
  );
};

export default Footer;
