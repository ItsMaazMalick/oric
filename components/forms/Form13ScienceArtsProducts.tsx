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
import { validateForm15 } from "@/lib/validator";
import { scienceArtsProductsSchema } from "@/lib/validations/formValidations";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { Checkbox } from "../ui/checkbox";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import {
  saveScienceArtsProducts,
  saveScienceArtsProductsNill,
} from "@/app/actions/user/records/science-arts-products";

export function Form13ScienceArtsProducts({
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
  const form = useForm<z.infer<typeof scienceArtsProductsSchema>>({
    resolver: zodResolver(scienceArtsProductsSchema),
    defaultValues: {
      category: "",
      date: "",
      scope: "",
      title: "",
      departmentName: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof scienceArtsProductsSchema>
  ) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveScienceArtsProducts(values, file, id);
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

    const res = await saveScienceArtsProductsNill(id);
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
                  label="Category"
                  name="category"
                  control={form.control}
                  items={[
                    "Science Products Display",
                    "Arts Products Display",
                    "Books Exibition",
                    "Design Products Display",
                    "Posters Exhibition",
                    "FYP Display",
                  ]}
                />
              </div>
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Date"
                  name="date"
                  control={form.control}
                  type="date"
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
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* thematic_area */}
              <div className="w-full lg:w-[30%]">
                <TextInput label="Title" name="title" control={form.control} />
              </div>

              {/* title_of_research */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Department Name"
                  name="departmentName"
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
