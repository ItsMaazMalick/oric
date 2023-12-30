"use client";
import Link from "next/link";
import React from "react";
import Logout from "../logout/UserLogout";
import BackButton from "../button/BackButton";

const EditUserProfile = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center bg-primary border-b-2 border-t-2 border-primary-foreground mb-2 text-primary-foreground p-2 rounded-full">
      <Link href={"/user/dashboard/edit-profile"}>
        <h2 className="ml-4 font-bold underline hover:scale-105">
          Edit User Profile
        </h2>
      </Link>
      <div className="flex mr-2">
        <BackButton />
      </div>
    </div>
  );
};

export default EditUserProfile;
