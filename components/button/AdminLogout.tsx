import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import AnimatedButton from "./AnimatedButton";

export function AdminLogout() {
  const handleLogout = async () => {
    "use server";
    cookies()?.set("admin-auth-token", "", { expires: new Date(0) });
    redirect("/admin/login");
  };
  return (
    <form action={handleLogout}>
      <AnimatedButton variant={"destructive"}>Logout</AnimatedButton>
    </form>
  );
}
