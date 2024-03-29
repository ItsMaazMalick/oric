"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SDG, years } from "@/constants/data";
import { validateForm3 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { UploadButton } from "@/app/utils/uploadthing";
import Image from "next/image";
import {
  saveResearchProjects,
  saveResearchProjectsNill,
} from "@/app/actions/user/records/researchProjects";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import FormSubmitButton from "../button/FormSubmitButton";

//FORM VALIDATION
const formSchema = validateForm3;

export function Form3ResearchProjects({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      fundingAgency: "",
      nameOfResearch: "",
      status: "",
      type: "",
      role: "",
      grantAmount: 0,
      title: "",
      startDate: "",
      endDate: "",
      totalFunding: 0,
      collaboratingPartner: "",
      coFundingPartner: "",
      completion: "",
      remarks: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      alert("Image is required");
      return;
    } else {
      const formData = new FormData();
      formData.append("date", values.date);
      formData.append("fundingAgency", values.fundingAgency);
      formData.append("nameOfResearch", values.nameOfResearch);
      formData.append("status", values.status);
      formData.append("type", values.type);
      formData.append("role", values.role);
      formData.append("grantAmount", String(values.grantAmount));
      formData.append("title", values.title);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("totalFunding", String(values.totalFunding));
      formData.append("collaboratingPartner", values.collaboratingPartner);
      formData.append("coFundingPartner", values.coFundingPartner);
      formData.append("completion", values.completion);
      formData.append("remarks", values.remarks);
      formData.append("file", file as string);
      formData.append("userId", id);

      const res = await saveResearchProjects(formData);
      setNill(false);
      setFile("");
      form.reset();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);
    setFile("");
    const formData = new FormData();
    formData.append("userId", id);
    const res = await saveResearchProjectsNill(formData);
  };

  return (
    <>
      <div className="flex items-center w-16 p-2 mb-4 space-x-2 border-2 rounded-md border-primary">
        <Checkbox
          onClick={() => setNill((prev) => !prev)}
          id="nill"
          checked={nill}
        />
        <label
          htmlFor="nill"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nill
        </label>
      </div>
      {nill ? (
        <>
          <div className="flex items-center justify-center w-full font-bold text-destructive">
            All fields are marked as NILL
          </div>
          <div className="mt-2">
            <form onSubmit={handleNill}>
              <div>
                <div className="flex items-center justify-center w-full">
                  <FormSubmitButton
                    loading={form.formState.isSubmitting}
                    className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                  >
                    Submit
                  </FormSubmitButton>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
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
                  name="fundingAgency"
                  control={form.control}
                />
              </div>

              {/* RESEARCH NAME */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name of Research Grant"
                  name="nameOfResearch"
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
                  name="grantAmount"
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
                  name="startDate"
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
                  name="endDate"
                  type="date"
                  control={form.control}
                />
              </div>
              {/* TOTAL FUNDING */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Total Funding (Rs)"
                  name="totalFunding"
                  type="number"
                  control={form.control}
                />
              </div>
              {/* COLLABORATING PARTNER */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Collaborating Partner"
                  name="collaboratingPartner"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* CO-FUNDING PARTNER */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Co-Funding Partner"
                  name="coFundingPartner"
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
              {/* TODO: */}
              {file ? (
                <Link
                  href={file}
                  target="_blank"
                  className="text-secondary-foreground bg-secondary w-full lg:w-[50%] rounded-md h-10 mt-8 flex justify-center items-center"
                >
                  File Uploaded
                </Link>
              ) : (
                <div className="text-black bg-primary w-full lg:w-[50%] rounded-md h-10 flex justify-center items-center mt-8">
                  <UploadButton
                    className="mt-4"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setFile(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                      setFile("");
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-center w-full">
                <FormSubmitButton
                  loading={form.formState.isSubmitting}
                  className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                >
                  Submit
                </FormSubmitButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
