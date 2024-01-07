import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import AdminMobileNavLinks from "./AdminMobileNavLinks";
import Link from "next/link";

export default function AdminMobileNavbar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <Link href={"/dashboard"}>
          <DropdownMenuLabel>Home</DropdownMenuLabel>
        </Link> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/dashboard`}>
            <DropdownMenuItem className="cursor-pointer">Home</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <AdminMobileNavLinks />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
