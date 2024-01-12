import { AccordionComp } from "@/components/accordion/AccordionComp";
import BackButton from "@/components/button/BackButton";
import EditUserProfileButton from "@/components/button/EditUserProfileButton";
import EditUserProfile from "@/components/edit/EditUserProfile";
import Logout from "@/components/logout/UserLogout";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";
import Image from "next/image";

const getBooks = async (id: string, userCookie: string) => {
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/user/records/all-records/${id}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookie}`,
      },
    }
  );
  const { books } = await res.json();
  return books;
};

const AddBook = async () => {
  const session = await getUserSession();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";

  const books = await getBooks(session?.id, userCookie);

  return (
    <div className="w-full">
      <div className="w-full h-5 bg-primary border-b-2 border-primary-foreground mb-2" />
      <div className="flex justify-start items-center  gap-10 p-2">
        <div className="w-[10%]">
          <div className="relative w-16 h-14 md:w-24 md:h-20">
            <Image src={"/images/site-logo.png"} alt="ORIC" fill />
          </div>
        </div>
        <div className="w-[80%]">
          <h1 className="font-bold lg:text-2xl text-secondary">
            Office of Research, Innovation and Commercialization
          </h1>
        </div>
        <div className="hidden sm:block">
          <Logout />
        </div>
      </div>
      <div className="w-full h-14 flex justify-between items-center bg-primary border-b-2 border-t-2 border-primary-foreground mb-2 py-2 px-4 rounded-full">
        <BackButton />
        <div className="flex mr-2">
          <EditUserProfileButton />
        </div>
      </div>
      <div>
        <p className="p-2 m-2">
          You are not required to submit a hard copy of the duly filled proforma
          and only online submission is enough. In case,{" "}
          <span className="font-semibold">AIOU ORIC</span> requires any
          additional information during the evaluation process, you will be
          contacted through email
        </p>
      </div>
      {/* ----------------- */}
      <div className="px-2 sm:px-8 py-2 bg-primary-foreground ring ring-slate-100 shadow-lg">
        <AccordionComp id={session?.id} userCookie={userCookie} data={books} />
      </div>
    </div>
  );
};

export default AddBook;
