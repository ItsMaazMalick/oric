import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function UserLogout() {
  const handleLogout = async () => {
    "use server";
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    redirect("/user/login");
  };
  return (
    <form action={handleLogout}>
      <Button type="submit" variant={"destructive"}>
        Logout
      </Button>
    </form>
  );
}
