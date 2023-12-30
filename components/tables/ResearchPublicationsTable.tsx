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
import { formHead1 } from "@/constants/data";
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

export function ResearchPublicationsTable({
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
      const res = await fetch(`/api/user/records/research-publications/${id}`, {
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
      const res = await fetch(`/api/user/records/research-publications/${id}`, {
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
          {formHead1.map((book) => (
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
            <TableCell>{book.journal_name}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.authors}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>{book.status}</TableCell>
            <TableCell>{book.issn}</TableCell>
            <TableCell>{book.volume}</TableCell>
            <TableCell>{book.page_no}</TableCell>
            <TableCell>{book.affiliation}</TableCell>
            <TableCell>
              <Link
                className="text-blue-600 underline"
                href={book.link}
                target="_blank"
              >
                {book.link}
              </Link>
            </TableCell>
            <TableCell>{book.country}</TableCell>
            <TableCell>{book.addressing}</TableCell>
            {book.approved_status !== "approved" ? (
              <TableCell>
                <div className="flex gap-4">
                  {/* <View /> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ResearchModal1
                          book={book}
                          option="view"
                          id={id}
                          userCookie={userCookie}
                        >
                          <Eye size={16} className="text-primary" />
                        </ResearchModal1>
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
                        <ResearchModal1
                          book={book}
                          option="edit"
                          id={id}
                          userCookie={userCookie}
                        >
                          <Edit size={16} className="text-primary" />
                        </ResearchModal1>
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
                      <ResearchModal1
                        book={book}
                        option="view"
                        id={id}
                        userCookie={userCookie}
                      >
                        <CheckCircle2 color="green" size={20} />
                      </ResearchModal1>
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
