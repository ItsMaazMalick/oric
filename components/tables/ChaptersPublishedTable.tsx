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
import { chaptersPublishedHead } from "@/constants/data";
import Link from "next/link";

import { useEffect, useState } from "react";

export function ChaptersPublishedTable({ userCookie }: { userCookie: string }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(`/api/user/books/chapter-published-books`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCookie}`,
        },
      });
      const { books } = await res.json();
      setBooks(books);
      console.log(books);
    };
    getBooks();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {chaptersPublishedHead.map((book) => (
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
            <TableCell>{book.chapter_title}</TableCell>
            <TableCell>{book.book_title}</TableCell>
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
            <TableCell>{book.authors_name}</TableCell>
            <TableCell>{book.year}</TableCell>
            <TableCell className="text-right">{book.no_of_authors}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
