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
import { validateForm19 } from "@/lib/validator";
import { FormEvent, useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { nationalInternationalAwardsSchema } from "@/lib/validations/formValidations";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  saveNationalInternationalHonors,
  saveNationalInternationalHonorsNill,
  updateNationalInternationalHonors,
} from "@/app/actions/user/records/national-international-honors";

export function Form15NationalOrInternationalHonors({
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
  const form = useForm<z.infer<typeof nationalInternationalAwardsSchema>>({
    resolver: zodResolver(nationalInternationalAwardsSchema),
    defaultValues: {
      date: updateData?.date || "",
      titleOfAward: updateData?.titleOfAward || "",
      awardingAgency: updateData?.awardingAgency || "",
      amountOfPrize: updateData?.amountOfPrize || 0,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof nationalInternationalAwardsSchema>
  ) => {
    if (updateData) {
      const result = await updateNationalInternationalHonors(
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
        const res = await saveNationalInternationalHonors(values, file, id);
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

    const res = await saveNationalInternationalHonorsNill(id);
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
              {/* ORGANIZATION NAME */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Date"
                  name="date"
                  control={form.control}
                  type="date"
                />
              </div>

              {/* NUMBER OF MEMBERS */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Title of Award / Honor / Certificate / Prize"
                  name="titleOfAward"
                  control={form.control}
                />
              </div>

              {/* MEMBERS NAME */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Awarding Agency"
                  name="awardingAgency"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* OBJECTIVE */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label=" Amount of Prize Money (if any)"
                  name="amountOfPrize"
                  control={form.control}
                  type="number"
                />
              </div>
              {/* PROOFS*/}
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
