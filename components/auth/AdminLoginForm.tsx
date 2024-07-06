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
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Form } from "../ui/form";
import UserAuthTitle from "./UserAuthTitle";
import { useRouter } from "next/navigation";
import { adminLoginSchema } from "@/lib/validations/formValidations";
import { FormSuccess } from "../forms/FormSuccess";
import { FormError } from "../forms/FormError";
import { loginAdmin } from "@/app/actions/admin/admin-auth";

const AdminLoginForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof adminLoginSchema>) => {
    const result = await loginAdmin(values);
    setSuccess(result?.success);
    setError(result?.error);
    form.reset();
    if (result?.success) {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <UserAuthTitle title="Login Here" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        {/* <Link href={"/user/forgot-password"} className="text-xs md:text-sm">
          <span className="mt-1 text-blue-600 ">Forgot Password?</span>
        </Link> */}
        <div>
          {success && <FormSuccess message={success} className="my-2" />}
          {error && <FormError message={error} className="my-2" />}
          <div className="flex items-center justify-center w-full">
            <FormSubmitButton
              loading={form.formState.isSubmitting}
              className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
            >
              Login
            </FormSubmitButton>
          </div>
        </div>
      </form>
      <div className="flex justify-center gap-2 mt-2 text-xs md:text-base">
        Don&apos;t have an account?
        <Link href={"/admin/signup"}>
          <div className="font-bold text-blue-700 hover:underline">
            Register
          </div>
        </Link>
      </div>
    </Form>
  );
};

export default AdminLoginForm;
