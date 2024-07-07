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
import { validateForm2 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { toast } from "../ui/use-toast";
import { bookAuthoredSchema } from "@/lib/validations/formValidations";
import { Checkbox } from "../ui/checkbox";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import {
  saveBookAuthoredEdited,
  saveBookAuthoredEditedNill,
  updateBookAuthoredEdited,
} from "@/app/actions/user/records/book-authored-edited";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RequiredTag } from "../InputFields/required-tag";
import { DynamicSelectInput } from "../InputFields/dynamicselectInput";
import { yesNo } from "@/constants/yes-no";
import { years } from "@/constants/data";
import { countries } from "@/constants/countries";
import { SDG } from "@/constants/sdg";
import { MultiSelectInput } from "../InputFields/MultiSelectInput";

export function Form2BookAuthoredEdited({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [author, setAuthor] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof bookAuthoredSchema>>({
    resolver: zodResolver(bookAuthoredSchema),
    defaultValues: {
      isbn: updateData?.isbn || "",
      role: updateData?.role || "",
      pages: updateData?.pages || 0,
      year: updateData?.year || "",
      country: updateData?.country || "",
      bookTitle: updateData?.bookTitle || "",
      chapterTitle: updateData?.chapterTitle || "",
      publisherName: updateData?.publisherName || "",
      affiliation: updateData?.affiliation || "",
      link: updateData?.link || "",
      addressing: updateData?.addressing || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof bookAuthoredSchema>) => {
    if (updateData) {
      const result = await updateBookAuthoredEdited(values, updateData.id);
      setSuccess(result?.success);
      setError(result?.error);
      router.push("/user/dashboard/add-record");
    } else {
      const result = await saveBookAuthoredEdited(values, id);
      setSuccess(result?.success);
      setError(result?.error);
      router.refresh();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveBookAuthoredEditedNill(id);
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
              {/* ISBN */}
              <div className="w-full lg:w-[40%]">
                <TextInput
                  label="ISBN"
                  name="isbn"
                  control={form.control}
                  required
                />
              </div>
              {/* ROLE */}
              <div className="w-full lg:w-[30%]">
                <DynamicSelectInput
                  label="Applicant Role"
                  name="role"
                  control={form.control}
                  items={["Book Author", "Chapter Author", "Book Editor"]}
                  data={author}
                  setData={setAuthor}
                  required
                />
              </div>
              {/* PAGE NO */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Page No(s)"
                  name="pages"
                  control={form.control}
                  type="number"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* SELECT YEAR */}
              <div className="w-full lg:w-3/4">
                <SelectInput
                  label="Year"
                  name="year"
                  control={form.control}
                  items={years}
                  required
                />
              </div>

              {/* COUNTRY OF PUB */}
              <div className="w-full lg:w-3/4">
                <SelectInput
                  label="Country of Pub."
                  name="country"
                  control={form.control}
                  items={countries}
                  required
                />
              </div>
            </div>
            {/* BOOK TITLE */}
            <TextInput
              label="Book Title"
              name="bookTitle"
              control={form.control}
              required
            />
            {/* TITLE OF RESEARCH PAPER */}
            {author === "Chapter Author" && (
              <TextInput
                label="Title of Chapter"
                name="chapterTitle"
                control={form.control}
              />
            )}
            {/* PUBLISHER */}
            <TextInput
              label="Publisher Name"
              name="publisherName"
              control={form.control}
              required
            />

            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* AFFILIATION */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Affiliation with AIOU"
                  name="affiliation"
                  control={form.control}
                  items={yesNo}
                  required
                />
              </div>
              <div className="w-full lg:w-[70%]">
                {/* WEB LINK*/}
                <TextInput
                  label="Web. Link"
                  name="link"
                  control={form.control}
                  required
                />
              </div>
            </div>
            {/* ADDRESSING */}
            <MultiSelectInput
              label="Addressing any SDG"
              name="addressing"
              options={SDG}
              control={form.control}
              required
            />
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
