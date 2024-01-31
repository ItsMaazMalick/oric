"use client";
import { verityEmail } from "@/app/actions/user/auth";
import { userVerifyEmailSchema } from "@/lib/validations/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TextInput from "../../InputFields/textInput";
import FormSubmitButton from "../../button/FormSubmitButton";
import { Form } from "../../ui/form";
import UpdatePassword from "./UpdatePassword";

const formSchema = userVerifyEmailSchema;

const UserVerifyEmail = () => {
  const [message, setMessage] = useState<string | undefined>("");
  const [id, setId] = useState<string | undefined>("");
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      cnic: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("cnic", values.cnic);

    const result = await verityEmail(formData);
    console.log(result);
    setSuccess(result.success);
    setMessage(result.message);
    if (result.success) {
      setId(result?.id);
    }
  };

  return (
    <>
      <div className="p-5 text-2xl font-bold ">
        {/* Image */}
        <div className="relative mx-auto w-[120px] h-[100px]">
          <Image
            src={"/images/site-logo.png"}
            alt="ORIC user login"
            fill={true}
          />
        </div>
        <h2 className="text-center text-primary">Forgot Password</h2>
      </div>
      {message && (
        <div className="w-full mx-auto mb-2 text-center text-destructive">
          <span>{message}</span>
        </div>
      )}
      {success ? (
        <UpdatePassword id={id || ""} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="w-full">
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="example@aiou.edu.pk"
                control={form.control}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="CNIC"
                name="cnic"
                placeholder="00000-0000000-0"
                control={form.control}
              />
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-center w-full">
                <FormSubmitButton
                  loading={form.formState.isSubmitting}
                  className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
                >
                  Verify
                </FormSubmitButton>
              </div>
            </div>
          </form>
          <div className="flex justify-center gap-2 my-2 text-xs md:text-base">
            Don&apos;t have an account?
            <Link href={"/user/register"}>
              <div className="font-bold text-blue-700 hover:underline">
                Register
              </div>
            </Link>
          </div>
        </Form>
      )}
    </>
  );
};

export default UserVerifyEmail;
