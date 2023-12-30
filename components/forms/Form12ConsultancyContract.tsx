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
import { Input } from "@/components/ui/input";
import { validateForm12 } from "@/lib/validator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countries } from "@/constants/data";

//FORM VALIDATION
const formSchema = validateForm12;

export function Form12ConsultancyContract({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState();
  const [role, setRole] = useState("");

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
      title_of_project: "",
      pi_name: "",
      pi_designation: "",
      pi_department: "",
      company_name: "",
      company_country: "",
      contract_value: 0,
      start_date: "",
      end_date: "",
      type_of_consultancy: "",
      key_deliverable_file: "",
      oric_percentage: 0,
      remarks: "",
      annex_page_ref_file: "",
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
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* sponsoring_agency_address */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="type_of_consultancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Consultancy Type
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Consultancy Type" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* thematic_area */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="title_of_project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title of Consultancy Project
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Title of Consultancy Project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* ROLE */}

            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="title_of_project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Applicant Role
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Applicant Role" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* pi_department */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Company Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* co_pi_designation */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="company_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Company Country
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-48">
                        {countries.map((country, index) => (
                          <SelectItem key={index} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* co_pi_department */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="contract_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Contract Value (Rs)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Contract Value (Rs)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* co_pi_university */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Start Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="date" placeholder="Start Date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* sponsoring_agency_name */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      End Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="date" placeholder="End Date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* sponsoring_agency_country */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="key_deliverable_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Key Deliverables
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Key Deliverables" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* sponsoring_agency_address */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Remarks (if any)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Remarks (if any)" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* sponsoring_agency_country */}
            <div className="w-full lg:w-[70%]">
              <FormField
                control={form.control}
                name="annex_page_ref_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Copy of Contract
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="file" placeholder="Proofs" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
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
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
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
