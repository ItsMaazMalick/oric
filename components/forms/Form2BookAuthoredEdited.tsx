"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { validateForm2 } from "@/lib/validator";
import { useLayoutEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";

//FORM VALIDATION
const formSchema = validateForm2;

export function Form2BookAuthoredEdited({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedSdg, setSelectedSdg] = useState<string[]>([]);

  useLayoutEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`/api/user/records/book-authored-edited`, {
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

  const handleISBNChange = (e: any) => {
    const value = e.target.value;
    const foundBook = books.find((book: any) => book.isbn === value);
    if (foundBook) {
      setError("ISBN already exists");
    } else {
      setError("");
    }
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      title_of_book: "",
      title_of_research: "",
      publisher: "",
      country: "",
      role: "",
      isbn: "",
      link: "",
      pages: 0,
      affiliation: "",
      addressing: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        toast({ variant: "destructive", title: "All fields are required" });
      } else {
        setLoading(true);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(`/api/user/records/book-authored-edited`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: JSON.stringify({
            date: values.date,
            title_of_book: values.title_of_book,
            title_of_research: values.title_of_research,
            publisher: values.publisher,
            country: values.country,
            role: values.role,
            isbn: values.isbn,
            link: values.link,
            pages: values.pages,
            affiliation: values.affiliation,
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
            {/* ISBN */}
            <div className="w-full lg:w-[40%]">
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">ISBN</FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        onChangeCapture={handleISBNChange}
                        placeholder="ISBN"
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
            {/* ROLE */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-2 text-xs sm:text-base sm:font-medium">
                Applicant Role
              </div>
              <select
                name=""
                id=""
                className="w-full p-2 border rounded-md text-xs sm:text-base"
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="Book Author">Book Author</option>
                <option value="Chapter Author">Chapter Author</option>
                <option value="Book Editor">Book Editor</option>
              </select>
            </div>
            {/* PAGE NO */}
            <div className="w-full lg:w-[30%]">
              <FormField
                control={form.control}
                name="pages"
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
            {/* SELECT YEAR */}
            <div className="w-full lg:w-3/4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Year.
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-48">
                        {years.map((year) => (
                          <SelectItem key={year.id} value={year.name}>
                            {year.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
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
          {/* BOOK TITLE */}
          <FormField
            control={form.control}
            name="title_of_book"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Book Title
                </FormLabel>
                <FormControl className="text-xs sm:text-base">
                  <Input placeholder="Book Title" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          />
          {/* TITLE OF RESEARCH PAPER */}
          {author === "Chapter Author" && (
            <FormField
              control={form.control}
              name="title_of_research"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-base">
                    Title of Chapter
                  </FormLabel>
                  <FormControl className="text-xs sm:text-base">
                    <Input placeholder="Title of Chapter" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-base" />
                </FormItem>
              )}
            />
          )}
          {/* PUBLISHER */}
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-base">
                  Publisher Name
                </FormLabel>
                <FormControl className="text-xs sm:text-base">
                  <Input placeholder="Publisher Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-base" />
              </FormItem>
            )}
          />

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
          {/* ADDRESSING */}
          <div>
            <div className="mb-2 text-xs sm:text-base sm:font-medium">
              Addressing any SDG
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="outline">
                  {selectedSdg.map((sdg, index) => (
                    <span
                      key={index}
                      className="m-1 p-1 border border-primary rounded-lg"
                    >
                      {sdg}
                    </span>
                  ))}
                  <span className="ml-1 rounded-md bg-primary text-primary-foreground">
                    <ChevronDown size={20} />
                  </span>
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
          </div>

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
