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
import { validateForm1, validateForm2 } from "@/lib/validator";
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
const formSchema = validateForm2;

export function BookAuthoredEditedModel2({
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
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: book.date,
      title_of_book: book.title_of_book,
      title_of_research: book.title_of_research,
      publisher: book.publisher,
      country: book.country,
      role: book.role,
      isbn: book.isbn,
      link: book.link,
      pages: book.pages,
      affiliation: book.affiliation,
      addressing: book.addressing,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (option !== "edit") {
        toast({ variant: "destructive", title: "Its only view mode" });
      } else {
        setOpen(false);
        toast({ variant: "default", title: "Please wait..." });
        const res = await fetch(
          `/api/user/records/book-authored-edited/${id}`,
          {
            method: "PATCH",
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
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
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
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-base">
                        Year.
                      </FormLabel>
                      <Select
                        disabled={option !== "edit"}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
              <FormField
                control={form.control}
                name="title_of_book"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Book Title
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Book Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* RESEARCH PAPER NAME */}
              <FormField
                control={form.control}
                name="title_of_research"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Title of Research Paper
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Title of Research Paper"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Publisher
                    </FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Publisher"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              {/* COUNTRY */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Country of Pub.
                    </FormLabel>
                    <Select
                      disabled={option !== "edit"}
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
                          <SelectItem key={index} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">Role</FormLabel>
                    <Select
                      disabled={option !== "edit"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Author">Author</SelectItem>
                        <SelectItem value="Co-Author">Co-Author</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">ISBN</FormLabel>
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="ISBN"
                        {...field}
                      />
                    </FormControl>
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

              {/* PAGE NO */}
              <FormField
                control={form.control}
                name="pages"
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
