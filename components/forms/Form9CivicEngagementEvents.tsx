"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { FormEvent, useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { civicEngagementSchema } from "@/lib/validations/formValidations";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  saveCivicEngagement,
  saveCivicEngagementNill,
  updateCivicEngagement,
} from "@/app/actions/user/records/civic-engagement";

export function Form9CivicEngagementEvents({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof civicEngagementSchema>>({
    resolver: zodResolver(civicEngagementSchema),
    defaultValues: {
      type: updateData?.type || "",
      role: updateData?.role || "",
      title: updateData?.title || "",
      communityInvolved: updateData?.communityInvolved || "",
      outcomes: updateData?.outcomes || "",
      date: updateData?.date || "",
      collaboratingAgency: updateData?.collaboratingAgency || "",
      collaboratingAgencyName: updateData?.collaboratingAgencyName || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof civicEngagementSchema>) => {
    if (updateData) {
      const result = await updateCivicEngagement(
        values,
        file || updateData.briefReport,
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
        const res = await saveCivicEngagement(values, file, id);
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
    const res = await saveCivicEngagementNill(id);
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
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* pi_name */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type"
                  name="type"
                  control={form.control}
                  items={[
                    { value: "Civic Engagement", label: "Civic Engagement" },
                    {
                      value: "Issue of Public Concern",
                      label: "Issue of Public Concern",
                    },
                  ]}
                />
              </div>
              {/* co_pi_university */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Role of Applicant"
                  name="role"
                  control={form.control}
                  items={[
                    { value: "Organizer", label: "Organizer" },
                    { value: "Participant", label: "Participant" },
                    { value: "Resource Person", label: "Resource Person" },
                  ]}
                />
              </div>
              {/* thematic_area */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Title of Event / Initiative"
                  name="title"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* title_of_research */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Community Involved"
                  name="communityInvolved"
                  control={form.control}
                />
              </div>

              {/* pi_name */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Outcomes"
                  name="outcomes"
                  control={form.control}
                  items={[
                    { value: "Case Study", label: "Case Study" },
                    { value: "Policy Advice", label: "Policy Advice" },
                    { value: "Outreach Event", label: "Outreach Event" },
                    { value: "Capacity Building", label: "Capacity Building" },
                    { value: "Any Other", label: "Any Other" },
                  ]}
                />
              </div>
              {/* pi_department */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Date"
                  name="date"
                  control={form.control}
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* co_pi_university */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Collaborating Agency"
                  name="collaboratingAgency"
                  control={form.control}
                  items={[
                    { value: "Local Authority", label: "Local Authority" },
                    {
                      value: "Government Department",
                      label: "Government Department",
                    },
                    {
                      value: "Civil Society Organizations",
                      label: "Civil Society Organizations",
                    },
                    { value: "NGO", label: "NGO" },
                    { value: "Any Other", label: "Any Other" },
                  ]}
                />
              </div>
              {/* co_pi_university */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Collaborating Agency Name"
                  name="collaboratingAgencyName"
                  control={form.control}
                />
              </div>
              {/* sponsoring_agency_country */}

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
            </div>

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
