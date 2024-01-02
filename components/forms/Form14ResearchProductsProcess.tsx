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
  validateForm3,
  validateForm9,
} from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm14;

export function Form14ResearchProductsProcess({
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
      lead_inventor_name: "",
      lead_inventor_designation: "",
      lead_inventor_department: "",
      title_on_invention: "",
      ip_category: "",
      development_status: "",
      key_scientific_aspects: "",
      location_scope: "",
      field_of_use: "",
      collaborating_partner_name: "",
      collaborating_partner_details: "",
      financial_support: 0,
      remarks: "",
      pd_proof_file: "",
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
                name="lead_inventor_name"
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
                        <SelectItem value="Architetural Designs">
                          Architetural Designs
                        </SelectItem>
                        <SelectItem value="Assesment Tools">
                          Assesment Tools
                        </SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Softwares">Softwares</SelectItem>
                        <SelectItem value="Apps">Apps</SelectItem>
                        <SelectItem value="Video Lectures">
                          Video Lectures
                        </SelectItem>
                        <SelectItem value="Art Designs">Art Designs</SelectItem>
                        <SelectItem value="Any Other">Any Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="lead_inventor_name"
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
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Process">Process</SelectItem>
                        <SelectItem value="Prototype">Prototype</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="lead_inventor_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Development Status
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
                        <SelectItem value="Prefeasibility">
                          Prefeasibility
                        </SelectItem>
                        <SelectItem value="Industrial Scale Testing">
                          Industrial Scale Testing
                        </SelectItem>
                        <SelectItem value="Prototype Development">
                          Prototype Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                name="lead_inventor_name"
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
            {/* thematic_area */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="lead_inventor_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Names of inventors
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Names of inventors" {...field} />
                    </FormControl>
                    <FormDescription>Separate with comma ( , )</FormDescription>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* pi_designation */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="title_on_invention"
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
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* co_pi_department */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="key_scientific_aspects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Key Scientific Aspects
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Key Scientific Aspects" {...field} />
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

            {/* sponsoring_agency_address */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="collaborating_partner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Collaborating Partner Name (if any)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Collaborating Partner Name (if any)"
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
            {/* sponsoring_agency_country */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="financial_support"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Financial Support from Partner (Rs)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Financial Support from Partner (Rs)"
                        {...field}
                      />
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
                name="pd_proof_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Evidence File
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
