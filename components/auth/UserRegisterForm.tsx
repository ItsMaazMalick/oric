"use client";
import { registerUser } from "@/app/actions/user/auth";
import { faculties } from "@/constants/data";
import { userValidation } from "@/lib/validator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = userValidation;

const UserRegisterForm = () => {
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

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("name", values.name);
      formData.append("email", email);
      formData.append("cnic", cnic);
      formData.append("dob", values.dob);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("department", dept);
      formData.append("faculty", fact);
      formData.append("phone_no", values.phone_no);
      formData.append("cell_no", values.cell_no);
      formData.append("research_domain", values.research_domain);
      formData.append("highest_degree", values.highest_degree);
      const res = await registerUser(formData);
      if (res && res.status !== 201) {
        // setError(res.message);
        form.reset();
      }
    } catch (error) {}
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
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
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
          <FormSubmitButton
            loading={isSubmitting}
            className="flex mx-auto bg-primary text-primary-foreground text-xs md:text-base"
          >
            Register
          </FormSubmitButton>
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
