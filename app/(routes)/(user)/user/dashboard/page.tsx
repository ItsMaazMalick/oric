import { allRecords } from "@/app/actions/user/records";
import EditUserProfileButton from "@/components/button/EditUserProfileButton";
import UserBooksCard from "@/components/cards/UserBooksCard";
import { Button } from "@/components/ui/button";
import { formTitles } from "@/constants/data";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";
import Link from "next/link";

const UserDashboard = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const session = await getUserSession();

  const { books }: any = await allRecords(session.id || "", userCookie);

  return (
    <div className="w-full text-primary mb-4">
      <div className="w-full h-16 mt-2 flex justify-between items-center px-4 sm:px-10 font-bold">
        <div className="hidden sm:flex items-center gap-2">Dashboard</div>
        <div className="flex w-full sm:w-auto justify-between gap-4">
          <EditUserProfileButton />
          <Link href={"/user/dashboard/add-record"}>
            <Button variant={"secondary"}>Add Record</Button>
          </Link>
        </div>
      </div>
      {/* CARDS */}
      {/* <div className="mt-4 w-full flex flex-col gap-4 p-3"> */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 p-4">
        {formTitles.map((title, index) => (
          <UserBooksCard
            key={index}
            title={title}
            total={books[index] ? books[index].length : 0}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
