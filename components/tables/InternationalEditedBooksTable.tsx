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
import { InternationalBooksHead } from "@/constants/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export function InternationalEditedBooksTable({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(
        `/api/user/books/international-edited-books/${id}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
        }
      );
      const { books } = await res.json();
      setBooks(books);
      console.log(books);
    };
    getBooks();
  }, []);
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          {InternationalBooksHead.map((book) => (
            <TableHead
              key={book.id}
              className="first:w-[80px] last:text-right bg-primary text-secondary-foreground"
            >
              {book.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book: any, index) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium w-[50px]">{index + 1}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.editors_name}</TableCell>
            <TableCell>{book.isbn}</TableCell>

            <TableCell>{book.publisher}</TableCell>
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
            <TableCell>{book.year}</TableCell>
            <TableCell className="first:font-medium text-right">
              {book.no_of_editors}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
