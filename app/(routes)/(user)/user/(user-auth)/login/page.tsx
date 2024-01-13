import UserLoginForm from "@/components/auth/UserLoginForm";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { register: string };
}) => {
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6 mx-auto">
      <div className="lg:px-10">
        <UserLoginForm register={searchParams?.register} />
      </div>
    </div>
  );
};

export default LoginPage;
