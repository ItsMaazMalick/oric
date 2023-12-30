import UserLoginForm from "@/components/auth/UserLoginForm";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = () => {
  // const session = await getUserSession();
  // if (session?.success) {
  //   redirect("/user/dashboard");
  // }
  // const cookieStore = cookies();
  // const userCookie = cookieStore.get("auth-token")?.value || "";
  // // Make a fetch request to your API route
  // const res = await fetch(`${process.env.PUBLIC_URL}/api/user/middleware`, {
  //   cache: "no-store",
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${userCookie}`,
  //   },
  // });
  // const data = await res.json();
  // console.log(data);
  // if (data.success) {
  //   redirect("/user/dashboard");
  // }
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6 mx-auto">
      <div className="lg:px-10">
        <UserLoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
