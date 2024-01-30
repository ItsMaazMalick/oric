"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SDG, countries, years } from "@/constants/data";
import { validateForm1 } from "@/lib/validator";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import MultiSelectInput from "../InputFields/MultiSelectInput";

//FORM VALIDATION
const formSchema = validateForm1;

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
  const [error, setError] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedSdg, setSelectedSdg] = useState<string[]>([]);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      journal_name: "",
      title: "",
      authors: "",
      category: "",
      status: "",
      issn: "",
      volume: "",
      page_no: 0,
      affiliation: "",
      link: "",
      country: "",
      addressing: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values || !year) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/research-publications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: JSON.stringify({
            date: year,
            journal_name: values.journal_name,
            title: values.title,
            authors: values.authors,
            category: values.category,
            status: values.status,
            issn: values.issn,
            volume: values.volume,
            page_no: values.page_no,
            affiliation: values.affiliation,
            link: values.link,
            country: values.country,
            other_countries: selectedCountries,
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

  const handleYearChange = (e: any) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear.toString());
    setCategory(selectedYear < 2019 ? "text" : "select");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* SELECT YEAR */}
            <div className="w-full lg:w-[35%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Year
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 text-xs border rounded-md sm:text-base"
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
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
            name="journal_name"
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
            name="authors"
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
                name="page_no"
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
              <TextInput label="Web. Link" name="link" control={form.control} />
            </div>
          </div>
          {/* OTHER COUNTRIES*/}
          <MultiSelectInput
            label="Other Countries"
            name="Country"
            data={countries}
          />
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
