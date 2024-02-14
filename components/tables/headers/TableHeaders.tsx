import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Target } from "lucide-react";
import Link from "next/link";

export const Table1Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-bold">{row?.original?.user?.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table2Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row?.original?.user?.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table3Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => (
      <div className="font-bold">{row?.original?.user?.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "fundingAgency",
    header: "Funding Agency",
    cell: ({ row }) => <div>{row.getValue("fundingAgency")}</div>,
  },
  {
    accessorKey: "nameOfResearch",
    header: "Name Of Research",
    cell: ({ row }) => <div>{row.getValue("nameOfResearch")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "grantAmount",
    header: "Grant Amount",
    cell: ({ row }) => <div>{row.getValue("grantAmount")}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return <div className="w-[90px]">Start Date</div>;
    },
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return <div className="w-[90px]">End Date</div>;
    },
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "totalFunding",
    header: "Total Funding",
    cell: ({ row }) => <div>{row.getValue("totalFunding")}</div>,
  },
  {
    accessorKey: "collaboratingPartner",
    header: "Collaborating Partner",
    cell: ({ row }) => <div>{row.getValue("collaboratingPartner")}</div>,
  },
  {
    accessorKey: "coFundingPartner",
    header: ({ column }) => {
      return <div className="w-[160px]">Co-Funding Partner</div>;
    },
    cell: ({ row }) => <div>{row.getValue("coFundingPartner")}</div>,
  },
  {
    accessorKey: "completion",
    header: "Completion",
    cell: ({ row }) => <div>{row.getValue("completion")}</div>,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => <div>{row.getValue("remarks")}</div>,
  },
  {
    accessorKey: "file",
    header: ({ column }) => {
      return <div className="w-[100px] text-center">File</div>;
    },
    cell: ({ row }) => (
      <>
        {row.getValue("file") === "NILL" ? (
          "NILL"
        ) : (
          <Link href={row.getValue("file")} target="_blank">
            <Button variant={"secondary"}>VIEW File</Button>
          </Link>
        )}
      </>
    ),
  },
];

export const Table4Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table5Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table6Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table7Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table8Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table9Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table10Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table11Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table12Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table13Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table14Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table15Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table16Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table17Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table18Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table19Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];
