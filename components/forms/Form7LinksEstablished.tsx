"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveLinksEstablished,
  saveLinksEstablishedNill,
} from "@/app/actions/user/records/links-established";
import { Form } from "@/components/ui/form";
import { countries } from "@/constants/data";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { linksEstablishedSchema } from "@/lib/validations/formValidations";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { useRouter } from "next/navigation";

export function Form7LinksEstablished({
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

  const form = useForm<z.infer<typeof linksEstablishedSchema>>({
    resolver: zodResolver(linksEstablishedSchema),
    defaultValues: {
      linkageType: "",
      scope: "",
      nameOfCollaboratingAgency: "",
      countryOfCollaboratingAgency: "",
      scopeOfCollaboration: "",
      linkageDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof linksEstablishedSchema>) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveLinksEstablished(values, file, id);
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
    const res = await saveLinksEstablishedNill(id);
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
              {/* TYPE OF LINKAGE */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type of Linkage"
                  name="linkageType"
                  control={form.control}
                  items={["Academic", "Research", "Industrial"]}
                />
              </div>

              {/* LOCATION SCOPE */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Scope"
                  name="scope"
                  control={form.control}
                  items={["National", "International"]}
                />
              </div>

              {/* collaborating_agency_name */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name of Collaborating Agency"
                  name="nameOfCollaboratingAgency"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* collaborating_agency_country */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Country"
                  name="countryOfCollaboratingAgency"
                  control={form.control}
                  items={countries}
                />
              </div>
              {/* scope_of_collaboration */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Scope of Collaboration"
                  name="scopeOfCollaboration"
                  control={form.control}
                />
              </div>
              {/* linkage_establishment_date */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Linkage Establishment Date"
                  name="linkageDate"
                  type="date"
                  control={form.control}
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
