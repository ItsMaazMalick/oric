"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { ResearchPublicationsTable } from "../tables/ResearchPublicationsTable";
import { useState } from "react";
import { Form1Research } from "../forms/Form1Research";
import { Form2BookAuthoredEdited } from "../forms/Form2BookAuthoredEdited";
import { BookAuthoredEditedTable } from "../tables/BookAuthoredEditedTable";
import { Form3ResearchProjects } from "../forms/Form3ResearchProjects";
import { ResearchProjectsTable } from "../tables/ResearchProjectsTable";
import { Form4Trainings } from "../forms/Form4Trainings";
import { Form7MSPhdThesis } from "../forms/Form7MSPhdThesis";
import { Form8PrivacyAdvocacy } from "../forms/Form8PrivacyAdvocacy";
import { Form9ResearchLinks } from "../forms/Form9ResearchLinks";
import { Form10ContractResearch } from "../forms/Form10ContractResearch";
import { Form11CivicEngagementEvent } from "../forms/Form11CivicEngagementEvent";
import { Form12ConsultancyContract } from "../forms/Form12ConsultancyContract";
import { Form13PatentsTrademark } from "../forms/Form13PatentsTrademark";
import { Form14ResearchProductsProcess } from "../forms/Form14ResearchProductsProcess";
import { Form15ScienceArtsProduct } from "../forms/Form15ScienceArtsProduct";
import { Form16AgreementSigned } from "../forms/Form16AgreementSigned";
import { Form17ListOfCommunity } from "../forms/Form17ListOfCommunity";
import { Form18ListMentorship } from "../forms/Form18ListMentorship";
import { Form19ListStudent } from "../forms/Form19ListStudent";
import { Form20LabFacilities } from "../forms/Form20LabFacilities";
import { formTitles } from "@/constants/data";

export function AccordionComp({
  id,
  userCookie,
}: {
  id: string;
  userCookie: string;
}) {
  const [isShow, setIsShow] = useState(false);

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
            <Form1Research id={id} userCookie={userCookie} />
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
              <ResearchPublicationsTable id={id} userCookie={userCookie} />
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
          {isShow && (
            <BookAuthoredEditedTable id={id} userCookie={userCookie} />
          )}
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
            <Form4Trainings id={id} userCookie={userCookie} />
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
            <Form7MSPhdThesis id={id} userCookie={userCookie} />
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
            <Form8PrivacyAdvocacy id={id} userCookie={userCookie} />
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
            <Form9ResearchLinks id={id} userCookie={userCookie} />
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
            <Form10ContractResearch id={id} userCookie={userCookie} />
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
            <Form11CivicEngagementEvent id={id} userCookie={userCookie} />
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
            <Form12ConsultancyContract id={id} userCookie={userCookie} />
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
            <Form13PatentsTrademark id={id} userCookie={userCookie} />
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
            <Form14ResearchProductsProcess id={id} userCookie={userCookie} />
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
            <Form15ScienceArtsProduct id={id} userCookie={userCookie} />
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
            <Form16AgreementSigned id={id} userCookie={userCookie} />
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
            <Form17ListOfCommunity id={id} userCookie={userCookie} />
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
            <Form18ListMentorship id={id} userCookie={userCookie} />
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
            <Form19ListStudent id={id} userCookie={userCookie} />
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
            <Form20LabFacilities id={id} userCookie={userCookie} />
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
