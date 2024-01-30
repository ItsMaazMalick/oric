"use client";
import { loginUser } from "@/app/actions/user/auth";
import { userLoginSchema } from "@/lib/validations/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as z from "zod";
import FormSubmitButton from "../button/FormSubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import TextInput from "../InputFields/textInput";
import MultiSelectInput from "../InputFields/MultiSelectInput";

type PageProps = {
  register?: string;
};

const formSchema = userLoginSchema;

const UserLoginForm = (props: PageProps) => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const result = await loginUser(formData);
    setMessage(result?.message);
  };

  return (
    <Form {...form}>
      <div className="p-5 text-2xl font-bold ">
        {/* Image */}
        <div className="relative mx-auto w-[120px] h-[100px]">
          <Image
            src={"/images/site-logo.png"}
            alt="ORIC user login"
            fill={true}
          />
        </div>
        <h2 className="text-center text-primary">Login your account</h2>
      </div>
      {props?.register && (
        <div className="w-full mx-auto mb-2 text-center text-green-500">
          <span>Account Registered Successfully.</span>
        </div>
      )}
      {message && (
        <div className="w-full mx-auto mb-2 text-center text-destructive">
          <span>{message}</span>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="w-full">
          <TextInput
            label="example@aiou.edu.pk"
            name="email"
            type="email"
            control={form.control}
          />
        </div>
        {/* Password */}
        <div className="relative">
          <div>
            <TextInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              control={form.control}
            />
          </div>
          <div className="absolute cursor-pointer top-11 right-4 text-md text-muted-foreground">
            {showPassword ? (
              <span onClick={() => setShowPassword((prev) => !prev)}>
                <AiFillEye />
              </span>
            ) : (
              <span onClick={() => setShowPassword((prev) => !prev)}>
                <AiFillEyeInvisible />
              </span>
            )}
          </div>
        </div>
        <div>
          <div>
            <FormSubmitButton
              loading={form.formState.isSubmitting}
              className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
            >
              Login
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
  );
};

export default UserLoginForm;
