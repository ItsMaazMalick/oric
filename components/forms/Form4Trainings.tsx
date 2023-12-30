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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { countries } from "@/constants/data";

//FORM VALIDATION
const formSchema = validateForm4;

export function Form4Trainings({
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
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* AUDIENCE TYPE */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="audience_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Type of Event
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
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Conference">Conference</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Date of Event (from)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="date"
                        placeholder="Date of Event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* YEAR*/}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Date of Event (to)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="date"
                        placeholder="Date of Event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* TITLE OF TRAINING*/}
            <div className="w-full lg:w-[40%]">
              <FormField
                control={form.control}
                name="title_of_training"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title of Event
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Title of Event" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* NO OF PARTICIPANTS */}
            <div className="w-full lg:w-[20%]">
              <FormField
                control={form.control}
                name="no_of_participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      No. Of Participants
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="No. Of Participants"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* MAJOR FOCUS */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="focus_area_outcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Major Focus Area
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Major Focus Area" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* AUDIENCE TYPE */}
            <div className="w-full lg:w-[20%]">
              <FormField
                control={form.control}
                name="audience_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Audience Type
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
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Faculty">Faculty</SelectItem>
                        <SelectItem value="Researchers">Researchers</SelectItem>
                        <SelectItem value="Community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* ORGANIZER */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Organizer
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Organizer" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* COUNTRY */}
            <div className="w-full lg:w-1/2">
              <FormField
                control={form.control}
                name="audience_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Country
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
