import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { formTitles } from "@/constants/data";

import AdminDataTable from "../tables/AdminDataTable";
import FormMain from "../forms/FormMain";

export function AccordionComp({ data }: { data: any }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-sm sm:text-base"
    >
      {formTitles.map((formTitle: any, index: number) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger
            // onClick={handleClose}
            className="font-bold text-left text-primary hover:text-secondary"
          >
            {formTitle}
          </AccordionTrigger>
          <AccordionContent>
            <FormMain index={index} />
            <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
              <AdminDataTable
                data={data[index] ? data[index] : []}
                index={index + 1}
              />
            </div>
            <div className="w-full mt-4 border-t-2 border-primary" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
