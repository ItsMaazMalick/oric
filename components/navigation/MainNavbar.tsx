"use client";
import { navLinks } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavbar = () => {
  const pathName = usePathname();

  return (
    <div className="hidden md:flex gap-10">
      {navLinks.map((links) => (
        <Link
          className={`hover:text-primary-foreground ${
            pathName === links.href ? "text-primary-foreground" : ""
          } transition-all duration-300`}
          key={links.id}
          href={links.href}
        >
          {links.title}
        </Link>
      ))}
    </div>
  );
};

export default MainNavbar;
