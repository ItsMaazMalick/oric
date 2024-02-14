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
import { validateForm1, validateForm2, validateForm3 } from "@/lib/validator";
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
const formSchema = validateForm3;

export function ResearchProjectsModel3({
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
      fundingAgency: book.fundingAgency,
      nameOfResearch: book.nameOfResearch,
      status: book.status,
      type: book.type,
      role: book.role,
      grantAmount: book.grantAmount,
      title: book.title,
      startDate: book.startDate,
      endDate: book.endDate,
      totalFunding: book.totalFunding,
      collaboratingPartner: book.collaboratingPartner,
      coFundingPartner: book.coFundingPartner,
      completion: book.completion,
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
          `/api/user/records/research-projects/${book.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userCookie}`,
            },
            body: JSON.stringify({
              date: values.date,
              fundingAgency: values.fundingAgency,
              nameOfResearch: values.nameOfResearch,
              status: values.status,
              type: values.type,
              role: values.role,
              grantAmount: values.grantAmount,
              title: values.title,
              startDate: values.startDate,
              endDate: values.endDate,
              totalFunding: values.totalFunding,
              collaboratingPartner: values.collaboratingPartner,
              coFundingPartner: values.coFundingPartner,
              completion: values.completion,
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
              {/* <div className=""> */}
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
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fundingAgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Research Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Research Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameOfResearch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Research Name
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Research Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Status
                    </FormLabel>
                    <Select
                      disabled={option !== "edit"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Funding Release">
                          Funding Release
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">Type</FormLabel>
                    <Select
                      disabled={option !== "edit"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="National">National</SelectItem>
                        <SelectItem value="International">
                          International
                        </SelectItem>
                        <SelectItem value="Internal">Internal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
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
                        <SelectItem value="PI">PI</SelectItem>
                        <SelectItem value="Co-PI">Co-PI</SelectItem>
                        <SelectItem value="Consultant">Consultant</SelectItem>
                        <SelectItem value="Collaborator">
                          Collaborator
                        </SelectItem>
                        <SelectItem value="Team Lead">Team Lead</SelectItem>
                        <SelectItem value="Team Member">Team Member</SelectItem>
                        <SelectItem value="Any Other">Any Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grantAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Grand Amount
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        type="number"
                        placeholder="Grand Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Title
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Start Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        type="date"
                        placeholder="Start Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      End Date
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        type="date"
                        placeholder="End Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalFunding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Total Funding
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        type="number"
                        placeholder="Total Funding"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collaboratingPartner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Collaborating Partner
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Collaborating Partner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coFundingPartner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Co-Funding Partner
                    </FormLabel>
                    <FormControl className="text-xs sm:text-base">
                      <Input
                        disabled={option !== "edit"}
                        placeholder="Co-Funding Partner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-base" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-base">
                      Completion
                    </FormLabel>
                    <Select
                      disabled={option !== "edit"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-xs sm:text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs sm:text-base" />
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
