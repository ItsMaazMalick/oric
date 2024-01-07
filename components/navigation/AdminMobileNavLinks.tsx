import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { faculties } from "@/constants/data";
import Link from "next/link";

export default function AdminMobileNavLinks() {
  return (
    <>
      {faculties.map((faculty) => (
        <>
          <DropdownMenuItem key={faculty.id}>
            <Link href={`/dashboard/${faculty.href}`}>{faculty.title}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      ))}
    </>
  );
}
