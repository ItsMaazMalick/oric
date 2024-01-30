"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SDG, years } from "@/constants/data";
import { validateForm3 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm3;

export function Form3ResearchProjects({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      funding_agency: "",
      name_of_research: "",
      status: "",
      type: "",
      role: "",
      grant_amount: 0,
      title: "",
      start_date: "",
      end_date: "",
      total_funding: 0,
      collaborating_partner: "",
      co_funding_partner: "",
      completion: "",
      remarks: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        const formData = new FormData();
        formData.append("date", values.date);
        formData.append("funding_agency", values.funding_agency);
        formData.append("name_of_research", values.name_of_research);
        formData.append("status", values.status);
        formData.append("type", values.type);
        formData.append("role", values.role);
        formData.append("grant_amount", String(values.grant_amount));
        formData.append("title", values.title);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);
        formData.append("total_funding", String(values.total_funding));
        formData.append("collaborating_partner", values.collaborating_partner);
        formData.append("co_funding_partner", values.co_funding_partner);
        formData.append("completion", values.completion);
        formData.append("remarks", values.remarks);
        if (file) {
          formData.set("file", file);
        }
        formData.set("user_id", id);

        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/research-projects`, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: formData,
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          toast({
            variant: "success",
            title: data.message,
          });
          form.reset();
          router.refresh();
          // router.push("/user/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
        setLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* YEAR*/}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Year"
                name="date"
                control={form.control}
                items={years}
              />
            </div>

            {/* FUNDING AGENCY */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Funding Agency"
                name="funding_agency"
                control={form.control}
              />
            </div>

            {/* RESEARCH NAME */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Name of Research Grant"
                name="name_of_research"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* STATUS */}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Status"
                name="status"
                control={form.control}
                items={["Approved", "Completed", "Submitted"]}
              />
            </div>
            {/* TYPE */}
            <div className="w-full lg:w-[35%]">
              <SelectInput
                label="Type"
                name="type"
                control={form.control}
                items={["National", "International", "Internal"]}
              />
            </div>
            {/* ROLE */}
            <div className="w-full lg:w-[35%]">
              <SelectInput
                label="Application Role"
                name="role"
                control={form.control}
                items={[
                  "PI",
                  "Co-PI",
                  "Consultant",
                  "Collaborator",
                  "Team Lead",
                  "Team Member",
                  "Any Other",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* GRANT AMOUNT */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Grant Amount (Rs)"
                name="grant_amount"
                type="number"
                control={form.control}
              />
            </div>
            {/* TITLE */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Title of Research Project"
                name="title"
                control={form.control}
              />
            </div>
            {/* START DATE */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Start Date"
                name="start_date"
                type="date"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* END DATE */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="End Date"
                name="end_date"
                type="date"
                control={form.control}
              />
            </div>
            {/* TOTAL FUNDING */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Total Funding (Rs)"
                name="total_funding"
                type="number"
                control={form.control}
              />
            </div>
            {/* COLLABORATING PARTNER */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Collaborating Partner"
                name="collaborating_partner"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* CO-FUNDING PARTNER */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Co-Funding Partner"
                name="co_funding_partner"
                control={form.control}
              />
            </div>
            {/* COMPLETION*/}
            <div className="w-full lg:w-[35%]">
              <SelectInput
                label="Completion"
                name="completion"
                control={form.control}
                items={["Applied", "Completed", "Ongoing"]}
              />
            </div>
            {/* REMARKS*/}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Remarks (if any)"
                name="remarks"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <div className="w-full lg:w-[50%]">
              <MultiSelectInput
                label="Addressing any SDG"
                name="SDG"
                data={SDG}
              />
            </div>
            {/* ANNEX FILE */}
            <div className="w-full lg:w-[50%]">
              <div className="mb-2">
                <label htmlFor="" className="text-xs font-medium sm:text-base">
                  Submission Proof / Award Letter / Completion Certificate
                </label>
              </div>
              <input
                className="w-full p-2 border rounded-md"
                type="file"
                onChange={(e: any) => setFile(e.target.files?.[0])}
                name=""
                id=""
              />
            </div>
          </div>
          <div className="">
            <Button
              disabled={loading}
              type="submit"
              className="text-xs sm:text-base"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mx-auto animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
