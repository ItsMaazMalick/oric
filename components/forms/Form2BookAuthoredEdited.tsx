"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SDG, countries, years } from "@/constants/data";
import { validateForm2 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm2;

export function Form2BookAuthoredEdited({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      title_of_book: "",
      title_of_research: "",
      publisher: "",
      country: "",
      role: "",
      isbn: "",
      link: "",
      pages: 0,
      affiliation: "",
      addressing: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/book-authored-edited`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: JSON.stringify({
            date: values.date,
            title_of_book: values.title_of_book,
            title_of_research: values.title_of_research,
            publisher: values.publisher,
            country: values.country,
            role: values.role,
            isbn: values.isbn,
            link: values.link,
            pages: values.pages,
            affiliation: values.affiliation,
            addressing: values.addressing,
            user_id: id,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          toast({
            variant: "success",
            title: data.message,
          });
          form.reset();
          router.refresh();
          // router.push("/user/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
        setLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* ISBN */}
            <div className="w-full lg:w-[40%]">
              <TextInput label="ISBN" name="isbn" control={form.control} />
            </div>
            {/* ROLE */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Applicant Role
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 text-xs border rounded-md sm:text-base"
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="Book Author">Book Author</option>
                <option value="Chapter Author">Chapter Author</option>
                <option value="Book Editor">Book Editor</option>
              </select>
            </div>
            {/* PAGE NO */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Page No(s)"
                name="pages"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* SELECT YEAR */}
            <div className="w-full lg:w-3/4">
              <SelectInput
                label="Year"
                name="date"
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
            name="title_of_book"
            control={form.control}
          />
          {/* TITLE OF RESEARCH PAPER */}
          {author === "Chapter Author" && (
            <TextInput
              label="Title of Chapter"
              name="title_of_research"
              control={form.control}
            />
          )}
          {/* PUBLISHER */}
          <TextInput
            label="Publisher Name"
            name="publisher"
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
              <TextInput label="Web. Link" name="link" control={form.control} />
            </div>
          </div>
          {/* ADDRESSING */}
          <MultiSelectInput label="Addressing any SDG" name="SDG" data={SDG} />

          <div className="">
            <Button
              disabled={loading}
              type="submit"
              className="text-xs sm:text-base"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mx-auto animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
