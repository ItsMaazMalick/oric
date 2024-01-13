"use client";
import { loginUser } from "@/app/actions/user/auth";
import { validateLogin } from "@/lib/validator";
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

type PageProps = {
  register?: string;
};

const formSchema = validateLogin;

const UserLoginForm = (props: PageProps) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const res = await loginUser(formData);
      if (res && res.status !== 200) {
        setError(res.message);
        form.reset();
      }
    } catch (error) {
      setError("Something went wrong");
      // throw new Error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <div className=" text-2xl font-bold p-5">
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
        <div className="w-full mx-auto text-center mb-2 text-green-500">
          <span>Account Registered Successfully.</span>
        </div>
      )}
      {error && (
        <div className="w-full mx-auto text-center mb-2 text-destructive">
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-base">Email</FormLabel>
                <FormControl className="text-xs md:text-base">
                  <Input
                    type="email"
                    placeholder="example@aiou.edu.pk *"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-base" />
              </FormItem>
            )}
          />
        </div>
        {/* Password */}
        <div className="relative">
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-base">
                    Password
                  </FormLabel>
                  <FormControl className="text-xs md:text-base">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-base" />
                </FormItem>
              )}
            />
          </div>
          <div className="absolute top-11 right-4 text-md cursor-pointer text-muted-foreground">
            {showPassword ? (
              <span onClick={() => setShowPassword((prev) => !prev)}>
                <AiFillEyeInvisible />
              </span>
            ) : (
              <span onClick={() => setShowPassword((prev) => !prev)}>
                <AiFillEye />
              </span>
            )}
          </div>
        </div>
        <div>
          <div>
            <FormSubmitButton
              loading={isSubmitting}
              className="flex mx-auto bg-primary text-primary-foreground text-xs md:text-base"
            >
              Login
            </FormSubmitButton>
          </div>
        </div>
      </form>
      <div className="flex my-2 justify-center gap-2 text-xs md:text-base">
        Don&apos;t have an account?
        <Link href={"/user/register"}>
          <div className="text-blue-700 hover:underline font-bold">
            Register
          </div>
        </Link>
      </div>
    </Form>
  );
};

export default UserLoginForm;
