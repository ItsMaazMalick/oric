"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";

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
import { validateForm18 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

//FORM VALIDATION
const formSchema = validateForm18;

export function Form18MentorshipProgrammes({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState();
  const [nill, setNill] = useState<boolean>(false);

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
      program_name: "",
      no_of_students: 0,
      details: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      if (nill) {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        console.log(values);
        toast({
          variant: "success",
          title: "Submitted Successfully",
        });
        setLoading(false);
      } else {
        if (!values) {
          toast({ variant: "destructive", title: "All fields are required" });
        } else {
          setLoading(true);
          toast({ variant: "default", title: "Please wait..." });
          const res = await fetch(`/api/user/records/trainings-workshops`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userCookie}`,
            },
            body: JSON.stringify({
              // title_of_training: values.title_of_training,
              // date: values.date,
              // organizer: values.organizer,
              // no_of_participants: values.no_of_participants,
              // focus_area_outcomes: values.focus_area_outcomes,
              // audience_type: values.audience_type,
              // user_id: id,
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
            // toast({
            //   variant: "destructive",
            //   title: data.message,
            // });
            toast({
              variant: "success",
              title: "Success",
            });
          }
          setLoading(false);
        }
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
          <div className="flex items-center space-x-2 p-2 w-16 border-2 border-primary rounded-full">
            <Checkbox onClick={() => setNill((prev) => !prev)} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nill
            </label>
          </div>
          {!nill && (
            <>
              <div className="flex flex-col lg:flex-row w-full gap-4">
                {/* PROGRAM NAME */}
                <div className="w-full lg:w-[30%]">
                  <FormField
                    control={form.control}
                    name="program_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-base">
                          Program Name
                        </FormLabel>
                        <FormControl className="text-xs sm:text-base">
                          <Input placeholder="Program Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-base" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* NUMBER OF STUDENTS */}
                <div className="w-full lg:w-[35%]">
                  <FormField
                    control={form.control}
                    name="no_of_students"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-base">
                          No of Students
                        </FormLabel>
                        <FormControl className="text-xs sm:text-base">
                          <Input
                            type="number"
                            placeholder="No of Students"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-base" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* DETAILS */}
                <div className="w-full lg:w-[35%]">
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-base">
                          Details
                        </FormLabel>
                        <FormControl className="text-xs sm:text-base">
                          <Input placeholder="Details" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-base" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-2">
                  <label
                    htmlFor=""
                    className="text-xs sm:text-base font-medium"
                  >
                    Evidence
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
            </>
          )}
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
