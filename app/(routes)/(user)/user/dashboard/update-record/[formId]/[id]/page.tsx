import { getUserSession } from "@/app/actions/session";
import { getAgreementsSigned } from "@/app/actions/user/records/agreements-signed";
import { getBookAuthoredEdited } from "@/app/actions/user/records/book-authored-edited";
import { getCivicEngagement } from "@/app/actions/user/records/civic-engagement";
import { getCommunityWork } from "@/app/actions/user/records/community-work";
import { getConsultancyContracts } from "@/app/actions/user/records/consultancy-contracts";
import { getContractResearch } from "@/app/actions/user/records/contract-research";
import { getDataProvidedToHec } from "@/app/actions/user/records/data-provided-to-hec";
import { getLinksEstablished } from "@/app/actions/user/records/links-established";
import { getMentorshipProgram } from "@/app/actions/user/records/mentorship-program";
import { getNationalInternationalHonors } from "@/app/actions/user/records/national-international-honors";
import { getPatentsTrade } from "@/app/actions/user/records/patents-trade";
import { getPolicyAdvocacy } from "@/app/actions/user/records/policy-advocacy";
import { getResearchProducts } from "@/app/actions/user/records/research-products";
import { getResearchProjects } from "@/app/actions/user/records/researchProjects";
import { getResearchPublications } from "@/app/actions/user/records/researchPublications";
import { getScienceArtsProducts } from "@/app/actions/user/records/science-arts-products";
import { getStudentOrganization } from "@/app/actions/user/records/student-organization";
import { getThesis } from "@/app/actions/user/records/thesis";
import { getTrainingsWorkshops } from "@/app/actions/user/records/tranings-workshop";
import BackButton from "@/components/button/BackButton";
import { Form10ConsultancyContractsWithIndustry } from "@/components/forms/Form10ConsultancyContractsWithIndustry";
import { Form11PatentsTradeMarksDesignPatent } from "@/components/forms/Form11PatentsTradeMarksDesignPatent";
import { Form12ResearchProductsProcessPrototype } from "@/components/forms/Form12ResearchProductsProcessPrototype";
import { Form13ScienceArtsProducts } from "@/components/forms/Form13ScienceArtsProducts";
import { Form14AgreementsSignedForCollaboration } from "@/components/forms/Form14AgreementsSignedForCollaboration";
import { Form15NationalOrInternationalHonors } from "@/components/forms/Form15NationalOrInternationalHonors";
import { Form16DoYouProvideData } from "@/components/forms/Form16DoYouProvideData";
import { Form17CommunityWork } from "@/components/forms/Form17CommunityWork";
import { Form18MentorshipProgrammes } from "@/components/forms/Form18MentorshipProgrammes";
import { Form19StudentOrganizations } from "@/components/forms/Form19StudentOrganizations";
import { Form1ResearchPublications } from "@/components/forms/Form1ResearchPublications";
import { Form2BookAuthoredEdited } from "@/components/forms/Form2BookAuthoredEdited";
import { Form3ResearchProjects } from "@/components/forms/Form3ResearchProjects";
import { Form4TrainingsWorkshops } from "@/components/forms/Form4TrainingsWorkshops";
import { Form5ThesisFYPSupervised } from "@/components/forms/Form5ThesisFYPSupervised";
import { Form6PolicyAdvocacyORCaseStudies } from "@/components/forms/Form6PolicyAdvocacyORCaseStudies";
import { Form7LinksEstablished } from "@/components/forms/Form7LinksEstablished";
import { Form8ContractResearchAwarded } from "@/components/forms/Form8ContractResearchAwarded";
import { Form9CivicEngagementEvents } from "@/components/forms/Form9CivicEngagementEvents";
import { redirect } from "next/navigation";

export default async function UpdateRecord({
  params,
}: {
  params: { formId: string; id: string };
}) {
  const { formId, id } = params;
  const session = await getUserSession();
  if (!session?.success) {
    return redirect("/user/login");
  }

  const userId = session.id || "";
  const index = Number(formId);
  let data;

  if (index === 1) {
    data = await getResearchPublications(userId, id);
  } else if (index === 2) data = await getBookAuthoredEdited(userId, id);
  else if (index === 3) data = await getResearchProjects(userId, id);
  else if (index === 4) data = await getTrainingsWorkshops(userId, id);
  else if (index === 5) data = await getThesis(userId, id);
  else if (index === 6) data = await getPolicyAdvocacy(userId, id);
  else if (index === 7) data = await getLinksEstablished(userId, id);
  else if (index === 8) data = await getContractResearch(userId, id);
  else if (index === 9) data = await getCivicEngagement(userId, id);
  else if (index === 10) data = await getConsultancyContracts(userId, id);
  else if (index === 11) data = await getPatentsTrade(userId, id);
  else if (index === 12) data = await getResearchProducts(userId, id);
  else if (index === 13) data = await getScienceArtsProducts(userId, id);
  else if (index === 14) data = await getAgreementsSigned(userId, id);
  else if (index === 15)
    data = await getNationalInternationalHonors(userId, id);
  else if (index === 16) data = await getDataProvidedToHec(userId, id);
  else if (index === 17) data = await getCommunityWork(userId, id);
  else if (index === 18) data = await getMentorshipProgram(userId, id);
  else if (index === 19) data = await getStudentOrganization(userId, id);
  if (!data) {
    return (
      <div className="h-[300px] mt-4 flex justify-center items-center bg-white text-destructive rounded-md">
        No Record Found
      </div>
    );
  }

  return (
    <>
      <div className="pt-4 pl-4">
        <BackButton />
      </div>
      <div className="p-2 bg-white mt-4 rounded-md">
        {index === 1 ? (
          <Form1ResearchPublications id={data.userId} updateData={data} />
        ) : index === 2 ? (
          <Form2BookAuthoredEdited id={data.userId} updateData={data} />
        ) : index === 3 ? (
          <Form3ResearchProjects id={data.userId} updateData={data} />
        ) : index === 4 ? (
          <Form4TrainingsWorkshops id={data.userId} updateData={data} />
        ) : index === 5 ? (
          <Form5ThesisFYPSupervised id={data.userId} updateData={data} />
        ) : index === 6 ? (
          <Form6PolicyAdvocacyORCaseStudies
            id={data.userId}
            updateData={data}
          />
        ) : index === 7 ? (
          <Form7LinksEstablished id={data.userId} updateData={data} />
        ) : index === 8 ? (
          <Form8ContractResearchAwarded id={data.userId} updateData={data} />
        ) : index === 9 ? (
          <Form9CivicEngagementEvents id={data.userId} updateData={data} />
        ) : index === 10 ? (
          <Form10ConsultancyContractsWithIndustry
            id={data.userId}
            updateData={data}
          />
        ) : index === 11 ? (
          <Form11PatentsTradeMarksDesignPatent
            id={data.userId}
            updateData={data}
          />
        ) : index === 12 ? (
          <Form12ResearchProductsProcessPrototype
            id={data.userId}
            updateData={data}
          />
        ) : index === 13 ? (
          <Form13ScienceArtsProducts id={data.userId} updateData={data} />
        ) : index === 14 ? (
          <Form14AgreementsSignedForCollaboration
            id={data.userId}
            updateData={data}
          />
        ) : index === 15 ? (
          <Form15NationalOrInternationalHonors
            id={data.userId}
            updateData={data}
          />
        ) : index === 16 ? (
          <Form16DoYouProvideData id={data.userId} updateData={data} />
        ) : index === 17 ? (
          <Form17CommunityWork id={data.userId} updateData={data} />
        ) : index === 18 ? (
          <Form18MentorshipProgrammes id={data.userId} updateData={data} />
        ) : index === 19 ? (
          <Form19StudentOrganizations id={data.userId} updateData={data} />
        ) : null}
      </div>
    </>
  );
}
