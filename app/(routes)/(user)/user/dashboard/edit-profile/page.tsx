import EditUserProfileForm from "@/components/auth/EditUserProfileForm";
import BackButton from "@/components/button/BackButton";
import Logout from "@/components/logout/UserLogout";
import { getUserSession } from "@/lib/session";
import { userVerify } from "@/lib/verify";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

const EditProfile = async () => {
  const session = await getUserSession();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const user = await userVerify(userCookie);
  // const res = await fetch(`${process.env.PUBLIC_URL}/api/user/${session.id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${userCookie}`,
  //   },
  // });
  // const { user } = await res.json();

  return (
    <div className="w-full text-primary mb-4">
      {/* <EditUserProfile /> */}
      {/* TOP HEADER */}
      <div className="mt-4 ml-4">
        <BackButton />
      </div>
      {/* DATA */}
      <EditUserProfileForm user={user} />
    </div>
  );
};

export default EditProfile;
