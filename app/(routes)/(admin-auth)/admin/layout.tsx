import { getAdminSession, getUserSession } from "@/app/actions/session";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (session?.success) {
    redirect("/dashboard");
  }
  return (
    <div
      className={`w-full min-h-screen bg-grayBackground text-black flex justify-center items-center p-2`}
    >
      <div className="absolute object-cover w-full h-full blur-sm">
        <Image src={"/images/aiou-bg.jpg"} alt="ORIC" fill />
      </div>
      <div className="z-50 w-full">{children}</div>
    </div>
  );
}
