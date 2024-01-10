import { portfolioLink } from "@/constants/socialLinks";
import Link from "next/link";
import SocialCards from "../socialCards/SocialCards";

const Footer = () => {
  return (
    <div className="w-full bg-secondary text-gray-300 flex flex-col lg:flex-row justify-center lg:justify-between items-center text-xs sm:text-base p-2 lg:p-4 ring-1">
      <p className="p-2 text-sm text-center">
        &copy; {new Date().getFullYear()} ORIC. All rights reserved.&nbsp;
      </p>
      <div className="p-2 text-2xl flex gap-4">
        <SocialCards />
      </div>
      <p className="p-2 text-sm text-center">
        Developed by
        <Link
          className="ml-2 text-white hover:underline transition-all duration-300 italic"
          href={portfolioLink}
          target="_blank"
        >
          Department of Computer Science AIOU
        </Link>
      </p>
    </div>
  );
};

export default Footer;
