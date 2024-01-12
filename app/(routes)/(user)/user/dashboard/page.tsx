import EditUserProfileButton from "@/components/button/EditUserProfileButton";
import UserBooksCard from "@/components/cards/UserBooksCard";
import Logout from "@/components/logout/UserLogout";
import { Button } from "@/components/ui/button";
import { siteTitle } from "@/constants/basicInfo";
import { formTitles } from "@/constants/data";
import { userVerify } from "@/lib/verify";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserDashboard = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const user = await userVerify(userCookie);
  if (!user) {
    redirect("/user/login");
  }

  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/user/records/all-records/lengths/${user.id}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookie}`,
      },
    }
  );
  const { lengths } = await res.json();
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
          <h1 className="font-bold lg:text-2xl text-secondary">{siteTitle}</h1>
        </div>
        <div className="hidden sm:block">
          <Logout />
        </div>
      </div>
      {/* <EditUserProfile /> */}
      {/* TOP HEADER */}
      <div className="w-full h-14  bg-primary text-primary-foreground rounded-full flex justify-between sm:justify-center items-center px-4 sm:px-10 font-bold">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-primary-foreground rounded-full">
            <Image src="/images/user-icon.png" alt="" width={30} height={30} />
          </div>
          {/* <span className="p-2 text-primary bg-primary-foreground rounded-full">
            <User2 />
          </span> */}
          <div className="uppercase">{user?.name}</div>
        </div>
        <div className="block sm:hidden">
          <Logout />
        </div>
      </div>
      {/* DASHBOARD */}
      <div className="w-full h-16 mt-2 flex justify-between items-center px-4 sm:px-10 font-bold">
        <div className="flex items-center gap-2">Dashboard</div>
        <div className="flex gap-4">
          <div className="hidden sm:flex">
            <EditUserProfileButton />
          </div>
          <Link href={"/user/dashboard/add-record"}>
            <Button variant={"secondary"}>Add Record</Button>
          </Link>
        </div>
      </div>
      {/* CARDS */}
      {/* <div className="mt-4 w-full flex flex-col gap-4 p-3"> */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 p-4">
        {formTitles.map((title, index) => (
          <UserBooksCard key={index} title={title} total={lengths[index]} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
