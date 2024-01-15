import Link from "next/link";
import { Button } from "../ui/button";
import AnimatedButton from "./AnimatedButton";

const EditUserProfileButton = () => {
  return (
    <Link href={"/user/dashboard/edit-profile"}>
      <AnimatedButton variant={"outline"}>Edit Profile</AnimatedButton>
    </Link>
  );
};

export default EditUserProfileButton;
