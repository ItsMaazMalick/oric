"use client";
import Link from "next/link";
import BackButton from "./BackButton";
import { Button } from "../ui/button";

const EditUserProfileButton = () => {
  return (
    <Link href={"/user/dashboard/edit-profile"}>
      <Button variant={"outline"}>Edit Profile</Button>
    </Link>
  );
};

export default EditUserProfileButton;