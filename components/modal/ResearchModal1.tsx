"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { countries, years } from "@/constants/data";
import { validateForm1 } from "@/lib/validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

//FORM VALIDATION
const formSchema = validateForm1;

export function ResearchModal1({
  children,
  book,
  id,
  userCookie,
  option,
}: {
  children: React.ReactNode;
  book: any;
  id: string;
  userCookie: string;
  option: string;
}) {
  const router = useRouter();

  const [year, setYear] = useState(book.date);
  const [category, setCategory] = useState(year < 2019 ? "text" : "select");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      journal_name: book.journal_name,
      title: book.title,
      authors: book.authors,
      category: book.category,
      status: book.status,
      issn: book.issn,
      volume: book.volume,
      page_no: book.page_no,
      affiliation: book.affiliation,
      link: book.link,
      country: book.country,
      // other_countries: ,
      addressing: book.addressing,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (option !== "edit") {
        toast({ variant: "destructive", title: "Its only view mode" });
      } else {
        if (!year) {
          toast({ variant: "destructive", title: "All fields are required" });
        } else {
          setOpen(false);
          toast({ variant: "default", title: "Please wait..." });
          const res = await fetch(
            `/api/user/records/research-publications/${id}`,
            {
              method: "PATCH",
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
                // other_countries: values.other_countries,
                addressing: values.addressing,
                user_id: id,
              }),
            }
          );
          const data = await res.json();
          if (!data.success) {
            toast({ variant: "destructive", title: data.message });
          } else {
            toast({ variant: "success", title: data.message });
          }
          router.refresh();
          console.log(data);
        }
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  const handleYearChange = (e: any) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear.toString()); // Update the year state
    setCategory(selectedYear < 2019 ? "text" : "select"); // Update the category state based on the selected year
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>{book.issn}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="">
                {/* SELECT YEAR */}
                <div>
                  <Label className="mb-2 text-xs sm:text-sm sm:font-medium">
                    Year
                  </Label>
                  <select
                    disabled={option !== "edit"}
                    name=""
                    id=""
                    className="w-full p-2 text-xs border rounded-md sm:text-sm"
                    defaultValue={year}
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Country of Pub.
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-sm">
                        <SelectTrigger disabled={option !== "edit"}>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-48">
                        {countries.map((country, index) => (
                          <SelectItem key={index} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* JOURNAL NAME */}
              <FormField
                control={form.control}
                name="journal_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Journal Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Journal Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Title of Book
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Book's Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* AUTHORS NAME */}
              <FormField
                control={form.control}
                name="authors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Author&apos;s Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Author's Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Category
                    </FormLabel>
                    {category === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="text-xs sm:text-sm">
                          <SelectTrigger disabled={option !== "edit"}>
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
                      <FormControl className="text-xs sm:text-sm">
                        <Input
                          disabled={option !== "edit"}
                          placeholder="Category"
                          {...field}
                        />
                      </FormControl>
                    )}
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-sm">
                        <SelectTrigger disabled={option !== "edit"}>
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
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">ISSN</FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="ISSN"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Volume (Issue) page no(s)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Volume (Issue) page no(s)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* PAGE NO */}
              <FormField
                control={form.control}
                name="page_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Page No(s)
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        type="number"
                        placeholder="Page No(s)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Affiliation with AIOU
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-sm">
                        <SelectTrigger disabled={option !== "edit"}>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Web. Link
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Web link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="other_countries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Other Countries
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Other Countries"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="addressing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Addressing any SGD
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Addressing any SGD"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {option === "edit" && (
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
