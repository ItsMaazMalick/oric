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
import { years } from "@/constants/data";
import { validateForm8 } from "@/lib/validator";
import { FormEvent, useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { policyAdvocacySchema } from "@/lib/validations/formValidations";
import { Checkbox } from "../ui/checkbox";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import {
  savePolicyAdvocacy,
  ssavePolicyAdvocacyNill,
  updatePolicyAdvocacy,
} from "@/app/actions/user/records/policy-advocacy";

export function Form6PolicyAdvocacyORCaseStudies({
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
  const form = useForm<z.infer<typeof policyAdvocacySchema>>({
    resolver: zodResolver(policyAdvocacySchema),
    defaultValues: {
      year: updateData?.year || "",
      nameOfGovernmentBody: updateData?.nameOfGovernmentBody || "",
      nameOfResearcher: updateData?.nameOfResearcher || "",
      designationOfResearcher: updateData?.designationOfResearcher || "",
      areaAdvocated: updateData?.areaAdvocated || "",
      brief: updateData?.brief || "",
      partners: updateData?.partners || "",
      advocacyTools: updateData?.advocacyTools || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof policyAdvocacySchema>) => {
    if (updateData) {
      const result = await updatePolicyAdvocacy(
        values,
        file || updateData.policyCaseStudyCopy,
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
        const res = await savePolicyAdvocacy(values, file, id);
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
    const res = await ssavePolicyAdvocacyNill(id);
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
                  label="Year."
                  name="year"
                  control={form.control}
                  items={years}
                />
              </div>

              {/* NAME OF GOVERNMENT BODY */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name of Government body presented"
                  name="nameOfGovernmentBody"
                  control={form.control}
                />
              </div>

              {/* PI NAME */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name of Researcher"
                  name="nameOfResearcher"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* PI DESIGNATION */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Designation of Researcher"
                  name="designationOfResearcher"
                  control={form.control}
                />
              </div>
              {/* AREA ADVOCATED */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Area Advocated"
                  name="areaAdvocated"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* BRIEF */}
              <div className="w-full lg:w-[30%]">
                <TextInput label="Brief" name="brief" control={form.control} />
              </div>
              {/* COALITION PARTNER */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Partners in Advocacy Study"
                  name="partners"
                  control={form.control}
                />
              </div>
              {/* ADVOCACY TOOLS */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Advocacy Tools Adopted"
                  name="advocacyTools"
                  control={form.control}
                  items={[
                    { value: "Briefings", label: "Briefings" },
                    { value: "Meetings", label: "Meetings" },
                    { value: "Websites", label: "Websites" },
                    {
                      value: "Social Media Debates",
                      label: "Social Media Debates",
                    },
                    { value: "Any Other", label: "Any Other" },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* POLICY FILE */}
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
