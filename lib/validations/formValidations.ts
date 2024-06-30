import * as z from "zod";

const requireString = z.string().min(1, "This field is required");
const optionalString = z.string().optional();
const requiredInt = z.coerce.number().min(0, "This field is required");
const optionalInt = z.coerce.number().optional();

export const researchPublicationSchema = z.object({
  year: requireString,
  country: requireString,
  journalName: requireString,
  title: requireString,
  authorName: requireString,
  category: requireString,
  status: requireString,
  issn: requireString,
  volume: requireString,
  pages: requiredInt,
  affiliation: requireString,
  link: requireString,
  countries: requireString,
  addressing: requireString,
});

export const bookAuthoredSchema = z.object({
  isbn: requireString,
  role: requireString,
  pages: requiredInt,
  year: requireString,
  country: requireString,
  bookTitle: requireString,
  chapterTitle: optionalString,
  publisherName: requireString,
  affiliation: requireString,
  link: requireString,
  addressing: requireString,
});

// 3 - Research Projects
export const researchProjectSchema = z.object({
  date: requireString,
  fundingAgency: requireString,
  nameOfResearch: requireString,
  status: requireString,
  type: requireString,
  role: requireString,
  grantAmount: requiredInt,
  title: requireString,
  startDate: requireString,
  endDate: requireString,
  totalFunding: requiredInt,
  collaboratingPartner: optionalString,
  coFundingPartner: optionalString,
  completion: requireString,
  remarks: optionalString,
});

export const traningsWorkshopSchema = z.object({
  eventType: requireString,
  applicantRole: requireString,
  startDate: requireString,
  endDate: requireString,
  eventTitle: requireString,
  noOfParticipants: requiredInt,
  majorFocusArea: requireString,
  audienceType: requireString,
  organizer: requireString,
  country: requireString,
});

export const thesisSchema = z.object({
  role: requireString,
  nameOfSupervisor: optionalString,
  year: requireString,
  degreeLevel: requireString,
  degreeProgram: requireString,
  department: requireString,
  university: requireString,
  studentName: requireString,
  degreeStage: requireString,
});

export const policyAdvocacySchema = z.object({
  year: requireString,
  nameOfGovernmentBody: requireString,
  nameOfResearcher: requireString,
  designationOfResearcher: requireString,
  areaAdvocated: requireString,
  brief: requireString,
  partners: requireString,
  advocacyTools: requireString,
});

export const linksEstablishedSchema = z.object({
  linkageType: requireString,
  scope: requireString,
  nameOfCollaboratingAgency: requireString,
  countryOfCollaboratingAgency: requireString,
  scopeOfCollaboration: requireString,
  linkageDate: requireString,
});

export const contractResearchSchema = z.object({
  scope: requireString,
  sponsoringAgencyCountry: requireString,
  contractAwardingAgency: requireString,
  title: requireString,
  amountOfContract: requiredInt,
  role: requireString,
  nameOfPI: optionalString,
  designationOfPI: optionalString,
  organizationOfPI: optionalString,
  startingDate: requireString,
  endingDate: requireString,
  dateOfContract: requireString,
});

export const civicEngagementSchema = z.object({
  type: requireString,
  role: requireString,
  title: requireString,
  communityInvolved: requireString,
  outcomes: requireString,
  date: requireString,
  collaboratingAgency: requireString,
  collaboratingAgencyName: requireString,
});

export const consultancyContractSchema = z.object({
  consultancyType: requireString,
  titleOfConsultancy: requireString,
  role: requireString,
  companyName: requireString,
  companyCountry: requireString,
  contractValue: requiredInt,
  startDate: requireString,
  endDate: requireString,
  keyDeliverables: requireString,
  remarks: optionalString,
});

export const patentsTradeSchema = z.object({
  typeOfIP: requireString,
  scope: requireString,
  date: requireString,
  namesOfInventors: requireString,
  inventionTitle: requireString,
  IPStatus: requireString,
  royaltyRevenue: requiredInt,
  keyScientificAspects: requireString,
  commertialPartners: optionalString,
});

export const researchProductsSchema = z.object({
  type: requireString,
  category: requireString,
  developmentStatus: requireString,
  date: requireString,
  nameOfInventors: requireString,
  title: requireString,
  keyScientificAspects: requireString,
  fieldOfUse: requireString,
  collaboratingPartnerName: optionalString,
  financialSupport: requiredInt,
});

export const scienceArtsProductsSchema = z.object({
  category: requireString,
  date: requireString,
  scope: requireString,
  title: requireString,
  departmentName: requireString,
});

export const agreementSignedSchema = z.object({
  typeOfLinkage: requireString,
  linkageEstablishmentDate: requireString,
  scope: requireString,
  collaboratingAgency: requireString,
  collaboratingAgencyCountry: requireString,
  duration: requireString,
  areaOfFocus: requireString,
});

export const nationalInternationalAwardsSchema = z.object({
  date: requireString,
  titleOfAward: requireString,
  awardingAgency: requireString,
  amountOfPrize: requireString,
});

export const hecSchema = z.object({
  date: requireString,
  dataProvidedTo: requireString,
  programOfOrganization: requireString,
});

export const communitySchema = z.object({
  date: requireString,
  role: requireString,
  type: requireString,
  title: requireString,
});

export const mentorshipSchema = z.object({
  programName: requireString,
  noOfStudents: requireString,
  role: requireString,
  details: requireString,
});
