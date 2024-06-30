"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveResearchPublications,
  saveResearchPublicationsNill,
} from "@/app/actions/user/records/researchPublications";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SDG, countries, years } from "@/constants/data";
import { researchPublicationSchema } from "@/lib/validations/formValidations";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
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

export function Form1ResearchPublications({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState(
    parseInt(year) < 2019 ? "text" : "select"
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedSdg, setSelectedSdg] = useState<string[]>([]);
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof researchPublicationSchema>>({
    resolver: zodResolver(researchPublicationSchema),
    defaultValues: {
      year: "1",
      country: "2",
      journalName: "3",
      title: "4",
      authorName: "5",
      category: "6",
      status: "7",
      issn: "8",
      volume: "9",
      pages: 0,
      affiliation: "11",
      link: "12",
      countries: "13",
      addressing: "14",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof researchPublicationSchema>
  ) => {
    const result = await saveResearchPublications(values, id);
    setSuccess(result?.success);
    setError(result?.error);
    router.refresh();
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
              {/* SELECT YEAR */}
              <div className="w-full lg:w-[35%]">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <FormLabel>Select Year</FormLabel>
                      <Select
                        onValueChange={(selectedValue) => {
                          const selectedYear = selectedValue;
                          setYear(selectedYear.toString());
                          setCategory(
                            Number(selectedYear) < 2019 ? "text" : "select"
                          );
                          fieldValues.onChange(selectedYear);
                        }}
                        //   defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* COUNTRY OF PUB */}
              <div className="w-full lg:w-3/4">
                <SelectInput
                  label="Country of Pub."
                  name="country"
                  control={form.control}
                  items={countries}
                />
              </div>
            </div>
            {/* JOURNAL NAME */}
            <TextInput
              label="Journal Name"
              name="journalName"
              control={form.control}
            />
            {/* BOOK TITLE */}
            <TextInput
              label="Title of Research Paper"
              name="title"
              control={form.control}
            />
            {/* AUTHORS NAME */}
            <TextInput
              label="Author's Name"
              name="authorName"
              control={form.control}
            />
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* CATEGORY */}
              <div className="w-full lg:w-1/2">
                {category === "select" ? (
                  <SelectInput
                    label="Category"
                    name="category"
                    control={form.control}
                    items={["HEC Cat-W", "HEC Cat-X", "HEC Cat-Y", "HEC Cat-Z"]}
                  />
                ) : (
                  <TextInput
                    label="Category"
                    name="category"
                    control={form.control}
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
                    "1st Author",
                    "2nd Author",
                    "3rd Author",
                    "Corr. Author",
                    "Other",
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* ISSN */}
              <div className="w-full lg:w-[40%]">
                <TextInput label="ISSN" name="issn" control={form.control} />
              </div>
              {/* VOLUME */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Volume (Issue) page no(s)"
                  name="volume"
                  control={form.control}
                />
              </div>
              {/* PAGE NO */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Page No(s)"
                  name="pages"
                  type="number"
                  control={form.control}
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
                  items={["No", "Yes"]}
                />
              </div>
              <div className="w-full lg:w-[70%]">
                {/* WEB LINK*/}
                <TextInput
                  label="Web. Link"
                  name="link"
                  control={form.control}
                />
              </div>
            </div>
            {/* OTHER COUNTRIES*/}
            <MultiSelectInput
              label="Other Countries"
              name="countries"
              data={countries}
            />
            {/* ADDRESSING */}
            <MultiSelectInput
              label="Addressing any SDG"
              name="addressing"
              data={SDG}
            />
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
