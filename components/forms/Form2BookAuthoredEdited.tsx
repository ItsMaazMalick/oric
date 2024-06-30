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
import { SDG, countries, years } from "@/constants/data";
import { validateForm2 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
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
} from "@/app/actions/user/records/book-authored-edited";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Form2BookAuthoredEdited({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof bookAuthoredSchema>>({
    resolver: zodResolver(bookAuthoredSchema),
    defaultValues: {
      isbn: "",
      role: "",
      pages: 0,
      year: "",
      country: "",
      bookTitle: "",
      chapterTitle: "",
      publisherName: "",
      affiliation: "",
      link: "",
      addressing: "SDG",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookAuthoredSchema>) => {
    const result = await saveBookAuthoredEdited(values, id);
    setSuccess(result?.success);
    setError(result?.error);
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveBookAuthoredEditedNill(id);
    setSuccess(res.success);
    setError(res.error);
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
              {/* ISBN */}
              <div className="w-full lg:w-[40%]">
                <TextInput label="ISBN" name="isbn" control={form.control} />
              </div>
              {/* ROLE */}
              <div className="w-full lg:w-[30%]">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <FormLabel>Applicant Role</FormLabel>
                      <Select
                        onValueChange={(selectedValue) => {
                          const selectedAuthor = selectedValue;
                          setAuthor(selectedAuthor);
                          fieldValues.onChange(selectedAuthor);
                        }}
                        //   defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Book Author">
                            Book Author
                          </SelectItem>
                          <SelectItem value="Chapter Author">
                            Chapter Author
                          </SelectItem>
                          <SelectItem value="Book Editor">
                            Book Editor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* PAGE NO */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Page No(s)"
                  name="pages"
                  control={form.control}
                  type="number"
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
            {/* BOOK TITLE */}
            <TextInput
              label="Book Title"
              name="bookTitle"
              control={form.control}
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
            />

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
            {/* ADDRESSING */}
            <MultiSelectInput
              label="Addressing any SDG"
              name="SDG"
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
