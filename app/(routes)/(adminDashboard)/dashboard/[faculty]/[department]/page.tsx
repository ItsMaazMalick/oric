import AdminDataTable from "@/components/tables/AdminDataTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formTitles } from "@/constants/data";

const Department = async ({
  params,
}: {
  params: { faculty: string; department: string };
}) => {
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/admin/records/${params.faculty}/${params.department}`,
    { cache: "no-store" }
  );
  const { books } = await res.json();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-sm sm:text-base p-2 bg-primary-foreground"
    >
      {books?.map((book: any, index: number) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className="font-bold text-left text-primary hover:text-secondary">
            {formTitles[index]}
          </AccordionTrigger>
          <AccordionContent>
            {/* <Test researchPublications={researchPublications} /> */}
            <AdminDataTable data={book} index={index + 1} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Department;
