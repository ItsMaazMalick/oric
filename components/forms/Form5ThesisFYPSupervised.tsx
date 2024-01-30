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
import TextInput from "../InputFields/textInput";
import SelectInput from "../InputFields/selectInput";

//FORM VALIDATION
const formSchema = validateForm7;

export function Form5ThesisFYPSupervised({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");

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
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* ROLE */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Applicant Role
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 text-xs border rounded-md sm:text-base"
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
                <TextInput
                  label="Name of Supervisor"
                  name="co_supervisor"
                  control={form.control}
                />
              </div>
            )}

            {/* YEAR*/}
            <div
              className={`w-full lg:${
                role !== "Supervisor" ? "w-[35%]" : "w-[70%]"
              }`}
            >
              <SelectInput
                label="Year."
                name="date"
                control={form.control}
                items={years}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* LEVEL OF DEGREE*/}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Level of Degree"
                name="level_of_degree"
                control={form.control}
                items={[
                  "BS",
                  "Masters (16 years)",
                  "Masters (18 years)",
                  "PhD",
                ]}
              />
            </div>
            {/* DEGREE PROGRAM */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Degree Program"
                name="degree_program"
                control={form.control}
              />
            </div>

            {/* DEPARTMENT */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Department"
                name="department"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* UNIVERSITY*/}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="University"
                name="university"
                control={form.control}
              />
            </div>
            {/* STUDENT NAME */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Student Name"
                name="student_name"
                control={form.control}
              />
            </div>
            {/* DEGREE STAGE */}
            <div className="w-full lg:w-[35%]">
              <SelectInput
                label="Degree Stage"
                name="degree_stage"
                control={form.control}
                items={[
                  "Synopsis Approved",
                  "Research Work Completed",
                  "Thesis Submitted",
                  "Degree Awarded",
                ]}
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
