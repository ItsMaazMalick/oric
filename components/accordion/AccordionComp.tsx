"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { ResearchPublicationsTable } from "../tables/ResearchPublicationsTable";
import { useEffect, useState } from "react";

import { formTitles } from "@/constants/data";
import { Form1ResearchPublications } from "../forms/Form1ResearchPublications";
import { Form2BookAuthoredEdited } from "../forms/Form2BookAuthoredEdited";
import { BookAuthoredEditedTable } from "../tables/BookAuthoredEditedTable";
import { Form3ResearchProjects } from "../forms/Form3ResearchProjects";
import { ResearchProjectsTable } from "../tables/ResearchProjectsTable";
import { Form4TrainingsWorkshops } from "../forms/Form4TrainingsWorkshops";
import { Form5ThesisFYPSupervised } from "../forms/Form5ThesisFYPSupervised";
import { Form6PolicyAdvocacyORCaseStudies } from "../forms/Form6PolicyAdvocacyORCaseStudies";
import { Form7LinksEstablished } from "../forms/Form7LinksEstablished";
import { Form8ContractResearchAwarded } from "../forms/Form8ContractResearchAwarded";
import { Form9CivicEngagementEvents } from "../forms/Form9CivicEngagementEvents";
import { Form10ConsultancyContractsWithIndustry } from "../forms/Form10ConsultancyContractsWithIndustry";
import { Form11PatentsTradeMarksDesignPatent } from "../forms/Form11PatentsTradeMarksDesignPatent";
import { Form12ResearchProductsProcessPrototype } from "../forms/Form12ResearchProductsProcessPrototype";
import { Form13ScienceArtsProducts } from "../forms/Form13ScienceArtsProducts";
import { Form14AgreementsSignedForCollaboration } from "../forms/Form14AgreementsSignedForCollaboration";
import { Form15NationalOrInternationalHonors } from "../forms/Form15NationalOrInternationalHonors";
import { Form16DoYouProvideData } from "../forms/Form16DoYouProvideData";
import { Form17CommunityWork } from "../forms/Form17CommunityWork";
import { Form18MentorshipProgrammes } from "../forms/Form18MentorshipProgrammes";
import { Form19StudentOrganizations } from "../forms/Form19StudentOrganizations";
import AdminDataTable from "../tables/AdminDataTable";

export function AccordionComp({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [isShow, setIsShow] = useState(false);
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

  const handleOpen = () => {
    setIsShow((prev) => !prev);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-sm sm:text-base"
    >
      {/* 1 - PUBLISHED BOOKS */}
      <AccordionItem value="item-1">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[0]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form1ResearchPublications id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
              {/* <ResearchPublicationsTable id={id} userCookie={userCookie} /> */}
              <AdminDataTable data={books} index={1} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 2 - BOOK AUTHORED EDITED */}
      <AccordionItem value="item-2">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[1]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form2BookAuthoredEdited id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && <AdminDataTable data={books} index={2} />}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 3 - CHAPTERS IN PUBLISHED BOOKS */}
      <AccordionItem value="item-3">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[2]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form3ResearchProjects id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchProjectsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 4 - Trainings / Workshops / Seminars / Conferences arranged by your Department */}
      <AccordionItem value="item-4">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[3]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form4TrainingsWorkshops id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 7 - MS PDH THESIS */}
      <AccordionItem value="item-5">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[4]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form5ThesisFYPSupervised id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 8 - APPLIED RESEARCH OUTPUT/INNOVATION */}
      <AccordionItem value="item-6">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[5]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form6PolicyAdvocacyORCaseStudies id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 9 - RESEARCH LINKS OTHER HEITS */}
      <AccordionItem value="item-7">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[6]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form7LinksEstablished id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 10 - CONTRACT RESEARCH */}
      <AccordionItem value="item-8">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[7]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form8ContractResearchAwarded id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 11 - CivicEngagementEvent */}
      <AccordionItem value="item-9">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[8]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form9CivicEngagementEvents id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 12 - ConsultancyContract */}
      <AccordionItem value="item-10">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[9]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form10ConsultancyContractsWithIndustry
              id={id}
              userCookie={userCookie}
            />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 13 - PatentsTrademark */}
      <AccordionItem value="item-11">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[10]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form11PatentsTradeMarksDesignPatent
              id={id}
              userCookie={userCookie}
            />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 14 - ResearchProductsProcess */}
      <AccordionItem value="item-12">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[11]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form12ResearchProductsProcessPrototype
              id={id}
              userCookie={userCookie}
            />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 15 - ScienceArtsProduct */}
      <AccordionItem value="item-13">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[12]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form13ScienceArtsProducts id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 16 - AgreementSigned */}
      <AccordionItem value="item-14">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[13]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form14AgreementsSignedForCollaboration
              id={id}
              userCookie={userCookie}
            />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 17 - ListOfCommunity */}
      <AccordionItem value="item-15">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[14]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form15NationalOrInternationalHonors
              id={id}
              userCookie={userCookie}
            />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>

      {/* 18 - LIST OF MENTORSHIP */}
      <AccordionItem value="item-16">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[15]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form16DoYouProvideData id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 19 - LIST OF STUDENTS */}
      <AccordionItem value="item-17">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[16]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form17CommunityWork id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 20 - LAB FACILITIES */}
      <AccordionItem value="item-18">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[17]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form18MentorshipProgrammes id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
      {/* 20 - LAB FACILITIES */}
      <AccordionItem value="item-19">
        <AccordionTrigger
          onClick={handleClose}
          className="font-bold text-left text-primary hover:text-secondary"
        >
          {formTitles[18]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 border-2 border-primary rounded-lg">
            <Form19StudentOrganizations id={id} userCookie={userCookie} />
          </div>
          <div className="relative">
            <div className="absolute -top-14 left-24 sm:left-28 text-primary">
              <Button
                className="text-xs sm:text-base font-bold underline"
                variant={"ghost"}
                onClick={handleOpen}
              >
                {isShow ? "Hide" : "Show"}&nbsp;Records
              </Button>
            </div>
          </div>
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
          {isShow && (
            <div className="h-[400px] overflow-y-auto overflow-x-visible">
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
            </div>
          )}
          {isShow && <div className="w-full mt-4 border-t-2 border-primary" />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
