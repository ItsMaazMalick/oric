"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import { validateLogin } from "@/lib/validator";

const formSchema = validateLogin;

const UserLoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values.email || !values.password) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({
          variant: "default",
          title: `Please wait...`,
        });
        const res = await fetch(`/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (data.success) {
          form.reset();
          router.refresh();
          router.push("/user/dashboard");
          toast({
            variant: "success",
            title: data.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
          setLoading(false);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
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
            <Button
              disabled={loading}
              className="flex mx-auto bg-primary text-primary-foreground text-xs md:text-base"
              type="submit"
            >
              {loading ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
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
