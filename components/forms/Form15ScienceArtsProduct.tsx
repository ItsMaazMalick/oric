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
import {
  validateForm10,
  validateForm11,
  validateForm12,
  validateForm13,
  validateForm14,
  validateForm15,
  validateForm3,
  validateForm9,
} from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm15;

export function Form15ScienceArtsProduct({
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
      title: "",
      lead_name: "",
      lead_designation: "",
      lead_department: "",
      category: "",
      location_scope: "",
      forum: "",
      status: "",
      financial_support: 0,
      field_of_use: "",
      brief_file: "",
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
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value=""></SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* thematic_area */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* title_of_research */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="lead_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Lead Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Lead Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* pi_name */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="lead_designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Lead Designation
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Lead Designation" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* pi_designation */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="lead_department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Lead Department
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Lead Department" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* pi_department */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Category
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Category" {...field} />
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
                name="location_scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      National/International
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="National/International" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* co_pi_department */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="forum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Forum
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Forum" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* co_pi_university */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Status
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Status" {...field} />
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
                name="financial_support"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Financial Support (if any)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Financial Support" {...field} />
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
                name="field_of_use"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Field of Use
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Field of Use" {...field} />
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
                name="brief_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Briefs
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="file" placeholder="Briefs" {...field} />
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
