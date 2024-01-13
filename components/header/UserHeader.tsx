import { siteTitle } from "@/constants/basicInfo";
import { userVerify } from "@/lib/verify";
import { cookies } from "next/headers";
import Image from "next/image";
import UserLogout from "../logout/UserLogout";
import TooltipComponent from "../tooltip/TooltipComponent";

export default async function UserHeader() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const user = await userVerify(userCookie);
  return (
    <>
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
      </div>
      <div className="w-full h-14 flex justify-between items-center bg-primary text-primary-foreground rounded-full font-bold px-4">
        <div className="flex items-center gap-2">
          <TooltipComponent title={user?.name.toUpperCase() || "UNKNOWN"}>
            <div className="p-1 bg-primary-foreground rounded-full">
              <Image
                src="/images/user-icon.png"
                alt=""
                width={30}
                height={30}
              />
            </div>
          </TooltipComponent>
          <div className="hidden sm:inline uppercase">{user?.name}</div>
        </div>
        <div className="">
          <UserLogout />
        </div>
      </div>
    </>
  );
}
