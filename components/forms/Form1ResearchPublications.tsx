"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveResearchPublications,
  saveResearchPublicationsNill,
  updateResearchPublications,
  updateResearchPublicationsStatus,
} from "@/app/actions/user/records/researchPublications";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { researchPublicationSchema } from "@/lib/validations/formValidations";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { useRouter } from "next/navigation";
import { RequiredTag } from "../InputFields/required-tag";
import { countries } from "@/constants/countries";
import { years } from "@/constants/data";
import { SDG } from "@/constants/sdg";
import { yesNo } from "@/constants/yes-no";
import { MultiSelectInput } from "../InputFields/MultiSelectInput";
import { updateResearchPublicationStatus } from "@/app/actions/admin/update-form-status";

export function Form1ResearchPublications({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState(
    parseInt(year) < 2019 ? "text" : "select"
  );
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof researchPublicationSchema>>({
    resolver: zodResolver(researchPublicationSchema),
    defaultValues: {
      year: updateData?.year || "",
      country: updateData?.country || "",
      journalName: updateData?.journalName || "",
      title: updateData?.title || "",
      authorName: updateData?.authorName || "",
      category: updateData?.category || "",
      status: updateData?.status || "",
      issn: updateData?.issn || "",
      volume: updateData?.volume || "",
      pages: updateData?.pages || 0,
      affiliation: updateData?.affiliation || "",
      link: updateData?.link || "",
      countries: updateData?.countries || [],
      addressing: updateData?.addressing || [],
    },
  });

  const onSubmit = async (
    values: z.infer<typeof researchPublicationSchema>
  ) => {
    if (updateData) {
      const result = await updateResearchPublications(values, updateData.id);
      setSuccess(result?.success);
      setError(result?.error);
      router.push("/user/dashboard/add-record");
    } else {
      const result = await saveResearchPublications(values, id);
      setSuccess(result?.success);
      setError(result?.error);
      router.refresh();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveResearchPublicationsNill(id);
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
              {/* SELECT YEAR */}
              <div className="w-full lg:w-[35%]">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <FormLabel className="text-xs md:text-base">
                        Select Year
                        <RequiredTag />
                      </FormLabel>
                      <Select
                        onValueChange={(selectedValue) => {
                          const selectedYear = selectedValue;
                          setYear(selectedYear.toString());
                          setCategory(
                            Number(selectedYear) < 2019 ? "text" : "select"
                          );
                          fieldValues.onChange(selectedYear);
                        }}
                        defaultValue={value}
                      >
                        <FormControl className="text-xs md:text-base">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {years.map((year, index) => (
                            <SelectItem key={index} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs sm:text-base" />
                    </FormItem>
                  )}
                />
              </div>

              {/* COUNTRY OF PUB */}
              <div className="w-full lg:w-3/4">
                <SelectInput
                  label="Country of Pub"
                  name="country"
                  control={form.control}
                  items={countries}
                  required
                />
              </div>
            </div>
            {/* JOURNAL NAME */}
            <TextInput
              label="Journal Name"
              name="journalName"
              control={form.control}
              required
            />
            {/* BOOK TITLE */}
            <TextInput
              label="Title of Research Paper"
              name="title"
              control={form.control}
              required
            />
            {/* AUTHORS NAME */}
            <TextInput
              label="Author's Name"
              name="authorName"
              control={form.control}
              required
            />
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* CATEGORY */}
              <div className="w-full lg:w-1/2">
                {category === "select" ? (
                  <SelectInput
                    label="Category"
                    name="category"
                    control={form.control}
                    items={[
                      { value: "HEC Cat-W", label: "HEC Cat-W" },
                      { value: "HEC Cat-X", label: "HEC Cat-X" },
                      { value: "HEC Cat-Y", label: "HEC Cat-Y" },
                      { value: "HEC Cat-Z", label: "HEC Cat-Z" },
                    ]}
                    required
                  />
                ) : (
                  <TextInput
                    label="Category"
                    name="category"
                    control={form.control}
                    required
                  />
                )}
              </div>
              {/* STATUS */}
              <div className="w-full lg:w-1/2">
                <SelectInput
                  label="Status"
                  name="status"
                  control={form.control}
                  items={[
                    { value: "1st Author", label: "1st Author" },
                    { value: "2nd Author", label: "2nd Author" },
                    { value: "3rd Author", label: "3rd Author" },
                    { value: "Corr. Author", label: "Corr. Author" },
                    { value: "Other", label: "Other" },
                  ]}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* ISSN */}
              <div className="w-full lg:w-[40%]">
                <TextInput
                  label="ISSN"
                  name="issn"
                  control={form.control}
                  required
                />
              </div>
              {/* VOLUME */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Volume (Issue) page no(s)"
                  name="volume"
                  control={form.control}
                  required
                />
              </div>
              {/* PAGE NO */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Page No(s)"
                  name="pages"
                  type="number"
                  control={form.control}
                  required
                />
              </div>
            </div>

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
            {/* OTHER COUNTRIES*/}
            <MultiSelectInput
              label="Other Countries"
              name="countries"
              options={countries}
              control={form.control}
              required
            />
            <MultiSelectInput
              label="Addressing any SDG"
              name="addressing"
              options={SDG}
              control={form.control}
              required
            />
            {/* ADDRESSING */}
            {/* <MultiSelectInput
              label="Addressing any SDG"
              name="addressing"
              data={values}
            /> */}
            {/* <MultiSelectInput
              label="Select Year"
              name="year"
              options={years}
              control={form.control}
              required
            /> */}
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
