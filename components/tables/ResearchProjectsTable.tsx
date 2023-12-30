"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formHead1, formHead2, formHead3 } from "@/constants/data";
import { CheckCircle2, Edit, Eye, Trash, View } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ResearchModal1 } from "../modal/ResearchModal1";
import { AlertWithDelete } from "../dialog/AlertWithDelete";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { BookAuthoredEditedModel2 } from "../modal/BookAuthoredEditedModel2";
import { ResearchProjectsModel3 } from "../modal/ResearchProjectsModel3";

export function ResearchProjectsTable({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const router = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(`/api/user/records/research-projects/${id}`, {
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
    getBooks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const filtered = books.filter((book: any) => book.id !== id);
      setBooks(filtered);
      toast({ variant: "default", title: "Please wait..." });
      const res = await fetch(`/api/user/records/research-projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCookie}`,
        },
      });
      const data = await res.json();
      if (!data.success) {
        toast({ variant: "destructive", title: data.message });
      } else {
        router.refresh();
        toast({ variant: "success", title: data.message });
      }
      console.log(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {formHead3.map((book) => (
            <TableHead
              key={book.id}
              className="first:w-[50px] bg-primary text-secondary-foreground"
            >
              {book.name}
            </TableHead>
          ))}
          <TableHead className="text-center bg-primary text-secondary-foreground">
            Options
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book: any, index) => (
          <TableRow
            key={book.id}
            // className={`${
            //   book.approved_status === "pending" ? "bg-red-100" : "bg-green-100"
            // } ${
            //   book.approved_status === "pending"
            //     ? "hover:bg-red-100"
            //     : "hover:bg-green-100"
            // }`}
            className={`${
              book.approved_status === "approved"
                ? "bg-green-100"
                : book.approved_status === "rejected"
                ? "bg-red-100"
                : ""
            } ${
              book.approved_status === "approved"
                ? "hover:bg-green-100"
                : book.approved_status === "rejected"
                ? "hover:bg-red-100"
                : ""
            }`}
          >
            <TableCell className="font-medium w-[50px]">{index + 1}</TableCell>
            <TableCell>{book.date}</TableCell>
            <TableCell>{book.funding_agency}</TableCell>
            <TableCell>{book.name_of_research}</TableCell>
            <TableCell>{book.status}</TableCell>
            <TableCell>{book.type}</TableCell>
            <TableCell>{book.role}</TableCell>
            <TableCell>{book.grant_amount}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.start_date}</TableCell>
            <TableCell>{book.end_date}</TableCell>
            <TableCell>{book.total_funding}</TableCell>
            <TableCell>{book.collaborating_partner}</TableCell>
            <TableCell>{book.co_funding_partner}</TableCell>
            <TableCell>{book.completion}</TableCell>
            {book.approved_status !== "approved" ? (
              <TableCell>
                <div className="flex gap-4">
                  {/* <View /> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ResearchProjectsModel3
                          book={book}
                          option="view"
                          id={id}
                          userCookie={userCookie}
                        >
                          <Eye size={16} className="text-primary" />
                        </ResearchProjectsModel3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* Edit */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ResearchProjectsModel3
                          book={book}
                          option="edit"
                          id={id}
                          userCookie={userCookie}
                        >
                          <Edit size={16} className="text-primary" />
                        </ResearchProjectsModel3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* DELETE */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertWithDelete
                          handleDelete={() => handleDelete(book.id)}
                          id={book.id}
                          category="research-publications"
                          userCookie={userCookie}
                        >
                          <Trash size={16} className="text-destructive" />
                        </AlertWithDelete>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            ) : (
              <TableCell className="text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <ResearchProjectsModel3
                        book={book}
                        option="view"
                        id={id}
                        userCookie={userCookie}
                      >
                        <CheckCircle2 color="green" size={20} />
                      </ResearchProjectsModel3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Approved</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
