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
import { validateForm13 } from "@/lib/validator";
import { patentsTradeSchema } from "@/lib/validations/formValidations";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { Checkbox } from "../ui/checkbox";
import {
  savePatentsTrade,
  savePatentsTradeNill,
  updatePatentsTrade,
} from "@/app/actions/user/records/patents-trade";
import { nationalInternational } from "@/constants/national-international";

export function Form11PatentsTradeMarksDesignPatent({
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
  const form = useForm<z.infer<typeof patentsTradeSchema>>({
    resolver: zodResolver(patentsTradeSchema),
    defaultValues: {
      typeOfIP: updateData?.typeOfIP || "",
      scope: updateData?.scope || "",
      date: updateData?.date || "",
      namesOfInventors: updateData?.namesOfInventors || "",
      inventionTitle: updateData?.inventionTitle || "",
      IPStatus: updateData?.IPStatus || "",
      royaltyRevenue: updateData?.royaltyRevenue || 0,
      keyScientificAspects: updateData?.keyScientificAspects || "",
      commertialPartners: updateData?.commertialPartners || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof patentsTradeSchema>) => {
    if (updateData) {
      const result = await updatePatentsTrade(
        values,
        file || updateData.evidence,
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
        const res = await savePatentsTrade(values, file, id);
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

    const res = await savePatentsTradeNill(id);
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
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type of IP"
                  name="typeOfIP"
                  control={form.control}
                  items={[
                    { value: "Patent", label: "Patent" },
                    { value: "Copyright", label: "Copyright" },
                    { value: "Trademark", label: "Trademark" },
                    { value: "Design", label: "Design" },
                    { value: "Logo", label: "Logo" },
                    { value: "Industrial Design", label: "Industrial Design" },
                    { value: "Trade Secret", label: "Trade Secret" },
                  ]}
                />
              </div>
              {/* location_scope */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="National/International"
                  name="scope"
                  control={form.control}
                  items={nationalInternational}
                />
              </div>
              {/* sponsoring_agency_address */}
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
              {/* thematic_area */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Name of Inventors"
                  name="namesOfInventors"
                  control={form.control}
                  description="Separate with comma ( , )"
                />
              </div>

              {/* pi_designation */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Invention Title"
                  name="inventionTitle"
                  control={form.control}
                />
              </div>
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="IP Status"
                  name="IPStatus"
                  control={form.control}
                  items={[
                    { value: "Disclosure of IP", label: "Disclosure of IP" },
                    { value: "Submitted to IPO", label: "Submitted to IPO" },
                    { value: "Published", label: "Published" },
                    { value: "Granted", label: "Granted" },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Royality / Revenue Generated (Rs)"
                  name="royaltyRevenue"
                  control={form.control}
                  type="number"
                />
              </div>
              {/* co_pi_department */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Key Scientific Aspects"
                  name="keyScientificAspects"
                  control={form.control}
                />
              </div>
              {/* co_pi_university */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Commercial Partner (if any)"
                  name="commertialPartners"
                  control={form.control}
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
