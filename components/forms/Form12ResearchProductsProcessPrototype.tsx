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
import { validateForm14 } from "@/lib/validator";
import { researchProductsSchema } from "@/lib/validations/formValidations";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { Checkbox } from "../ui/checkbox";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import {
  saveResearchProducts,
  saveResearchProductsNill,
} from "@/app/actions/user/records/research-products";

export function Form12ResearchProductsProcessPrototype({
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
  const form = useForm<z.infer<typeof researchProductsSchema>>({
    resolver: zodResolver(researchProductsSchema),
    defaultValues: {
      type: "",
      category: "",
      developmentStatus: "",
      date: "",
      nameOfInventors: "",
      title: "",
      keyScientificAspects: "",
      fieldOfUse: "",
      collaboratingPartnerName: "",
      financialSupport: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof researchProductsSchema>) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveResearchProducts(values, file, id);
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

    const res = await saveResearchProductsNill(id);
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
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type"
                  name="type"
                  control={form.control}
                  items={[
                    "Architetural Designs",
                    "Assesment Tools",
                    "Books",
                    "Softwares",
                    "Apps",
                    "Video Lectures",
                    "Art Designs",
                    "Any Other",
                  ]}
                />
              </div>
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Category"
                  name="category"
                  control={form.control}
                  items={["Product", "Process", "Prototype"]}
                />
              </div>
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Development Status"
                  name="developmentStatus"
                  control={form.control}
                  items={[
                    "Prefeasibility",
                    "Industrial Scale Testing",
                    "Prototype Development",
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Date"
                  name="date"
                  control={form.control}
                  type="date"
                />
              </div>
              {/* thematic_area */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Name Of Inventors"
                  name="nameOfInventors"
                  control={form.control}
                  description="Separate with comma ( , )"
                />
              </div>

              {/* pi_designation */}
              <div className="w-full lg:w-[35%]">
                <TextInput label="Title" name="title" control={form.control} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* co_pi_department */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Key Scientific Aspects"
                  name="keyScientificAspects"
                  control={form.control}
                />
              </div>

              {/* sponsoring_agency_name */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Field Of Use"
                  name="fieldOfUse"
                  control={form.control}
                />
              </div>

              {/* sponsoring_agency_address */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Collaborating Partner Name (if any)"
                  name="collaboratingPartnerName"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* sponsoring_agency_country */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Financial Support from Partner (Rs)"
                  name="financialSupport"
                  control={form.control}
                  type="number"
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
