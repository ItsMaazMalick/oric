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
  validateForm3,
  validateForm9,
} from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm11;

export function Form11CivicEngagementEvent({
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
      title_of_event: "",
      components_address: "",
      outcomes: "",
      collaboration_developed: "",
      date: "",
      name_of_csos: "",
      name_of_sponsoring_agency: "",
      event_status: "",
      report_file: "",
      remarks: "",
      brief_report_file: "",
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
            {/* pi_name */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="event_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Civic Engagement">
                          Civic Engagement
                        </SelectItem>
                        <SelectItem value="Issue of Public Concern">
                          Issue of Public Concern
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* co_pi_university */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="event_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Role of Applicant
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Organizer">Organizer</SelectItem>
                        <SelectItem value="Participant">Participant</SelectItem>
                        <SelectItem value="Resource Person">
                          Resource Person
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* thematic_area */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="title_of_event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title of Event / Initiative
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Title of Event / Initiative"
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
            {/* title_of_research */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="components_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Community Involved
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Community Involved" {...field} />
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
                name="outcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Outcomes
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Case Study">Case Study</SelectItem>
                        <SelectItem value="Policy Advice">
                          Policy Advice
                        </SelectItem>
                        <SelectItem value="Outreach Event">
                          Outreach Event
                        </SelectItem>
                        <SelectItem value="Capacity Building">
                          Capacity Building
                        </SelectItem>
                        <SelectItem value="Any Other">Any Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* pi_department */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">Date</FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="date" placeholder="Date" {...field} />
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
                name="event_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Collaborating Agency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Local Authority">
                          Local Authority
                        </SelectItem>
                        <SelectItem value="Government Department">
                          Government Department
                        </SelectItem>
                        <SelectItem value="Civil Society Organizations">
                          Civil Society Organizations
                        </SelectItem>
                        <SelectItem value="NGO">NGO</SelectItem>
                        <SelectItem value="Any Other">Any Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* co_pi_university */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="event_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Collaborating Agency Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Collaborating Agency Name"
                        {...field}
                      />
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
                name="brief_report_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Brief Report with Pictures
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="file"
                        placeholder="Brief Report"
                        {...field}
                      />
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
