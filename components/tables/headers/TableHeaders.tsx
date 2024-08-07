import { ViewDialog } from "@/components/dialog/view-dialog";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  FileCog,
  FilePenLine,
  Target,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { modalHeaders } from "./headers";
import { DeleteUserRecord } from "@/components/dialog/delete-dialog";

const firstCell = (row: any) => {
  return (
    <div className="font-bold">
      <p
        className={`text-xs text-white text-center rounded-md w-fit px-2 ${
          row.original.approvedStatus === "accepted"
            ? "bg-green-500"
            : row.original.approvedStatus === "pending"
            ? "bg-orange-400"
            : "bg-destructive"
        }`}
      >
        {row.original.approvedStatus}
      </p>
      {row?.original?.user?.name}
    </div>
  );
};

const filterCell = (column: any, value: string) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {value}
      <ArrowUpDown size={15} className="ml-1" />
    </Button>
  );
};

const linkCell = (row: any, value: string) => {
  return (
    <>
      {row.getValue(value) === "NILL" ? (
        <div>{row.getValue(value)}</div>
      ) : (
        <Link href={row.getValue(value)} target="_blank">
          {row.getValue("link")}
        </Link>
      )}
    </>
  );
};

const fileCell = (row: any, value: string) => {
  return (
    <>
      {row.getValue(value) === "NILL" ? (
        "NILL"
      ) : (
        <Link href={row.getValue(value)} target="_blank">
          <Button variant={"secondary"}>VIEW File</Button>
        </Link>
      )}
    </>
  );
};

const actionCell = (row: any, title: string, index: number) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <ViewDialog
        title={title}
        headers={modalHeaders[index]}
        data={row.original}
      >
        <div className="cursor-pointer text-[10px] flex flex-col justify-center items-center text-primary">
          <Eye />
          View
        </div>
      </ViewDialog>
      {row.original.approvedStatus !== "accepted" && (
        <Link
          href={`/user/dashboard/update-record/${index + 1}/${row.original.id}`}
          className="cursor-pointer text-xs flex flex-col justify-center items-center text-secondary"
        >
          <FileCog />
          Edit
        </Link>
      )}
      <DeleteUserRecord id={row.original.id} index={index}>
        <div className="cursor-pointer text-xs flex flex-col justify-center items-center text-destructive">
          <Trash2 />
          Delete
        </div>
      </DeleteUserRecord>
    </div>
  );
};

export const Table1Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journalName",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journalName")}</div>,
  },
  {
    accessorKey: "authorName",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authorName")}</div>,
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
    accessorKey: "pages",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("pages")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => linkCell(row, "link"),
  },
  {
    accessorKey: "countries",
    header: "Other Countries",
    cell: ({ row }) => {
      const countries: string[] = row.getValue("countries");
      return (
        <div className="w-[170px]">
          {countries.map((country: string) => (
            <li key={country}>{country}</li>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => {
      const addressing: string[] = row.getValue("addressing");
      return (
        <div className="w-[300px]">
          {addressing.map((adr: string) => (
            <li key={adr}>{adr}</li>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 0),
  },
];

export const Table2Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "bookTitle",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("bookTitle")}</div>,
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "role",
    header: "Applicant Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "publisherName",
    header: "Publisher Name",
    cell: ({ row }) => <div>{row.getValue("publisherName")}</div>,
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <div>{row.getValue("isbn")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => linkCell(row, "link"),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => {
      const addressing: string[] = row.getValue("addressing");
      return (
        <div className="w-[300px]">
          {addressing.map((adr: string) => (
            <li key={adr}>{adr}</li>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Book Authored / Edited", 1),
  },
];

export const Table3Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "agency",
    header: "Funding Agency",
    cell: ({ row }) => <div>{row.getValue("agency")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name Of Research",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
    cell: ({ row }) => fileCell(row, "file"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Projects", 2),
  },
];

export const Table4Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => filterCell(column, "Event Type"),
    cell: ({ row }) => <div>{row.getValue("eventType")}</div>,
  },
  {
    accessorKey: "applicantRole",
    header: "Applicant Role",
    cell: ({ row }) => <div>{row.getValue("applicantRole")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "eventTitle",
    header: "Title of Event",
    cell: ({ row }) => <div>{row.getValue("eventTitle")}</div>,
  },
  {
    accessorKey: "noOfParticipants",
    header: "Participants",
    cell: ({ row }) => <div>{row.getValue("noOfParticipants")}</div>,
  },
  {
    accessorKey: "majorFocusArea",
    header: "Major Focus Area",
    cell: ({ row }) => <div>{row.getValue("majorFocusArea")}</div>,
  },
  {
    accessorKey: "audienceType",
    header: "Audience Type",
    cell: ({ row }) => {
      const audienceType: string[] = row.getValue("audienceType");
      return (
        <div className="w-[130px]">
          {audienceType.map((audience: string) => (
            <li key={audience}>{audience}</li>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "organizer",
    header: "Organizer",
    cell: ({ row }) => <div>{row.getValue("organizer")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 3),
  },
];

export const Table5Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "role",
    header: ({ column }) => filterCell(column, "Role"),
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "nameOfSupervisor",
    header: "Name of Supervisor",
    cell: ({ row }) => <div>{row.getValue("nameOfSupervisor")}</div>,
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "degreeLevek",
    header: "Level of Degree",
    cell: ({ row }) => <div>{row.getValue("degreeLevek")}</div>,
  },
  {
    accessorKey: "degreeProgram",
    header: "Degree Program",
    cell: ({ row }) => <div>{row.getValue("degreeProgram")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    accessorKey: "university",
    header: "University",
    cell: ({ row }) => <div>{row.getValue("university")}</div>,
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "degreeStage",
    header: "Degree Stage",
    cell: ({ row }) => <div>{row.getValue("degreeStage")}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 4),
  },
];

export const Table6Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "year",
    header: ({ column }) => filterCell(column, "Year"),
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "nameOfGovernmentBody",
    header: "Name of Government Body",
    cell: ({ row }) => <div>{row.getValue("nameOfGovernmentBody")}</div>,
  },
  {
    accessorKey: "nameOfResearcher",
    header: "Name of Researcher",
    cell: ({ row }) => <div>{row.getValue("nameOfResearcher")}</div>,
  },
  {
    accessorKey: "designationOfResearcher",
    header: "Designation of Researcher",
    cell: ({ row }) => <div>{row.getValue("designationOfResearcher")}</div>,
  },
  {
    accessorKey: "areaAdvocated",
    header: "Area Advocated",
    cell: ({ row }) => <div>{row.getValue("areaAdvocated")}</div>,
  },
  {
    accessorKey: "brief",
    header: "Brief",
    cell: ({ row }) => <div>{row.getValue("brief")}</div>,
  },
  {
    accessorKey: "partners",
    header: "Partners",
    cell: ({ row }) => <div>{row.getValue("partners")}</div>,
  },
  {
    accessorKey: "advocacyTools",
    header: "Advocacy Tools",
    cell: ({ row }) => <div>{row.getValue("advocacyTools")}</div>,
  },
  {
    accessorKey: "policyCaseStudyCopy",
    header: "Policy Case Study Copy",
    cell: ({ row }) => fileCell(row, "policyCaseStudyCopy"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 5),
  },
];

export const Table7Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "linkageType",
    header: ({ column }) => filterCell(column, "Type"),
    cell: ({ row }) => <div>{row.getValue("linkageType")}</div>,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.getValue("scope")}</div>,
  },
  {
    accessorKey: "nameOfCollaboratingAgency",
    header: "Name of Collaborating Agency",
    cell: ({ row }) => <div>{row.getValue("nameOfCollaboratingAgency")}</div>,
  },
  {
    accessorKey: "countryOfCollaboratingAgency",
    header: "Country of Collaborating Agency",
    cell: ({ row }) => (
      <div>{row.getValue("countryOfCollaboratingAgency")}</div>
    ),
  },
  {
    accessorKey: "scopeOfCollaboration",
    header: "Scope of Collaboration",
    cell: ({ row }) => <div>{row.getValue("scopeOfCollaboration")}</div>,
  },
  {
    accessorKey: "linkageDate",
    header: "Linkage Date",
    cell: ({ row }) => <div>{row.getValue("linkageDate")}</div>,
  },
  {
    accessorKey: "mouCopy",
    header: "Status",
    cell: ({ row }) => fileCell(row, "mouCopy"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 6),
  },
];

export const Table8Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.getValue("scope")}</div>,
  },
  {
    accessorKey: "sponsoringAgencyCountry",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("sponsoringAgencyCountry")}</div>,
  },
  {
    accessorKey: "contractAwardingAgency",
    header: "Agency",
    cell: ({ row }) => <div>{row.getValue("contractAwardingAgency")}</div>,
  },
  {
    accessorKey: "amountOfContract",
    header: "Amount of Contract",
    cell: ({ row }) => <div>{row.getValue("amountOfContract")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "nameOfPI",
    header: "Name pf PI",
    cell: ({ row }) => <div>{row.getValue("nameOfPI")}</div>,
  },
  {
    accessorKey: "designationOfPI",
    header: "Designation of PI",
    cell: ({ row }) => <div>{row.getValue("designationOfPI")}</div>,
  },
  {
    accessorKey: "organizationOfPI",
    header: "Organization of PI",
    cell: ({ row }) => <div>{row.getValue("organizationOfPI")}</div>,
  },
  {
    accessorKey: "startingDate",
    header: "Starting Date",
    cell: ({ row }) => <div>{row.getValue("startingDate")}</div>,
  },
  {
    accessorKey: "endingDate",
    header: "Ending Date",
    cell: ({ row }) => <div>{row.getValue("endingDate")}</div>,
  },
  {
    accessorKey: "dateOfContract",
    header: "Date of Contract",
    cell: ({ row }) => <div>{row.getValue("dateOfContract")}</div>,
  },
  {
    accessorKey: "contractResearchCopy",
    header: "Contract Research Copy",
    cell: ({ row }) => fileCell(row, "contractResearchCopy"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 7),
  },
];

export const Table9Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role of Applicant",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "communityInvolved",
    header: "Community Involved",
    cell: ({ row }) => <div>{row.getValue("communityInvolved")}</div>,
  },
  {
    accessorKey: "outcomes",
    header: "Outcomes",
    cell: ({ row }) => <div>{row.getValue("outcomes")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "collaboratingAgency",
    header: "Collaborating Agency",
    cell: ({ row }) => <div>{row.getValue("collaboratingAgency")}</div>,
  },
  {
    accessorKey: "collaboratingAgencyName",
    header: "Collaborating Agency Name",
    cell: ({ row }) => <div>{row.getValue("collaboratingAgencyName")}</div>,
  },
  {
    accessorKey: "briefReport",
    header: "Brief Report",
    cell: ({ row }) => fileCell(row, "briefReport"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 8),
  },
];

export const Table10Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "titleOfConsultancy",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("titleOfConsultancy")}</div>,
  },
  {
    accessorKey: "consultancyType",
    header: "Consultancy Type",
    cell: ({ row }) => <div>{row.getValue("consultancyType")}</div>,
  },
  {
    accessorKey: "role",
    header: "Applicant Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => <div>{row.getValue("companyName")}</div>,
  },
  {
    accessorKey: "companyCountry",
    header: "Company Country",
    cell: ({ row }) => <div>{row.getValue("companyCountry")}</div>,
  },
  {
    accessorKey: "contractValue",
    header: "Contract Value",
    cell: ({ row }) => <div>{row.getValue("contractValue")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "keyDeliverables",
    header: "Key Deliverable",
    cell: ({ row }) => <div>{row.getValue("keyDeliverables")}</div>,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => <div>{row.getValue("remarks")}</div>,
  },
  {
    accessorKey: "copyOfContract",
    header: "Copy of Contract",
    cell: ({ row }) => fileCell(row, "copyOfContract"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 9),
  },
];

export const Table11Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "typeOfIP",
    header: ({ column }) => filterCell(column, "Type of IP"),
    cell: ({ row }) => <div>{row.getValue("typeOfIP")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.getValue("scope")}</div>,
  },
  {
    accessorKey: "namesOfInventors",
    header: "Name of Inventors",
    cell: ({ row }) => <div>{row.getValue("namesOfInventors")}</div>,
  },
  {
    accessorKey: "inventionTitle",
    header: "Invention Title",
    cell: ({ row }) => <div>{row.getValue("inventionTitle")}</div>,
  },
  {
    accessorKey: "IPStatus",
    header: "IP Status",
    cell: ({ row }) => <div>{row.getValue("IPStatus")}</div>,
  },
  {
    accessorKey: "royaltyRevenue",
    header: "Royalty Revenue",
    cell: ({ row }) => <div>{row.getValue("royaltyRevenue")}</div>,
  },
  {
    accessorKey: "keyScientificAspects",
    header: "Key Scientific Aspects",
    cell: ({ row }) => <div>{row.getValue("keyScientificAspects")}</div>,
  },
  {
    accessorKey: "commertialPartners",
    header: "Commertial Partners",
    cell: ({ row }) => <div>{row.getValue("commertialPartners")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 10),
  },
];

export const Table12Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "type",
    header: ({ column }) => filterCell(column, "Type"),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "developmentStatus",
    header: "Development Status",
    cell: ({ row }) => <div>{row.getValue("developmentStatus")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "nameOfInventors",
    header: "Name of Inventors",
    cell: ({ row }) => <div>{row.getValue("nameOfInventors")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "keyScientificAspects",
    header: "Key Scientific Aspects",
    cell: ({ row }) => <div>{row.getValue("keyScientificAspects")}</div>,
  },
  {
    accessorKey: "fieldOfUse",
    header: "Field of Use",
    cell: ({ row }) => <div>{row.getValue("fieldOfUse")}</div>,
  },
  {
    accessorKey: "collaboratingPartnerName",
    header: "Collaborating Partner Name",
    cell: ({ row }) => <div>{row.getValue("collaboratingPartnerName")}</div>,
  },
  {
    accessorKey: "financialSupport",
    header: "Financial Support",
    cell: ({ row }) => <div>{row.getValue("financialSupport")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 11),
  },
];

export const Table13Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.getValue("scope")}</div>,
  },
  {
    accessorKey: "departmentName",
    header: "Department Name",
    cell: ({ row }) => <div>{row.getValue("departmentName")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 12),
  },
];

export const Table14Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "typeOfLinkage",
    header: ({ column }) => filterCell(column, "Type"),
    cell: ({ row }) => <div>{row.getValue("typeOfLinkage")}</div>,
  },
  {
    accessorKey: "linkageEstablishmentDate",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("linkageEstablishmentDate")}</div>,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.getValue("scope")}</div>,
  },
  {
    accessorKey: "collaboratingAgency",
    header: "Collaborating Agency",
    cell: ({ row }) => <div>{row.getValue("collaboratingAgency")}</div>,
  },
  {
    accessorKey: "collaboratingAgencyCountry",
    header: "Collaborating Agency Country",
    cell: ({ row }) => <div>{row.getValue("collaboratingAgencyCountry")}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "areaOfFocus",
    header: "Area of Focus",
    cell: ({ row }) => <div>{row.getValue("areaOfFocus")}</div>,
  },
  {
    accessorKey: "mouCopy",
    header: "MoU Copy",
    cell: ({ row }) => fileCell(row, "mouCopy"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 13),
  },
];

export const Table15Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "titleOfAward",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("titleOfAward")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "awardingAgency",
    header: "Awarding Agency",
    cell: ({ row }) => <div>{row.getValue("awardingAgency")}</div>,
  },
  {
    accessorKey: "amountOfPrize",
    header: "Amount of Prize",
    cell: ({ row }) => <div>{row.getValue("amountOfPrize")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 14),
  },
];

export const Table16Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "date",
    header: ({ column }) => filterCell(column, "Date"),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "dataProvidedTo",
    header: "Data Provided To",
    cell: ({ row }) => <div>{row.getValue("dataProvidedTo")}</div>,
  },
  {
    accessorKey: "programOfOrganization",
    header: "Program of Organization",
    cell: ({ row }) => <div>{row.getValue("programOfOrganization")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 15),
  },
];

export const Table17Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "title",
    header: ({ column }) => filterCell(column, "Title"),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 16),
  },
];

export const Table18Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "programName",
    header: ({ column }) => filterCell(column, "Name"),
    cell: ({ row }) => <div>{row.getValue("programName")}</div>,
  },
  {
    accessorKey: "noOfStudents",
    header: "No of Students",
    cell: ({ row }) => <div>{row.getValue("noOfStudents")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <div>{row.getValue("details")}</div>,
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 17),
  },
];

export const Table19Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => firstCell(row),
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => filterCell(column, "Name"),
    cell: ({ row }) => <div>{row.getValue("organizationName")}</div>,
  },
  {
    accessorKey: "noOfMenbers",
    header: "No of Menbers",
    cell: ({ row }) => <div>{row.getValue("noOfMenbers")}</div>,
  },
  {
    accessorKey: "membersName",
    header: "Members Name",
    cell: ({ row }) => <div>{row.getValue("membersName")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "objectives",
    header: "Objectives",
    cell: ({ row }) => <div>{row.getValue("objectives")}</div>,
  },

  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => linkCell(row, "link"),
  },
  {
    accessorKey: "evidence",
    header: "Evidence",
    cell: ({ row }) => fileCell(row, "evidence"),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => actionCell(row, "Research Publications", 18),
  },
];
