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
import { years } from "@/constants/data";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import Image from "next/image";
import {
  saveResearchProjects,
  saveResearchProjectsNill,
  updateResearchProjects,
} from "@/app/actions/user/records/researchProjects";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import FormSubmitButton from "../button/FormSubmitButton";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { researchProjectSchema } from "@/lib/validations/formValidations";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";

export function Form3ResearchProjects({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof researchProjectSchema>>({
    resolver: zodResolver(researchProjectSchema),
    defaultValues: {
      date: updateData?.date || "",
      agency: updateData?.agency || "",
      name: updateData?.name || "",
      status: updateData?.status || "",
      type: updateData?.type || "",
      role: updateData?.role || "",
      grantAmount: updateData?.grantAmount || 0,
      title: updateData?.title || "",
      startDate: updateData?.startDate || "",
      endDate: updateData?.endDate || "",
      totalFunding: updateData?.totalFunding || 0,
      collaboratingPartner: updateData?.collaboratingPartner || "",
      coFundingPartner: updateData?.coFundingPartner || "",
      completion: updateData?.completion || "",
      remarks: updateData?.remarks || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof researchProjectSchema>) => {
    if (updateData) {
      const result = await updateResearchProjects(
        values,
        file || updateData.file,
        updateData.id
      );
      setSuccess(result?.success);
      setError(result?.error);
      router.push("/user/dashboard/add-record");
    } else {
      if (!file) {
        alert("Image is required");
        setError("Image is required");
        return;
      } else {
        const res = await saveResearchProjects(values, file, id);
        setNill(false);
        setFile("");
        setSuccess(res.success);
        setError(res.error);
        form.reset();
        router.refresh();
      }
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);
    setFile("");
    const res = await saveResearchProjectsNill(id);
    setSuccess(res.success);
    setError(res.error);
    router.refresh();
  };

  return (
    <>
      {!updateData && (
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
      )}
      {nill ? (
        <>
          <div className="flex items-center justify-center w-full font-bold text-destructive">
            All fields are marked as NILL
          </div>
          <div className="mt-2">
            <form onSubmit={handleNill}>
              <div>
                {success && <FormSuccess message={success} className="my-2" />}
                {error && <FormError message={error} className="my-2" />}
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
                  name="agency"
                  control={form.control}
                />
              </div>

              {/* RESEARCH NAME */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name of Research Grant"
                  name="name"
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
                  items={[
                    { value: "Approved", label: "Approved" },
                    { value: "Completed", label: "Completed" },
                    { value: "Submitted", label: "Submitted" },
                  ]}
                />
              </div>
              {/* TYPE */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Type"
                  name="type"
                  control={form.control}
                  items={[
                    { value: "National", label: "National" },
                    { value: "International", label: "International" },
                    { value: "Internal", label: "Internal" },
                  ]}
                />
              </div>
              {/* ROLE */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Application Role"
                  name="role"
                  control={form.control}
                  items={[
                    { value: "PI", label: "PI" },
                    { value: "Co-PI", label: "Co-PI" },
                    { value: "Consultant", label: "Consultant" },
                    { value: "Collaborator", label: "Collaborator" },
                    { value: "Team Lead", label: "Team Lead" },
                    { value: "Team Member", label: "Team Member" },
                    { value: "Any Other", label: "Any Other" },
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
                  items={[
                    { value: "Applied", label: "Applied" },
                    { value: "Completed", label: "Completed" },
                    { value: "Ongoing", label: "Ongoing" },
                  ]}
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
                <UploadButtonComponent image={file} setImage={setFile} />
              </div>
            )}
            <div>
              {success && <FormSuccess message={success} className="my-2" />}
              {error && <FormError message={error} className="my-2" />}
              <div className="flex items-center justify-center w-full">
                <FormSubmitButton
                  loading={form.formState.isSubmitting}
                  className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                >
                  {updateData ? "Update" : "Submit"}
                </FormSubmitButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
