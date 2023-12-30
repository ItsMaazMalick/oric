import EditUserProfileForm from "@/components/auth/EditUserProfileForm";
import Logout from "@/components/logout/UserLogout";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

const EditProfile = async () => {
  const session = await getUserSession();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const res = await fetch(`${process.env.PUBLIC_URL}/api/user/${session.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userCookie}`,
    },
  });
  const { user } = await res.json();

  return (
    <div className="w-full text-primary mb-4">
      <div className="w-full h-5 bg-primary border-b-2 border-primary-foreground mb-2" />
      <div className="flex justify-start items-center  gap-10 p-2">
        <div className="w-[10%]">
          <div className="relative w-16 h-14 md:w-24 md:h-20">
            <Image src={"/images/site-logo.png"} alt="ORIC" fill />
          </div>
        </div>
        <div className="w-[80%]">
          <h1 className="font-bold lg:text-2xl text-secondary">
            Office of Research, Innovation and Commercialization
          </h1>
        </div>
        <div className="hidden sm:block">
          <Logout />
        </div>
      </div>
      {/* <EditUserProfile /> */}
      {/* TOP HEADER */}
      <div className="w-full h-14  bg-primary text-primary-foreground rounded-full flex justify-between sm:justify-center items-center px-4 sm:px-10 font-bold">
        <h2 className="text-gray-300">
          Wellcome back!&nbsp;
          <span className="font-bold uppercase text-primary-foreground">
            {user.name}
          </span>
        </h2>
        <div className="block sm:hidden">
          <Logout />
        </div>
      </div>
      {/* DATA */}
      <EditUserProfileForm user={user} />
    </div>
  );
};

export default EditProfile;
