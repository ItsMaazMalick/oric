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
import { years } from "@/constants/data";
import { validateForm8 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";

//FORM VALIDATION
const formSchema = validateForm8;

export function Form6PolicyAdvocacyORCaseStudies({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState();

  useLayoutEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`/api/user/records/research-publications`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCookie}`,
        },
      });
      const { books } = await res.json();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      name_government_body: "",
      pi_name: "",
      pi_designation: "",
      pi_department: "",
      area_of_advocated: "",
      brief: "",
      coalition_partners: "",
      verification_status: "",
      advocacy_tools: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        const formData = new FormData();
        // formData.append("date", values.date);
        // formData.append("funding_agency", values.funding_agency);
        // formData.append("name_of_research", values.name_of_research);
        // formData.append("status", values.status);
        // formData.append("type", values.type);
        // formData.append("role", values.role);
        // formData.append("grant_amount", String(values.grant_amount));
        // formData.append("title", values.title);
        // formData.append("start_date", values.start_date);
        // formData.append("end_date", values.end_date);
        // formData.append("total_funding", String(values.total_funding));
        // formData.append("collaborating_partner", values.collaborating_partner);
        // formData.append("co_funding_partner", values.co_funding_partner);
        // formData.append("completion", values.completion);
        // formData.append("remarks", values.remarks);
        if (file) {
          formData.set("file", file);
        }
        formData.set("user_id", id);

        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/research-projects`, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: formData,
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
            {/* YEAR*/}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Year."
                name="date"
                control={form.control}
                items={years}
              />
            </div>

            {/* NAME OF GOVERNMENT BODY */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Name of Government body presented"
                name="name_government_body"
                control={form.control}
              />
            </div>

            {/* PI NAME */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Name of Researcher"
                name="pi_name"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* PI DESIGNATION */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Designation of Researcher"
                name="pi_designation"
                control={form.control}
              />
            </div>
            {/* PI DEPARTMENT */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Department of Researcher"
                name="pi_department"
                control={form.control}
              />
            </div>
            {/* AREA ADVOCATED */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Area Advocated"
                name="area_of_advocated"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* BRIEF */}
            <div className="w-full lg:w-[30%]">
              <TextInput label="Brief" name="brief" control={form.control} />
            </div>
            {/* COALITION PARTNER */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Partners in Advocacy Study"
                name="coalition_partners"
                control={form.control}
              />
            </div>
            {/* ADVOCACY TOOLS */}
            <div className="w-full lg:w-[35%]">
              <SelectInput
                label="Advocacy Tools Adopted"
                name="advocacy_tools"
                control={form.control}
                items={[
                  "Briefings",
                  "Meetings",
                  "Websites",
                  "Social Media Debates",
                  "Any Other",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* POLICY FILE */}
            <div className="w-full">
              <div className="mb-2">
                <label htmlFor="" className="text-xs font-medium sm:text-base">
                  Policy / Case Study brief copy
                </label>
              </div>
              <input
                className="w-full p-2 border rounded-md"
                type="file"
                onChange={(e: any) => setFile(e.target.files?.[0])}
                name=""
                id=""
              />
            </div>
          </div>

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
