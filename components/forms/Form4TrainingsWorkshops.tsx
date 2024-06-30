"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries } from "@/constants/data";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import {
  saveTrainingsWorkshops,
  saveTrainingsWorkshopsNill,
} from "@/app/actions/user/records/tranings-workshop";
import { traningsWorkshopSchema } from "@/lib/validations/formValidations";
import MultiSelectInput from "../InputFields/MultiSelectInput";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Form4TrainingsWorkshops({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof traningsWorkshopSchema>>({
    resolver: zodResolver(traningsWorkshopSchema),
    defaultValues: {
      eventType: "1",
      applicantRole: "2",
      startDate: "3",
      endDate: "4",
      eventTitle: "5",
      noOfParticipants: 0,
      majorFocusArea: "6",
      audienceType: "7",
      organizer: "8",
      country: "9",
    },
  });

  const onSubmit = async (values: z.infer<typeof traningsWorkshopSchema>) => {
    const res = await saveTrainingsWorkshops(values, id);
    setNill(false);
    setSuccess(res.success);
    setError(res.error);
    form.reset();
    router.refresh();
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveTrainingsWorkshopsNill(id);
    setSuccess(res.success);
    setError(res.error);
    router.refresh();
  };

  return (
    <>
      <div className="flex items-center w-16 p-2 mb-4 space-x-2 border-2 rounded-md border-primary">
        <Checkbox
          onClick={() => setNill((prev) => !prev)}
          id="nill"
          checked={nill}
        />
        <label
          htmlFor="nill"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nill
        </label>
      </div>
      {nill ? (
        <>
          <div className="flex items-center justify-center w-full font-bold text-destructive">
            All fields are marked as NILL
          </div>
          <div className="mt-2">
            <form onSubmit={handleNill}>
              <div>
                {success && <FormSuccess message={success} className="my-2" />}
                {error && <FormError message={error} className="my-2" />}
                <div className="flex items-center justify-center w-full">
                  <FormSubmitButton
                    loading={form.formState.isSubmitting}
                    className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                  >
                    Submit
                  </FormSubmitButton>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col w-full gap-4 lg:flex-row">
              {/* AUDIENCE TYPE */}
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Type of Event"
                  name="eventType"
                  control={form.control}
                  items={["Training", "Workshop", "Seminar", "Conference"]}
                />
              </div>
              {/* ROLE */}
              <div className="w-full lg:w-[35%]">
                <FormField
                  control={form.control}
                  name="applicantRole"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <FormLabel>Select Role</FormLabel>
                      <Select
                        onValueChange={(selectedValue) => {
                          const selectedRole = selectedValue;
                          setRole(selectedRole);
                          fieldValues.onChange(selectedRole);
                        }}
                        //   defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          <SelectItem value="Organizer">Organizer</SelectItem>
                          <SelectItem value="Participant">
                            Participant
                          </SelectItem>
                          <SelectItem value="Both (Organizer & Participant)">
                            Both (Organizer & Participant)
                          </SelectItem>
                          <SelectItem value="Resource Person">
                            Resource Person
                          </SelectItem>
                          <SelectItem value="Speaker">Speaker</SelectItem>
                          <SelectItem value="Invited / Keynote Speaker">
                            Invited / Keynote Speaker
                          </SelectItem>
                          <SelectItem value="Poster Presenter">
                            Poster Presenter
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* YEAR*/}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Date of Event (from)"
                  name="startDate"
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
                  name="endDate"
                  type="date"
                  control={form.control}
                />
              </div>

              {/* TITLE OF TRAINING*/}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Title of Event"
                  name="eventTitle"
                  control={form.control}
                />
              </div>

              {/* NO OF PARTICIPANTS */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="No. Of Participants"
                  name="noOfParticipants"
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
                  name="majorFocusArea"
                  control={form.control}
                />
              </div>

              {/* AUDIENCE TYPE */}
              <div className="w-full lg:w-[70%]">
                <MultiSelectInput
                  label="Audience Type"
                  name="audienceType"
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
                  name="country"
                  control={form.control}
                  items={countries}
                />
              </div>
            </div>

            <div>
              {success && <FormSuccess message={success} className="my-2" />}
              {error && <FormError message={error} className="my-2" />}
              <div className="flex items-center justify-center w-full">
                <FormSubmitButton
                  loading={form.formState.isSubmitting}
                  className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                >
                  Submit
                </FormSubmitButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
