import UserLoginForm from "@/components/auth/UserLoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-primary-foreground p-6 ring-1 ring-primary rounded-lg shadow-lg">
      <UserLoginForm />
    </div>
  );
};

export default LoginPage;
