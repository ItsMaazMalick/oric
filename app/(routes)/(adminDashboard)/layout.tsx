import Footer from "@/components/footer/Footer";
import Logout from "@/components/button/UserLogout";
import AdminMobileNavbar from "@/components/navigation/AdminMobileNavbar";
import { NavLinks } from "@/components/navigation/NavLinks";
import TooltipComponent from "@/components/tooltip/TooltipComponent";
import Link from "next/link";
import { getAdminSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { AdminLogout } from "@/components/button/AdminLogout";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session?.success) {
    redirect("/admin/login");
  }

  return (
    <div className={`w-full bg-grayBackground text-primary lg:px-28`}>
      <div className="w-full bg-primary-foreground h-[56px] mb-2 flex justify-between items-center px-2 shadow-md sticky top-0 z-50">
        {/* MOBILE NAV LINKS */}
        <div className="block md:hidden">
          {/* <MobileNavLinks /> */}
          <AdminMobileNavbar />
        </div>
        {/* HOME */}
        <Link href={"/"}>
          <div className="text-2xl font-bold">ORIC</div>
        </Link>
        {/* NAV LINKS */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* USER BUTTON */}
        <div className="flex gap-2">
          <TooltipComponent title={session.name || ""}>
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex justify-center items-center font-bold border">
              {session.name?.charAt(0)}
            </div>
          </TooltipComponent>

          <AdminLogout />
        </div>
        {/* <div className="text-primary-foreground">{name}</div> */}
        {/* <span className="text-primary-foreground">{name.slice(0, 1)}</span> */}
      </div>
      <div className="mb-10">{children}</div>
      <Footer />
    </div>
  );
}
