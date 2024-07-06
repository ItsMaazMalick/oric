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
import { adminSignupSchema } from "@/lib/validations/formValidations";
import { registerAdmin } from "@/app/actions/admin/admin-auth";

const AdminRegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof adminSignupSchema>>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof adminSignupSchema>) => {
    const result = await registerAdmin(values);
    setSuccess(result?.success);
    setError(result?.error);
    form.reset();
    if (result?.success) {
      router.push("/admin/login");
    }
  };

  return (
    <Form {...form}>
      <UserAuthTitle title="Register Here" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Email */}
        <div className="w-full">
          <TextInput label="Username" name="name" control={form.control} />
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
        <div>
          <div className="flex items-center justify-center w-full">
            <FormSubmitButton
              loading={form.formState.isSubmitting}
              className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
            >
              Signup
            </FormSubmitButton>
          </div>
        </div>
      </form>
      <div className="flex justify-center gap-2 mt-2 text-xs md:text-base">
        Already have an account?
        <Link href={"/admin/login"}>
          <div className="font-bold text-blue-700 hover:underline">
            Register
          </div>
        </Link>
      </div>
    </Form>
  );
};

export default AdminRegisterForm;
