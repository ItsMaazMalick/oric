import { getUserSession } from "@/app/actions/session";
import Footer from "@/components/footer/Footer";
import UserHeader from "@/components/header/UserHeader";

import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session?.success) {
    redirect("/user/login");
  }

  return (
    <div className={`w-full bg-grayBackground text-primary lg:px-28 shrink`}>
      <UserHeader />
      <div className="mb-10">{children}</div>
      <Footer />
    </div>
  );
}
