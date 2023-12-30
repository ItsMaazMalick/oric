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
import { SDG, years } from "@/constants/data";
import { validateForm3 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm3;

export function Form3ResearchProjects({
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
      funding_agency: "",
      name_of_research: "",
      status: "",
      type: "",
      role: "",
      grant_amount: 0,
      title: "",
      start_date: "",
      end_date: "",
      total_funding: 0,
      collaborating_partner: "",
      co_funding_partner: "",
      completion: "",
      remarks: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        const formData = new FormData();
        formData.append("date", values.date);
        formData.append("funding_agency", values.funding_agency);
        formData.append("name_of_research", values.name_of_research);
        formData.append("status", values.status);
        formData.append("type", values.type);
        formData.append("role", values.role);
        formData.append("grant_amount", String(values.grant_amount));
        formData.append("title", values.title);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);
        formData.append("total_funding", String(values.total_funding));
        formData.append("collaborating_partner", values.collaborating_partner);
        formData.append("co_funding_partner", values.co_funding_partner);
        formData.append("completion", values.completion);
        formData.append("remarks", values.remarks);
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
            {/* YEAR*/}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Year.
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-48">
                        {years.map((year) => (
                          <SelectItem key={year.id} value={year.name}>
                            {year.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* FUNDING AGENCY */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="funding_agency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Funding Agency
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Funding Agency" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* RESEARCH NAME */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="name_of_research"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Name of Research Grant
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Name of Research Grant" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* STATUS */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* TYPE */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="National">National</SelectItem>
                        <SelectItem value="International">
                          International
                        </SelectItem>
                        <SelectItem value="Internal">Internal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* ROLE */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Application Role
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
                        <SelectItem value="PI">PI</SelectItem>
                        <SelectItem value="Co-PI">Co-PI</SelectItem>
                        <SelectItem value="Consultant">Consultant</SelectItem>
                        <SelectItem value="Collaborator">
                          Collaborator
                        </SelectItem>
                        <SelectItem value="Team Lead">Team Lead</SelectItem>
                        <SelectItem value="Team Member">Team Member</SelectItem>
                        <SelectItem value="Any Other">Any Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* GRANT AMOUNT */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="grant_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Grant Amount (Rs)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Grant Amount (Rs)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* TITLE */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title of Research Project
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Title of Research Project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* START DATE */}
            <div className="w-full lg:w-[35%]">
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
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* END DATE */}
            <div className="w-full lg:w-[30%]">
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
            {/* TOTAL FUNDING */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="total_funding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Total Funding (Rs)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Total Funding (Rs)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* COLLABORATING PARTNER */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="collaborating_partner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Collaborating Partner
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Collaborating Partner" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* CO-FUNDING PARTNER */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="co_funding_partner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Co-Funding Partner
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Co-Funding Partner" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* COMPLETION*/}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="completion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Completion
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* REMARKS*/}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Remarks (if any)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Remarks" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Addressing any SDG
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
                      <SelectContent className="h-48">
                        {SDG.map((sdg, index) => (
                          <SelectItem key={index} value={sdg.name}>
                            {sdg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* ANNEX FILE */}
            <div className="w-full lg:w-[70%]">
              <div className="mb-2">
                <label htmlFor="" className="text-xs sm:text-base font-medium">
                  Submission Proof / Award Letter / Completion Certificate
                </label>
              </div>
              <input
                className="w-full p-2 rounded-md border"
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
