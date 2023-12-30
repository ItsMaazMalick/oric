"use client";
import { faculties } from "@/constants/data";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNavLinks = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div onClick={() => setShow((prev) => !prev)}>
        {show ? <X /> : <Menu />}
      </div>
      {/* MENU */}
      {show && (
        <div className="w-full h-[calc(100vh - 3.5rem)] absolute top-14 left-0 bg-secondary p-2 bg-opacity-100 text-secondary-foreground rounded-2xl">
          <div className="w-full h-full my-10 flex flex-col justify-center items-center">
            <Link href={"/"}>Home</Link>
            <div className="w-full text-center">
              <ul>
                {faculties.map((faculty) => (
                  <Link
                    onClick={() => setShow(false)}
                    key={faculty.id}
                    href={`/dashboard/${faculty.href}`}
                  >
                    <li className="space-y-10 mt-10">{faculty.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavLinks;
