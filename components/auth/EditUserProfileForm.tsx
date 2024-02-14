"use client";
import React, { FormEvent, useState } from "react";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { faculties } from "@/constants/data";
import BackButton from "../button/BackButton";
import { userRegisterSchema } from "@/lib/validations/userValidations";

const formSchema = userRegisterSchema;

const EditUserProfileForm = ({ user }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [department, setDepartment] = useState<
    Array<{ id: number; title: string; href: string }>
  >([]);
  const [dept, setDept] = useState(user.department);
  const [fact, setFact] = useState(user.faculty);

  // Handle Faculty
  const handleFaculty = (e: any) => {
    const value = e.target.value;
    const faculty = faculties.find((faculty) => faculty.href === value);
    setFact(faculty?.href || "");

    const departments = faculty ? faculty.departments : [];
    setDepartment(departments);
    console.log(departments);
  };

  const handleDepartmentChange = (e: any) => {
    setDept(e.target.value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: user.title,
      name: user.name,
      dob: user.dob,
      password: "",
      confirmPassword: "",
      gender: user.gender,
      phoneNo: user.phoneNo,
      cellNo: user.cellNo,
      researchDomain: user.researchDomain,
      highestDegree: user.highestDegree,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (
        !values.name ||
        !values.dob ||
        !values.password ||
        !values.confirmPassword ||
        !values.gender ||
        !dept ||
        !fact ||
        !values.phoneNo ||
        !values.cellNo ||
        !values.researchDomain ||
        !values.highestDegree
      ) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            dob: values.dob,
            password: values.password,
            gender: values.gender,
            department: dept,
            faculty: fact,
            phoneNo: values.phoneNo,
            cellNo: values.cellNo,
            researchDomain: values.researchDomain,
            highestDegree: values.highestDegree,
          }),
        });
        const data = await res.json();
        if (data.success) {
          form.reset();
          toast({
            variant: "success",
            title: data.message,
          });
          router.refresh();
          router.push("/user/login");
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
    <div className="w-full p-4">
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
          <h2 className="text-center text-primary">Update Your Profile</h2>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
            <div className="w-full lg:w-[10%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dr">Dr</SelectItem>
                        <SelectItem value="Mr">Dr</SelectItem>
                        <SelectItem value="Ms">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* NAME */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-base">Name</FormLabel>
                    <FormControl className="text-xs md:text-base">
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs md:text-base" />
                  </FormItem>
                )}
              />
            </div>

            {/* CNIC */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2">CNIC</div>
              <Input
                disabled
                className="text-xs md:text-base"
                value={user.cnic}
                // onChange={handleCnicChange}
                type="text"
                placeholder="12345-1234567-1"
              />
            </div>
            {/* </div>
          <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row"> */}
            {/* DOB */}
            <div className="w-full lg:w-[30%]">
              <FormField
                disabled
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-base">
                      Date of birth
                    </FormLabel>
                    <FormControl className="text-xs md:text-base">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs md:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center w-full h-10 p-2 text-sm font-bold bg-secondary text-secondary-foreground md:text-xl">
            Basic Information
          </div>
          {/* BASIC INFORMATION */}
          <div className="flex flex-col justify-center w-full gap-4 lg:flex-row">
            {/* GENDER */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* FACULTY */}
            <div className="w-full lg:w-[40%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Faculty
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 mb-3 text-xs border rounded-md sm:text-base"
                onChange={handleFaculty}
              >
                <option defaultValue={fact} value={fact}>
                  {fact.replaceAll("-", " ")}
                </option>
                {faculties.map((faculty, index) => (
                  <option key={index} value={faculty.href}>
                    {faculty.title}
                  </option>
                ))}
              </select>
            </div>
            {/* DEPARTMENT */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Department
              </div>
              <select
                name=""
                id=""
                onChange={handleDepartmentChange}
                className="w-full p-2 mb-3 text-xs border rounded-md sm:text-base"
              >
                <option defaultValue={dept} value={dept}>
                  {dept.replaceAll("-", " ")}
                </option>
                {department.map((dept: any, index: number) => (
                  <option key={index} value={dept.href}>
                    {dept.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full gap-4 lg:flex-row">
            {/* PHONE NO */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-base">
                      Phone No
                    </FormLabel>
                    <FormControl className="text-xs md:text-base">
                      <Input placeholder="Phone No" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs md:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* CELL NO */}
            <div className="w-full lg:w-[40%]">
              <FormField
                control={form.control}
                name="cellNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-base">
                      Cell No
                    </FormLabel>
                    <FormControl className="text-xs md:text-base">
                      <Input placeholder="Cell No" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs md:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* RESEARCH DOMAIN */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="researchDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-base">
                      Research Domain
                    </FormLabel>
                    <FormControl className="text-xs md:text-base">
                      <Input placeholder="Research domain" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs md:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="highestDegree"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-base">
                  Highest Degree
                </FormLabel>
                <FormControl className="text-xs md:text-base">
                  <Input placeholder="Highest degree" {...field} />
                </FormControl>
                <FormMessage className="text-xs md:text-base" />
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={loading}
              className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
              type="submit"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mx-auto animate-spin" />
              ) : (
                `Update`
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserProfileForm;
