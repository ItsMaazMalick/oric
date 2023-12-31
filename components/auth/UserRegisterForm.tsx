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
import { userValidation } from "@/lib/validator";
import { faculties } from "@/constants/data";

const formSchema = userValidation;

const UserRegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidCnic, setIsValidCnic] = useState(true);
  const [faculty, setFaculty] = useState([]);
  const [department, setDepartment] = useState<
    Array<{ id: number; title: string; href: string }>
  >([]);
  const [dept, setDept] = useState("");
  const [fact, setFact] = useState("");

  //EMAIL Validation
  const validateEmail = (inputEmail: any) => {
    const emailRegex = /^[^\s@]+@aiou.edu\.pk$/;
    return emailRegex.test(inputEmail);
  };
  const handleEmailChange = (e: any) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setIsValidEmail(validateEmail(newValue));
  };

  //CNIC Validation
  const validateCnic = (inputCnic: any) => {
    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    return cnicRegex.test(inputCnic);
  };
  const handleCnicChange = (event: any) => {
    let value = event.target.value;
    if (value.length === 5) {
      value = value + "-";
    } else if (value.length === 13) {
      value = value + "-";
    }
    setCnic(value);
    setIsValidCnic(validateCnic(value));
  };

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
      title: "",
      name: "",
      dob: "",
      password: "",
      confirm_password: "",
      gender: "",
      phone_no: "",
      cell_no: "",
      research_domain: "",
      highest_degree: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (
        !email ||
        !cnic ||
        !values.name ||
        !values.dob ||
        !values.password ||
        !values.confirm_password ||
        !values.gender ||
        !dept ||
        !fact ||
        !values.phone_no ||
        !values.cell_no ||
        !values.research_domain ||
        !values.highest_degree
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
            title: values.title,
            name: values.name,
            email,
            cnic,
            dob: values.dob,
            password: values.password,
            gender: values.gender,
            department: dept,
            faculty: fact,
            phone_no: values.phone_no,
            cell_no: values.cell_no,
            research_domain: values.research_domain,
            highest_degree: values.highest_degree,
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
        <h2 className="text-center text-primary">Register your account</h2>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="w-full lg:w-[20%]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-base">Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    //   defaultValue={field.value}
                  >
                    <FormControl className="text-xs sm:text-base">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Title" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dr">Dr</SelectItem>
                      <SelectItem value="">Dr</SelectItem>
                      <SelectItem value="">Dr</SelectItem>
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
          {/* Email */}
          <div className="w-full lg:w-[30%]">
            <div className="mb-2">Email</div>
            <Input
              className="text-xs md:text-base"
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="example@aiou.edu.pk"
            />
            {!isValidEmail && (
              <div className="mt-2 text-xs md:text-base">
                <span className="text-destructive font-medium">
                  Invalid email address
                </span>
              </div>
            )}
          </div>
          {/* CNIC */}
          <div className="w-full lg:w-[20%]">
            <div className="mb-2">CNIC</div>
            <Input
              className="text-xs md:text-base"
              value={cnic}
              onChange={handleCnicChange}
              type="text"
              placeholder="12345-1234567-1"
            />
            {!isValidCnic && (
              <div className="mt-2 text-xs md:text-base">
                <span className="text-destructive font-medium">
                  Invalid CNIC
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
          {/* DOB */}
          <div className="w-full lg:w-[30%]">
            <FormField
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
          {/* Password */}
          <div className="w-full lg:w-[35%]">
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
          </div>
          {/* Confirm Password */}
          <div className="w-full lg:w-[35%]">
            <div className="relative">
              <div>
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs md:text-base">
                        Confirm Password
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
          </div>
        </div>
        <div className="w-full h-10 flex items-center bg-secondary text-secondary-foreground p-2 font-bold text-sm md:text-xl">
          Basic Information
        </div>
        {/* BASIC INFORMATION */}
        <div className="w-full flex flex-col lg:flex-row justify-center  gap-4">
          {/* GENDER */}
          <div className="w-full lg:w-[30%]">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-base">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    //   defaultValue={field.value}
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
              className="w-full p-2 border rounded-md text-xs sm:text-base mb-3"
              onChange={handleFaculty}
            >
              <option value="">Select faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.href}>
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
              className="w-full p-2 border rounded-md text-xs sm:text-base mb-3"
            >
              <option value="">Select department</option>
              {department.map(
                (dept: { id: number; title: string; href: string }) => (
                  <option key={dept.id} value={dept.href}>
                    {dept.title}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-center  gap-4">
          {/* PHONE NO */}
          <div className="w-full lg:w-[30%]">
            <FormField
              control={form.control}
              name="phone_no"
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
              name="cell_no"
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
              name="research_domain"
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
          name="highest_degree"
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
            className="flex mx-auto bg-primary text-primary-foreground text-xs md:text-base"
            type="submit"
          >
            {loading ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              `Register`
            )}
          </Button>
        </div>
      </form>
      <div className="flex my-2 justify-center gap-2 text-xs md:text-base">
        Already have an account?
        <Link href={"/user/login"}>
          <div className="text-blue-700 hover:underline font-bold">Log In</div>
        </Link>
      </div>
    </Form>
  );
};

export default UserRegisterForm;
