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
import { validateForm10, validateForm3, validateForm9 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm10;

export function Form10ContractResearch({
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
      thematic_area: "",
      title_of_research: "",
      pi_name: "",
      pi_designation: "",
      pi_department: "",
      co_pi_designation: "",
      co_pi_department: "",
      co_pi_university: "",
      sponsoring_agency_name: "",
      sponsoring_agency_address: "",
      sponsoring_agency_country: "",
      location_scope: "",
      counterpart_industry_address: "",
      counterpart_industry_country: "",
      start_date: "",
      end_date: "",
      total_amount_approved: 0,
      date_of_contract: "",
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
            {/* location_scope */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="location_scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      National/International
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Scope" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="National">National</SelectItem>
                        <SelectItem value="International">
                          International
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* sponsoring_agency_country */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="sponsoring_agency_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Sponsoring Agency Country
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
            {/* sponsoring_agency_name */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="sponsoring_agency_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Contract Awarding Agency
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Contract Awarding Agency"
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
                name="title_of_research"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title of of Contract Research
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Title of Contract Research"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* total_amount_approved */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="total_amount_approved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Amount of Contract Award (Rs)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Amount of Contract Award (Rs)"
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
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Applicant Role
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 border rounded-md text-xs sm:text-base"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="PI">PI</option>
                <option value="Co-PI">Co-PI</option>
              </select>
            </div>
          </div>
          {role !== "PI" && (
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* pi_name */}
              <div className="w-full lg:w-[30%]">
                <FormField
                  control={form.control}
                  name="pi_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-base">
                        Name of PI
                      </FormLabel>
                      <FormControl className="text-xs sm:text-base">
                        <Input placeholder="Name of PI" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-base" />
                    </FormItem>
                  )}
                />
              </div>
              {/* pi_designation */}
              <div className="w-full lg:w-[35%]">
                <FormField
                  control={form.control}
                  name="pi_designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-base">
                        Designation of PI
                      </FormLabel>
                      <FormControl className="text-xs sm:text-base">
                        <Input placeholder="Designation of PI" {...field} />
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
                  name="pi_department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-base">
                        Organization / Institution of PI
                      </FormLabel>
                      <FormControl className="text-xs sm:text-base">
                        <Input
                          placeholder="Organization / Institution of PI"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* start_date */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Starting Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="date"
                        placeholder="Starting Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* end_date */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Ending Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input type="date" placeholder="Ending Date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* date_of_contract */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="date_of_contract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Date of Contract
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="date"
                        placeholder="Date of Contract"
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
            {/* Contract Research Agreement Copy */}
            <div className="w-full">
              <div className="mb-2">
                <label htmlFor="" className="text-xs sm:text-base font-medium">
                  Contract Research Agreement Copy
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
