"use client";
import { registerUser } from "@/app/actions/user/auth";
import { faculties } from "@/constants/data";
import { userRegisterSchema } from "@/lib/validations/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as z from "zod";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import UserAuthTitle from "./UserAuthTitle";

const formSchema = userRegisterSchema;

const UserRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidCnic, setIsValidCnic] = useState(true);
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
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("name", values.name);
      formData.append("email", email);
      formData.append("cnic", cnic);
      formData.append("dob", values.dob);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      formData.append("gender", values.gender);
      formData.append("department", dept);
      formData.append("faculty", fact);
      formData.append("phone_no", values.phone_no);
      formData.append("cell_no", values.cell_no);
      formData.append("research_domain", values.research_domain);
      formData.append("highest_degree", values.highest_degree);

      const result = await registerUser(formData);
      toast({
        title: result.message,
        variant: result.success ? "success" : "destructive",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Internal Server Error",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <UserAuthTitle title="Register Account" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
          <div className="w-full lg:w-[20%]">
            <SelectInput
              label="Title"
              name="title"
              control={form.control}
              items={["Dr", "Mr", "Ms", "Mrs"]}
            />
          </div>
          {/* NAME */}
          <div className="w-full lg:w-[30%]">
            <TextInput label="Name" name="name" control={form.control} />
          </div>
          {/* Email */}
          <div className="w-full lg:w-[30%]">
            <div className="mb-2 text-xs md:text-base md:font-medium">
              Email
            </div>
            <Input
              className="text-xs md:text-base"
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="example@aiou.edu.pk"
            />
            {!isValidEmail && (
              <div className="mt-2 text-xs md:text-base">
                <span className="font-medium text-destructive">
                  Invalid email address
                </span>
              </div>
            )}
          </div>
          {/* CNIC */}
          <div className="w-full lg:w-[20%]">
            <div className="mb-2 text-xs md:text-base md:font-medium">CNIC</div>
            <Input
              className="text-xs md:text-base"
              value={cnic}
              onChange={handleCnicChange}
              type="text"
              placeholder="12345-1234567-1"
            />
            {!isValidCnic && (
              <div className="mt-2 text-xs md:text-base">
                <span className="font-medium text-destructive">
                  Invalid CNIC
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
          {/* DOB */}
          <div className="w-full lg:w-[30%]">
            <TextInput
              label="Date of Birth"
              name="dob"
              type="date"
              control={form.control}
            />
          </div>
          {/* Password */}
          <div className="w-full lg:w-[35%]">
            <div className="relative">
              <div>
                <TextInput
                  label="Password"
                  name="password"
                  placeholder="*****"
                  type={showPassword ? "text" : "password"}
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
          </div>
          {/* Confirm Password */}
          <div className="w-full lg:w-[35%]">
            <div className="relative">
              <div>
                <TextInput
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="*****"
                  type={showConfirmPassword ? "text" : "password"}
                  control={form.control}
                />
              </div>
              <div className="absolute cursor-pointer top-11 right-4 text-md text-muted-foreground">
                {showConfirmPassword ? (
                  <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <AiFillEye />
                  </span>
                ) : (
                  <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <AiFillEyeInvisible />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full h-10 p-2 text-sm font-bold bg-secondary text-secondary-foreground md:text-xl">
          Basic Information
        </div>
        {/* BASIC INFORMATION */}
        <div className="flex flex-col justify-center w-full gap-4 lg:flex-row">
          {/* GENDER */}
          <div className="w-full lg:w-[30%]">
            <SelectInput
              label="Gender"
              name="gender"
              control={form.control}
              items={["Male", "Female", "Other"]}
            />
          </div>
          {/* FACULTY */}
          <div className="w-full lg:w-[40%]">
            <div className="mb-2 text-xs md:text-base md:font-medium">
              Faculty
            </div>
            <select
              name=""
              id=""
              className="w-full p-2 mb-3 text-xs border rounded-md md:text-base"
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
            <div className="mb-2 text-xs md:text-base md:font-medium">
              Department
            </div>
            <select
              name=""
              id=""
              onChange={handleDepartmentChange}
              className="w-full p-2 mb-3 text-xs border rounded-md md:text-base"
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
        <div className="flex flex-col justify-center w-full gap-4 lg:flex-row">
          {/* PHONE NO */}
          <div className="w-full lg:w-[30%]">
            <TextInput
              label="Phone No"
              name="phone_no"
              control={form.control}
            />
          </div>
          {/* CELL NO */}
          <div className="w-full lg:w-[40%]">
            <TextInput label="Cell No" name="cell_no" control={form.control} />
          </div>
          {/* RESEARCH DOMAIN */}
          <div className="w-full lg:w-[30%]">
            <TextInput
              label="Research Domain"
              name="research_domain"
              control={form.control}
            />
          </div>
        </div>
        <TextInput
          label="Highest Degree"
          name="highest_degree"
          control={form.control}
        />
        <div className="flex items-center justify-center w-full">
          <FormSubmitButton
            loading={form.formState.isSubmitting}
            className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
          >
            Register
          </FormSubmitButton>
        </div>
      </form>
      <div className="flex justify-center gap-2 my-2 text-xs md:text-base">
        Already have an account?
        <Link href={"/user/login"}>
          <div className="font-bold text-blue-700 hover:underline">Log In</div>
        </Link>
      </div>
    </Form>
  );
};
export default UserRegisterForm;
