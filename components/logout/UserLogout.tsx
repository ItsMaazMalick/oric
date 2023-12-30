"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "../ui/use-toast";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    toast({ variant: "default", title: "Please wait..." });
    const res = await fetch(`/api/user/logout`, { cache: "no-store" });
    if (res.ok) {
      router.refresh();
      router.push("/user/login");
      toast({ variant: "success", title: "Successfully logged out" });
    } else {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  return (
    <Link href={"/user/login"}>
      <Button onClick={handleLogout} variant={"destructive"}>
        Logout
      </Button>
    </Link>
  );
};

export default Logout;
