import { getUserSession } from "@/app/actions/session";
import { allRecords } from "@/app/actions/user/records";
import { AccordionComp } from "@/components/accordion/AccordionComp";
import BackButton from "@/components/button/BackButton";
import { cookies } from "next/headers";

const AddBook = async () => {
  const session = await getUserSession();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";

  const { books }: any = await allRecords(session.id || "", userCookie);

  return (
    <div className="w-full">
      <div>
        <div className="mt-4 ml-4">
          <BackButton />
        </div>
        <p className="p-2 mx-2">
          You are not required to submit a hard copy of the duly filled proforma
          and only online submission is enough. In case,{" "}
          <span className="font-semibold">AIOU ORIC</span> requires any
          additional information during the evaluation process, you will be
          contacted through email
        </p>
      </div>
      {/* ----------------- */}
      <div className="px-2 sm:px-8 py-2 bg-primary-foreground ring ring-slate-100 shadow-lg">
        <AccordionComp data={books} />
      </div>
    </div>
  );
};

export default AddBook;
