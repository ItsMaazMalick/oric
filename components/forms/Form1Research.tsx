"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SDG, countries, years } from "@/constants/data";
import { validateForm1 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

//FORM VALIDATION
const formSchema = validateForm1;

export function Form1Research({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState(
    parseInt(year) < 2019 ? "text" : "select"
  );
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedSdg, setSelectedSdg] = useState<string[]>([]);

  useLayoutEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`/api/user/records/research-publications`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCookie}`,
        },
      });
      const { books } = await res.json();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      journal_name: "",
      title: "",
      authors: "",
      category: "",
      status: "",
      issn: "",
      volume: "",
      page_no: 0,
      affiliation: "",
      link: "",
      country: "",
      addressing: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values || !year) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/research-publications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: JSON.stringify({
            date: year,
            journal_name: values.journal_name,
            title: values.title,
            authors: values.authors,
            category: values.category,
            status: values.status,
            issn: values.issn,
            volume: values.volume,
            page_no: values.page_no,
            affiliation: values.affiliation,
            link: values.link,
            country: values.country,
            other_countries: selectedCountries,
            addressing: values.addressing,
            user_id: id,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          toast({
            variant: "success",
            title: data.message,
          });
          form.reset();
          router.refresh();
          // router.push("/user/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
        setLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setLoading(false);
    }
  };

  const handleYearChange = (e: any) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear.toString()); // Update the year state
    setCategory(selectedYear < 2019 ? "text" : "select"); // Update the category state based on the selected year
  };

  const handleISSNChange = (e: any) => {
    const value = e.target.value;
    const foundBook = books.find((book: any) => book.issn === value);
    if (foundBook) {
      setError("ISSN already exists");
    } else {
      setError("");
    }
  };

  const checkCountryChange = (countryName: string) => {
    setSelectedCountries((prevSelected: any) => {
      if (prevSelected.includes(countryName)) {
        return prevSelected.filter((name: any) => name !== countryName);
      } else {
        return [...prevSelected, countryName];
      }
    });
  };

  const checkSdgChange = (sdgName: string) => {
    setSelectedSdg((prevSelected: any) => {
      if (prevSelected.includes(sdgName)) {
        return prevSelected.filter((name: any) => name !== sdgName);
      } else {
        return [...prevSelected, sdgName];
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* SELECT YEAR */}
            <div className="w-full lg:w-[35%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Year
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 border rounded-md text-xs sm:text-base"
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year.id} value={year.name}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COUNTRY OF PUB */}
            <div className="w-full lg:w-3/4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Country of Pub.
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-48">
                        {countries.map((country, index) => (
                          <SelectItem key={index} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* JOURNAL NAME */}
          <FormField
            control={form.control}
            name="journal_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Journal Name
                </FormLabel>
                <FormControl className="text-xs sm:text-base">
                  <Input placeholder="Journal Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          />
          {/* BOOK TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Title of Research Paper
                </FormLabel>
                <FormControl className="text-xs sm:text-base">
                  <Input placeholder="Title of Research Paper" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          />
          {/* AUTHORS NAME */}
          <FormField
            control={form.control}
            name="authors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Author&apos;s Name
                </FormLabel>
                <FormControl className="text-xs sm:text-base">
                  <Input placeholder="Author's Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* CATEGORY */}
            <div className="w-full lg:w-1/2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Category
                    </FormLabel>
                    {category === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        //   defaultValue={field.value}
                      >
                        <FormControl className="text-xs sm:text-base">
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HEC Cat-W">HEC Cat-W</SelectItem>
                          <SelectItem value="HEC Cat-X">HEC Cat-X</SelectItem>
                          <SelectItem value="HEC Cat-Y">HEC Cat-Y</SelectItem>
                          <SelectItem value="HEC Cat-Z">HEC Cat-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl className="text-xs sm:text-base">
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                    )}
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* STATUS */}
            <div className="w-full lg:w-1/2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1st Author">1st Author</SelectItem>
                        <SelectItem value="2nd Author">2nd Author</SelectItem>
                        <SelectItem value="3rd Author">3rd Author</SelectItem>
                        <SelectItem value="Corr. Author">
                          Corr. Author
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* ISSN */}
            <div className="w-full lg:w-[40%]">
              <FormField
                control={form.control}
                name="issn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">ISSN</FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        onChangeCapture={handleISSNChange}
                        placeholder="ISSN"
                        {...field}
                      />
                    </FormControl>
                    {error ? (
                      <FormMessage className="text-xs sm:text-base">
                        {error}
                      </FormMessage>
                    ) : (
                      <FormMessage className="text-xs sm:text-base" />
                    )}
                  </FormItem>
                )}
              />
            </div>
            {/* VOLUME */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Volume (Issue) page no(s)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        placeholder="Volume (Issue) page no(s)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            {/* PAGE NO */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="page_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Page No(s)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        type="number"
                        placeholder="Page No(s)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* AFFILIATION */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Affiliation with AIOU
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //   defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full lg:w-[70%]">
              {/* WEB LINK*/}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Web. Link
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input placeholder="Web link" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* OTHER COUNTRIES*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" variant="outline">
                {selectedCountries.map((country, index) => (
                  <span
                    key={index}
                    className="m-1 p-1 border border-primary rounded-lg"
                  >
                    {country}
                  </span>
                ))}
                Other Countries
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 h-64 overflow-y-auto">
              <DropdownMenuLabel>Select Countries</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {countries.map((country, index: number) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={selectedCountries.includes(country.name)}
                  onCheckedChange={() => checkCountryChange(country.name)}
                >
                  {country.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* ADDRESSING */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" variant="outline">
                {selectedCountries.map((country, index) => (
                  <span
                    key={index}
                    className="m-1 p-1 border border-primary rounded-lg"
                  >
                    {country}
                  </span>
                ))}
                Other Countries
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 h-64 overflow-y-auto">
              <DropdownMenuLabel>Select SDG</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SDG.map((sdg, index: number) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={selectedSdg.includes(sdg.name)}
                  onCheckedChange={() => checkSdgChange(sdg.name)}
                >
                  {sdg.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <FormField
            control={form.control}
            name="addressing"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Addressing any SDG
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  //   defaultValue={field.value}
                >
                  <FormControl className="text-xs sm:text-base">
                    <SelectTrigger>
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-48">
                    {SDG.map((sdg, index) => (
                      <SelectItem key={index} value={sdg.name}>
                        {sdg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          /> */}

          <div className="">
            <Button
              disabled={loading}
              type="submit"
              className="text-xs sm:text-base"
            >
              {loading ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
