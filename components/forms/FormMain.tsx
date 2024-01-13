import React from "react";
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
import { Form1ResearchPublications } from "../forms/Form1ResearchPublications";
import { Form2BookAuthoredEdited } from "../forms/Form2BookAuthoredEdited";
import { Form3ResearchProjects } from "../forms/Form3ResearchProjects";
import { Form4TrainingsWorkshops } from "../forms/Form4TrainingsWorkshops";
import { Form5ThesisFYPSupervised } from "../forms/Form5ThesisFYPSupervised";
import { Form6PolicyAdvocacyORCaseStudies } from "../forms/Form6PolicyAdvocacyORCaseStudies";
import { Form7LinksEstablished } from "../forms/Form7LinksEstablished";
import { Form8ContractResearchAwarded } from "../forms/Form8ContractResearchAwarded";
import { Form9CivicEngagementEvents } from "../forms/Form9CivicEngagementEvents";
import { getUserSession } from "@/lib/session";
import { cookies } from "next/headers";

export default async function FormMain({ index }: { index: number }) {
  const { id } = await getUserSession();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  return (
    <>
      <div className="p-4 border-2 border-primary rounded-lg">
        {index === 0 ? (
          <Form1ResearchPublications id={id} userCookie={userCookie} />
        ) : index === 1 ? (
          <Form2BookAuthoredEdited id={id} userCookie={userCookie} />
        ) : index === 2 ? (
          <Form3ResearchProjects id={id} userCookie={userCookie} />
        ) : index === 3 ? (
          <Form4TrainingsWorkshops id={id} userCookie={userCookie} />
        ) : index === 4 ? (
          <Form5ThesisFYPSupervised id={id} userCookie={userCookie} />
        ) : index === 5 ? (
          <Form6PolicyAdvocacyORCaseStudies id={id} userCookie={userCookie} />
        ) : index === 6 ? (
          <Form7LinksEstablished id={id} userCookie={userCookie} />
        ) : index === 7 ? (
          <Form8ContractResearchAwarded id={id} userCookie={userCookie} />
        ) : index === 8 ? (
          <Form9CivicEngagementEvents id={id} userCookie={userCookie} />
        ) : index === 9 ? (
          <Form10ConsultancyContractsWithIndustry
            id={id}
            userCookie={userCookie}
          />
        ) : index === 10 ? (
          <Form11PatentsTradeMarksDesignPatent
            id={id}
            userCookie={userCookie}
          />
        ) : index === 11 ? (
          <Form12ResearchProductsProcessPrototype
            id={id}
            userCookie={userCookie}
          />
        ) : index === 12 ? (
          <Form13ScienceArtsProducts id={id} userCookie={userCookie} />
        ) : index === 13 ? (
          <Form14AgreementsSignedForCollaboration
            id={id}
            userCookie={userCookie}
          />
        ) : index === 14 ? (
          <Form15NationalOrInternationalHonors
            id={id}
            userCookie={userCookie}
          />
        ) : index === 15 ? (
          <Form16DoYouProvideData id={id} userCookie={userCookie} />
        ) : index === 16 ? (
          <Form17CommunityWork id={id} userCookie={userCookie} />
        ) : index === 17 ? (
          <Form18MentorshipProgrammes id={id} userCookie={userCookie} />
        ) : (
          <Form19StudentOrganizations id={id} userCookie={userCookie} />
        )}
      </div>
      <div className="w-full mt-4 border-t-2 border-primary" />
    </>
  );
}
