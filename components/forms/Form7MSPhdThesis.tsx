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
import { validateForm7 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm7;

export function Form7MSPhdThesis({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
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
      level_of_degree: "",
      date: "",
      department: "",
      university: "",
      student_name: "",
      degree_stage: "",
      degree_program: "",
      supervisor: "",
      co_supervisor: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
            {/* ROLE */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Applicant Role
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 border rounded-md text-xs sm:text-base"
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="Co-Supervisor">Co-Supervisor</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Member Supervisory Committee">
                  Member Supervisory Committee
                </option>
              </select>
            </div>
            {/* CO_SUPERVISOR */}
            {role !== "Supervisor" && (
              <div className="w-full lg:w-[35%]">
                <FormField
                  control={form.control}
                  name="co_supervisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-base">
                        Name of Supervisor
                      </FormLabel>
                      <FormControl className="text-xs sm:text-base">
                        <Input placeholder="Name of Supervisor" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-base" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* YEAR*/}
            <div
              className={`w-full lg:${
                role !== "Supervisor" ? "w-[35%]" : "w-[70%]"
              }`}
            >
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
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* LEVEL OF DEGREE*/}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="level_of_degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Level of Degree
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BS">BS</SelectItem>
                        <SelectItem value="Masters (16 years)">
                          Masters (16 years)
                        </SelectItem>
                        <SelectItem value="Masters (18 years)">
                          Masters (18 years)
                        </SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* DEGREE PROGRAM */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="degree_program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Degree Program
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Degree Program" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* DEPARTMENT */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Department
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Department" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* UNIVERSITY*/}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      University
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="University" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* STUDENT NAME */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="student_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Student Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Student Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* DEGREE STAGE */}
            <div className="w-full lg:w-[35%]">
              <FormField
                control={form.control}
                name="degree_stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Degree Stage
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
                        <SelectItem value="Synopsis Approved">
                          Synopsis Approved
                        </SelectItem>

                        <SelectItem value="Research Work Completed">
                          Research Work Completed
                        </SelectItem>
                        <SelectItem value="Thesis Submitted">
                          Thesis Submitted
                        </SelectItem>
                        <SelectItem value="Degree Awarded">
                          Degree Awarded
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
