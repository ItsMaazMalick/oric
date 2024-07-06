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
import { Input } from "@/components/ui/input";
import { countries } from "@/constants/data";
import { validateForm16 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import { agreementSignedSchema } from "@/lib/validations/formValidations";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  saveAgreementsSigned,
  saveAgreementsSignedNill,
} from "@/app/actions/user/records/agreements-signed";

export function Form14AgreementsSignedForCollaboration({
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
  const form = useForm<z.infer<typeof agreementSignedSchema>>({
    resolver: zodResolver(agreementSignedSchema),
    defaultValues: {
      typeOfLinkage: updateData?.typeOfLinkage || "",
      linkageEstablishmentDate: updateData?.linkageEstablishmentDate || "",
      scope: updateData?.scope || "",
      collaboratingAgency: updateData?.collaboratingAgency || "",
      collaboratingAgencyCountry: updateData?.collaboratingAgencyCountry || "",
      duration: updateData?.duration || "",
      areaOfFocus: updateData?.areaOfFocus || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof agreementSignedSchema>) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveAgreementsSigned(values, file, id);
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

    const res = await saveAgreementsSignedNill(id);
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
              {/* thematic_area */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type of Linkage"
                  name="typeOfLinkage"
                  control={form.control}
                  items={["Academic", "Research", "Both"]}
                />
              </div>
              {/* sponsoring_agency_address */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Linkage Establishment Date"
                  name="linkageEstablishmentDate"
                  control={form.control}
                  type="date"
                />
              </div>

              {/* title_of_research */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Scope"
                  name="scope"
                  control={form.control}
                  items={["National", "International"]}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* pi_name */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Collaborating Agency"
                  name="collaboratingAgency"
                  control={form.control}
                />
              </div>

              {/* pi_designation */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Collaborating Agency Country"
                  name="collaboratingAgencyCountry"
                  control={form.control}
                  items={countries}
                />
              </div>
              {/* co_pi_designation */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Duration"
                  name="duration"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* co_pi_department */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Areas of Focus"
                  name="areaOfFocus"
                  control={form.control}
                />
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
