"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveConsultancyContracts,
  saveConsultancyContractsNill,
} from "@/app/actions/user/records/consultancy-contracts";
import { Form } from "@/components/ui/form";
import { countries } from "@/constants/data";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { consultancyContractSchema } from "@/lib/validations/formValidations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";

export function Form10ConsultancyContractsWithIndustry({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof consultancyContractSchema>>({
    resolver: zodResolver(consultancyContractSchema),
    defaultValues: {
      consultancyType: "",
      titleOfConsultancy: "",
      role: "",
      companyName: "",
      companyCountry: "",
      contractValue: 0,
      startDate: "",
      endDate: "",
      keyDeliverables: "",
      remarks: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof consultancyContractSchema>
  ) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveConsultancyContracts(values, file, id);
      setNill(false);
      setFile("");
      setSuccess(res.success);
      setError(res.error);
      form.reset();
      router.refresh();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);
    setFile("");
    const res = await saveConsultancyContractsNill(id);
    setSuccess(res.success);
    setError(res.error);
    router.refresh();
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
              {/* sponsoring_agency_address */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Consultancy Type"
                  name="consultancyType"
                  control={form.control}
                />
              </div>
              {/* thematic_area */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Title of Consultancy Project"
                  name="titleOfConsultancy"
                  control={form.control}
                />
              </div>

              {/* ROLE */}

              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Applicant Role"
                  name="role"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* pi_department */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Company Name"
                  name="companyName"
                  control={form.control}
                />
              </div>
              {/* co_pi_designation */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Company Country"
                  name="companyCountry"
                  control={form.control}
                  items={countries}
                />
              </div>

              {/* co_pi_department */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Contract Value (Rs)"
                  name="contractValue"
                  type="number"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* co_pi_university */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Start Date"
                  name="startDate"
                  control={form.control}
                  type="date"
                />
              </div>
              {/* sponsoring_agency_name */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="End Date"
                  name="endDate"
                  control={form.control}
                  type="date"
                />
              </div>

              {/* sponsoring_agency_country */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Key Deliverables"
                  name="keyDeliverables"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* sponsoring_agency_address */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Remarks (if any)"
                  name="remarks"
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
