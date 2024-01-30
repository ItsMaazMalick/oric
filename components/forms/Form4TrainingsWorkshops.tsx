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
import { validateForm4 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { countries } from "@/constants/data";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import MultiSelectInput from "../InputFields/MultiSelectInput";

//FORM VALIDATION
const formSchema = validateForm4;

export function Form4TrainingsWorkshops({
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
      title_of_training: "",
      date: "",
      organizer: "",
      no_of_participants: 0,
      focus_area_outcomes: "",
      audience_type: "",
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
            title_of_training: values.title_of_training,
            date: values.date,
            organizer: values.organizer,
            no_of_participants: values.no_of_participants,
            focus_area_outcomes: values.focus_area_outcomes,
            audience_type: values.audience_type,
            user_id: id,
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
            {/* AUDIENCE TYPE */}
            <div className="w-full lg:w-[30%]">
              <SelectInput
                label="Type of Event"
                name="audience_type"
                control={form.control}
                items={["Training", "Workshop", "Seminar", "Conference"]}
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
                className="w-full p-2 text-xs border rounded-md sm:text-base"
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled value="">
                  Select Value
                </option>
                <option value="Organizer">Organizer</option>
                <option value="Participant">Participant</option>
                <option value="Both (Organizer & Participant)">
                  Both (Organizer & Participant)
                </option>
                <option value="Resource Person">Resource Person</option>
                <option value="Speaker">Speaker</option>
                <option value="Invited / Keynote Speaker">
                  Invited / Keynote Speaker
                </option>
                <option value="Poster Presenter">Poster Presenter</option>
              </select>
            </div>
            {/* YEAR*/}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Date of Event (from)"
                name="date"
                type="date"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* YEAR*/}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Date of Event (to)"
                name="date"
                type="date"
                control={form.control}
              />
            </div>

            {/* TITLE OF TRAINING*/}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="Title of Event"
                name="title_of_training"
                control={form.control}
              />
            </div>

            {/* NO OF PARTICIPANTS */}
            <div className="w-full lg:w-[35%]">
              <TextInput
                label="No. Of Participants"
                name="no_of_participants"
                type="number"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* MAJOR FOCUS */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Major Focus Area"
                name="focus_area_outcomes"
                control={form.control}
              />
            </div>

            {/* AUDIENCE TYPE */}
            <div className="w-full lg:w-[70%]">
              <MultiSelectInput
                label="Audience Type"
                name="Audience"
                data={["Student", "Faculty", "Researchers", "Community"]}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            {/* ORGANIZER */}
            <div className="w-full lg:w-[30%]">
              <TextInput
                label="Organizer"
                name="organizer"
                control={form.control}
              />
            </div>
            {/* COUNTRY */}
            <div className="w-full lg:w-[70%]">
              <SelectInput
                label="Country"
                name="audience_type"
                control={form.control}
                items={countries}
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
