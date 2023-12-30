import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formHead1,
  formHead2,
  formHead3,
  formTitle1,
  formTitle2,
  formTitle3,
} from "@/constants/data";
import Link from "next/link";

const Department = async ({
  params,
}: {
  params: { faculty: string; department: string };
}) => {
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/admin/records/${params.faculty}/${params.department}`,
    { cache: "no-store" }
  );
  const { books } = await res.json();
  const researchPublications = books[0];
  const bookAuthoredEdited = books[1];
  const researchProjects = books[2];
  // Check if books array is empty
  const isFirstBooksEmpty =
    !researchPublications || researchPublications.length === 0;
  const isSecondBooksEmpty =
    !bookAuthoredEdited || bookAuthoredEdited.length === 0;
  const isThirdBooksEmpty = !researchProjects || researchProjects.length === 0;
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-sm sm:text-base p-2 bg-primary-foreground"
    >
      {/* PUBLISHED BOOKS */}
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-left text-primary hover:text-secondary">
          {formTitle1}
        </AccordionTrigger>
        <AccordionContent>
          <div className="max-h-[500px] overflow-y-auto">
            {isFirstBooksEmpty ? (
              <div className="w-full flex justify-center items-center mt-4">
                No Record Found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-secondary-foreground  bg-opacity-80">
                      Uploaded by
                    </TableHead>
                    {formHead1.map((book) => (
                      <TableHead
                        key={book.id}
                        className="bg-primary text-secondary-foreground bg-opacity-80"
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
                  {researchPublications?.map((book: any, index: number) => (
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
                      <TableCell className="font-semibold">
                        {book.user.name}
                      </TableCell>
                      <TableCell className="font-medium">{index + 1}</TableCell>
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
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* Edit */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* DELETE */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell className="text-center">
                          {/* <TooltipProvider>
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
                 </TooltipProvider> */}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* BOOK AUTHORED EDITED */}
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold text-left text-primary hover:text-secondary">
          {formTitle2}
        </AccordionTrigger>
        <AccordionContent>
          <div className="max-h-[500px] overflow-y-auto">
            {isSecondBooksEmpty ? (
              <div className="w-full flex justify-center items-center mt-4">
                No Record Found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-secondary-foreground  bg-opacity-80">
                      Uploaded by
                    </TableHead>
                    {formHead2.map((book) => (
                      <TableHead
                        key={book.id}
                        className="bg-primary text-secondary-foreground bg-opacity-80"
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
                  {bookAuthoredEdited?.map((book: any, index: number) => (
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
                      <TableCell className="font-semibold">
                        {book.user.name}
                      </TableCell>
                      <TableCell className="font-medium w-[50px]">
                        {index + 1}
                      </TableCell>
                      <TableCell>{book.date}</TableCell>
                      <TableCell>{book.title_of_book}</TableCell>
                      <TableCell>{book.title_of_research}</TableCell>
                      <TableCell>{book.publisher}</TableCell>
                      <TableCell>{book.role}</TableCell>
                      <TableCell>{book.country}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>
                        <Link
                          className="text-blue-600 underline"
                          href={book.link}
                          target="_blank"
                        >
                          {book.link}
                        </Link>
                      </TableCell>
                      <TableCell>{book.pages}</TableCell>
                      <TableCell>{book.affiliation}</TableCell>
                      <TableCell>{book.addressing}</TableCell>
                      {book.approved_status !== "approved" ? (
                        <TableCell>
                          <div className="flex gap-4">
                            {/* <View /> */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* Edit */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* DELETE */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell className="text-center">
                          {/* <TooltipProvider>
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
                 </TooltipProvider> */}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* RESEARCH PROJECTS */}
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold text-left text-primary hover:text-secondary">
          {formTitle3}
        </AccordionTrigger>
        <AccordionContent>
          <div className="max-h-[500px] overflow-y-auto">
            {isThirdBooksEmpty ? (
              <div className="w-full flex justify-center items-center mt-4">
                No Record Found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-secondary-foreground  bg-opacity-80">
                      Uploaded by
                    </TableHead>
                    {formHead3.map((book) => (
                      <TableHead
                        key={book.id}
                        className="bg-primary text-secondary-foreground bg-opacity-80"
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
                  {researchProjects?.map((book: any, index: number) => (
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
                      <TableCell className="font-semibold">
                        {book.user.name}
                      </TableCell>
                      <TableCell className="font-medium w-[50px]">
                        {index + 1}
                      </TableCell>
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
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* Edit */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                            {/* DELETE */}
                            {/* <TooltipProvider>
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
                   </TooltipProvider> */}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell className="text-center">
                          {/* <TooltipProvider>
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
                 </TooltipProvider> */}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Department;
