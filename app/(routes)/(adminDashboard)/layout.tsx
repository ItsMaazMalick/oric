import Footer from "@/components/footer/Footer";
import Logout from "@/components/logout/UserLogout";
import AdminMobileNavbar from "@/components/navigation/AdminMobileNavbar";
import { NavLinks } from "@/components/navigation/NavLinks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex justify-center items-center font-bold border">
                  M
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Maaz Malick</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Logout />
        </div>
        {/* <div className="text-primary-foreground">{name}</div> */}
        {/* <span className="text-primary-foreground">{name.slice(0, 1)}</span> */}
      </div>
      <div className="mb-10">{children}</div>
      <Footer />
    </div>
  );
}
