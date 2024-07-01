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
import { validateForm19 } from "@/lib/validator";
import { FormEvent, useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { studentOrganizationSchema } from "@/lib/validations/formValidations";
import TextInput from "../InputFields/textInput";
import SelectInput from "../InputFields/selectInput";
import Link from "next/link";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  saveStudentOrganization,
  saveStudentOrganizationNill,
} from "@/app/actions/user/records/student-organization";

export function Form19StudentOrganizations({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [nill, setNill] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof studentOrganizationSchema>>({
    resolver: zodResolver(studentOrganizationSchema),
    defaultValues: {
      organizationName: "",
      noOfMenbers: 0,
      membersName: "",
      role: "",
      objectives: "",
      link: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof studentOrganizationSchema>
  ) => {
    if (!file) {
      alert("Image is required");
      setError("Image is required");
      return;
    } else {
      const res = await saveStudentOrganization(values, file, id);
      setNill(false);
      setFile("");
      setSuccess(res.success);
      setError(res.error);
      form.reset();
      router.refresh();
    }
  };

  const handleNill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNill(false);

    const res = await saveStudentOrganizationNill(id);
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
            <div className="flex flex-col lg:flex-row w-full gap-4">
              {/* ORGANIZATION NAME */}
              <div className="w-full lg:w-[30%]">
                <TextInput
                  label="Organization Name"
                  name="organizationName"
                  control={form.control}
                />
              </div>

              {/* NUMBER OF MEMBERS */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="No of Members"
                  name="noOfMenbers"
                  control={form.control}
                  type="number"
                />
              </div>

              {/* MEMBERS NAME */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Members Name"
                  name="membersName"
                  control={form.control}
                  description="Separate Name wirth Comma ( , )"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full lg:w-[30%]">
                <SelectInput
                  label="Role of Applicant"
                  name="role"
                  control={form.control}
                  items={["Coordinator", "Member", "Any Other"]}
                />
              </div>
              {/* OBJECTIVE */}
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Objectives"
                  name="objectives"
                  control={form.control}
                />
              </div>
              <div className="w-full lg:w-[35%]">
                <TextInput
                  label="Weblink (if any)"
                  name="link"
                  control={form.control}
                />
              </div>
              {/* PROOFS*/}
            </div>
            {file ? (
              <Link
                href={file}
                target="_blank"
                className="text-secondary-foreground bg-secondary w-full lg:w-[50%] rounded-md h-10 mt-8 flex justify-center items-center"
              >
                File Uploaded
              </Link>
            ) : (
              <div className="text-black bg-primary w-full lg:w-[50%] rounded-md h-10 flex justify-center items-center mt-8">
                <UploadButtonComponent image={file} setImage={setFile} />
              </div>
            )}

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
