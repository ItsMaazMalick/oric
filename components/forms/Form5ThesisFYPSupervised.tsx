"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveThesis,
  saveThesisNill,
  updateThesis,
} from "@/app/actions/user/records/thesis";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { years } from "@/constants/data";
import { thesisSchema } from "@/lib/validations/formValidations";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { DynamicSelectInput } from "../InputFields/dynamicselectInput";

export function Form5ThesisFYPSupervised({
  id,
  updateData,
}: {
  id: string;
  updateData?: any;
}) {
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof thesisSchema>>({
    resolver: zodResolver(thesisSchema),
    defaultValues: {
      role: updateData?.role || "",
      nameOfSupervisor: updateData?.nameOfSupervisor || "",
      year: updateData?.year || "",
      degreeLevel: updateData?.degreeLevel || "",
      degreeProgram: updateData?.degreeProgram || "",
      department: updateData?.department || "",
      university: updateData?.university || "",
      studentName: updateData?.studentName || "",
      degreeStage: updateData?.degreeStage || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof thesisSchema>) => {
    if (updateData) {
      const result = await updateThesis(values, updateData.id);
      setSuccess(result?.success);
      setError(result?.error);
      router.push("/user/dashboard/add-record");
    } else {
      const res = await saveThesis(values, id);
      setNill(false);
      setSuccess(res.success);
      setError(res.error);
      form.reset();
      router.refresh();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveThesisNill(id);
    setSuccess(res.success);
    setError(res.error);
    router.refresh();
  };

  return (
    <>
      {!updateData && (
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
      )}
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
              {/* ROLE */}
              <div className="w-full lg:w-[30%]">
                <DynamicSelectInput
                  label="Applicant Role"
                  name="role"
                  control={form.control}
                  items={[
                    "Co-Supervisor",
                    "Supervisor",
                    "Member Supervisory Committee",
                  ]}
                  data={role}
                  setData={setRole}
                  required
                />
              </div>
              {/* CO_SUPERVISOR */}
              {role !== "Supervisor" && (
                <div className="w-full lg:w-[35%]">
                  <TextInput
                    label="Name of Supervisor"
                    name="nameOfSupervisor"
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
                  name="year"
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
                  name="degreeLevel"
                  control={form.control}
                  items={[
                    { value: "BS", label: "BS" },
                    {
                      value: "Masters (16 years)",
                      label: "Masters (16 years)",
                    },
                    {
                      value: "Masters (18 years)",
                      label: "Masters (18 years)",
                    },
                    { value: "PhD", label: "PhD" },
                  ]}
                />
              </div>
              {/* DEGREE PROGRAM */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Degree Program"
                  name="degreeProgram"
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
                  name="studentName"
                  control={form.control}
                />
              </div>
              {/* DEGREE STAGE */}
              <div className="w-full lg:w-[35%]">
                <SelectInput
                  label="Degree Stage"
                  name="degreeStage"
                  control={form.control}
                  items={[
                    { value: "Synopsis Approved", label: "Synopsis Approved" },
                    {
                      value: "Research Work Completed",
                      label: "Research Work Completed",
                    },
                    { value: "Thesis Submitted", label: "Thesis Submitted" },
                    { value: "Degree Awarded", label: "Degree Awarded" },
                  ]}
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
                  {updateData ? "Update" : "Submit"}
                </FormSubmitButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
