import UserRegisterForm from "@/components/auth/UserRegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const RegisterPage = () => {
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
    <div className="bg-primary-foreground p-6 rounded-lg shadow-lg">
      <UserRegisterForm />
    </div>
  );
};

export default RegisterPage;
