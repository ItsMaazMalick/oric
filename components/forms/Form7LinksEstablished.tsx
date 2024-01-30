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
import { validateForm3, validateForm9 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import SelectInput from "../InputFields/selectInput";

//FORM VALIDATION
const formSchema = validateForm9;

export function Form7LinksEstablished({
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
      type_of_linkage: "",
      location_scope: "",
      host_institution_name: "",
      host_institution_address: "",
      host_institution_country: "",
      collaborating_agency_name: "",
      collaborating_agency_address: "",
      collaborating_agency_country: "",
      filed_of_study: "",
      scope_of_collaboration: "",
      linkage_establishment_date: "",
      salient_features: "",
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
            {/* TYPE OF LINKAGE */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="type_of_linkage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Type of Linkage
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
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* LOCATION SCOPE */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="location_scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Scope
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

            {/* collaborating_agency_name */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="collaborating_agency_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Name of Collaborating Agency
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Name of Collaborating Agency"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* collaborating_agency_country */}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Country of Collaborating Agency"
                name="collaborating_agency_country"
                control={form.control}
                items={countries}
              />
            </div>
            {/* scope_of_collaboration */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="scope_of_collaboration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Scope of Collaboration
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Scope of Collaboration" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* linkage_establishment_date */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="linkage_establishment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Linkage Establishment Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="date"
                        placeholder="Linkage Establishment Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* ANNEX FILE */}
            <div className="w-full">
              <div className="mb-2">
                <label htmlFor="" className="text-xs font-medium sm:text-base">
                  MoU Copy
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
