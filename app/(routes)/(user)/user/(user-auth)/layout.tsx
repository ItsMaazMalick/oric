import { getUserSession } from "@/lib/session";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (session?.success) {
    redirect("/user/dashboard");
  }
  return (
    <div
      className={`w-full min-h-screen bg-grayBackground text-black flex justify-center items-center p-2`}
    >
      <div className="absolute w-full h-full object-cover blur-sm">
        <Image src={"/images/aiou-bg.jpg"} alt="ORIC" fill />
      </div>
      <div className="z-50 lg:w-full">{children}</div>
    </div>
  );
}
