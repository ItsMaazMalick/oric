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
import { countries, years } from "@/constants/data";
import { FormEvent, useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { contractResearchSchema } from "@/lib/validations/formValidations";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  saveContractResearch,
  saveContractResearchNill,
} from "@/app/actions/user/records/contract-research";
import { DynamicSelectInput } from "../InputFields/dynamicselectInput";

export function Form8ContractResearchAwarded({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof contractResearchSchema>>({
    resolver: zodResolver(contractResearchSchema),
    defaultValues: {
      scope: updateData?.scope || "",
      sponsoringAgencyCountry: updateData?.sponsoringAgencyCountry || "",
      contractAwardingAgency: updateData?.contractAwardingAgency || "",
      title: updateData?.title || "",
      amountOfContract: updateData?.amountOfContract || 0,
      role: updateData?.role || "",
      nameOfPI: updateData?.nameOfPI || "",
      designationOfPI: updateData?.designationOfPI || "",
      organizationOfPI: updateData?.organizationOfPI || "",
      startingDate: updateData?.startingDate || "",
      endingDate: updateData?.endingDate || "",
      dateOfContract: updateData?.dateOfContract || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contractResearchSchema>) => {
    const res = await saveContractResearch(values, file, id);
    setNill(false);
    setFile("");
    setSuccess(res.success);
    setError(res.error);
    form.reset();
    router.refresh();
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);
    setFile("");
    const res = await saveContractResearchNill(id);
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
              {/* location_scope */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="National/International"
                  name="scope"
                  control={form.control}
                  items={["National", "International"]}
                />
              </div>
              {/* sponsoring_agency_country */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Sponsoring Agency Country"
                  name="sponsoringAgencyCountry"
                  control={form.control}
                  items={countries}
                />
              </div>
              {/* sponsoring_agency_name */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Contract Awarding Agency"
                  name="contractAwardingAgency"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* title_of_research */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Title of of Contract Research"
                  name="title"
                  control={form.control}
                />
              </div>

              {/* total_amount_approved */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Amount of Contract Award (Rs)"
                  name="amountOfContract"
                  type="number"
                  control={form.control}
                />
              </div>
              {/* ROLE */}
              <div className="w-full lg:w-[35%]">
                <DynamicSelectInput
                  label="Select Role"
                  name="role"
                  control={form.control}
                  items={["PI", "Co-PI"]}
                  data={role}
                  setData={setRole}
                  required
                />
              </div>
            </div>
            {role !== "PI" && (
              <div className="flex flex-col w-full gap-4 lg:flex-row">
                {/* pi_name */}
                <div className="w-full lg:w-[30%]">
                  <TextInput
                    label="Name of PI"
                    name="nameOfPI"
                    control={form.control}
                  />
                </div>
                {/* pi_designation */}
                <div className="w-full lg:w-[35%]">
                  <TextInput
                    label="Designation of PI"
                    name="designationOfPI"
                    control={form.control}
                  />
                </div>
                {/* pi_department */}
                <div className="w-full lg:w-[35%]">
                  <TextInput
                    label="Organization / Institution of PI"
                    name="organizationOfPI"
                    control={form.control}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* start_date */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Start Date"
                  name="startingDate"
                  control={form.control}
                  type="date"
                />
              </div>

              {/* end_date */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="End Date"
                  name="endingDate"
                  control={form.control}
                  type="date"
                />
              </div>
              {/* date_of_contract */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Date of Contract"
                  name="dateOfContract"
                  control={form.control}
                  type="date"
                />
              </div>
            </div>
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
