import * as z from "zod";

const phoneRegex = /^03[0-4]\d{8}$/;

export const validateLogin = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const userValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().refine((dob) => {
      // Parse the date string into a Date object
      const dobDate = new Date(dob);
      // Calculate a date from some years ago (e.g., 18 years ago)
      const yearsAgo = new Date();
      yearsAgo.setFullYear(yearsAgo.getFullYear() - 18); // Change 18 to the desired minimum age
      // Compare the date of birth with the minimum allowed date
      return dobDate <= yearsAgo;
    }, "Must be at least 18 years old"),
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Password is required"),
    gender: z.string().min(1, "Gender is required"),
    phone_no: z.string().refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number",
    }),
    cell_no: z.string().min(1, "Cell No is required"),
    research_domain: z.string().min(1, "Research Domain is required"),
    highest_degree: z.string().min(1, "Highest Degree is required"),
  })

  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// 1 - Research Publications (Impact Journal / HJRS / HEC Recognized Journals)
export const validateForm1 = z.object({
  date: z.string(),
  journal_name: z.string().min(1, "Journal name is required"),
  title: z.string().min(1, "Title is required"),
  authors: z.string().min(1, "Authors name is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  issn: z.string().min(1, "ISSN is required"),
  volume: z.string().min(1, "Volume is required"),
  page_no: z.coerce.number().min(1, "Page no is required"),
  affiliation: z.string().min(1, "Affiliation is required"),
  link: z
    .string()
    .regex(
      /https:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?/,
      "Correct way: https://abc.com"
    )
    .min(1, "Weblink is required"),
  country: z.string(),
  addressing: z.string(),
});
// 2 - Book Authored / Edited
export const validateForm2 = z.object({
  date: z.string().min(1, "Year is required"),
  title_of_book: z.string().min(1, "Book title is required"),
  title_of_research: z.string().min(1, "Researc title is required"),
  publisher: z.string().min(1, "Publisher is required"),
  country: z.string().min(1, "Country is required"),
  role: z.string().min(1, "Role is required"),
  isbn: z.string().min(1, "ISBN is required"),
  link: z
    .string()
    .regex(
      /https:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?/,
      "Correct way: https://abc.com"
    )
    .min(1, "Weblink is required"),
  pages: z.coerce.number().min(1, "Pages are required"),
  affiliation: z.string().min(1, "Affiliation is required"),
  addressing: z.string().min(1, "Address is required"),
});
// 3 - Research Projects
export const validateForm3 = z.object({
  date: z.string().min(1, "Year is required"),
  funding_agency: z.string().min(1, "Funding agency is required"),
  name_of_research: z.string().min(1, "Research name is required"),
  status: z.string().min(1, "Status is required"),
  type: z.string().min(1, "Type is required"),
  role: z.string().min(1, "Role is required"),
  grant_amount: z.coerce.number().min(1, "Grant amount is required"),
  title: z.string().min(1, "Title is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  total_funding: z.coerce.number().min(1, "Total Funding is required"),
  collaborating_partner: z.string(),
  co_funding_partner: z.string(),
  completion: z.string().min(1, "Completion is required"),
  remarks: z.string(),
  // annex_file: z.string(),
});
// 4 - Trainings / Workshops / Seminars / Conferences Arranged by your Department
export const validateForm4 = z.object({
  title_of_training: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Year is required"),
  organizer: z.string().min(1, "Organizer is required"),
  no_of_participants: z.coerce
    .number()
    .min(1, "No of participants are required"),
  focus_area_outcomes: z
    .string()
    .min(1, "Major focus area & outcomes is required"),
  audience_type: z.string().min(1, "Audience type is required"),
});
// 5 - Trainings / Workshops / Seminars / Conferences Arranged by your Faculty Member
export const validateForm5 = z.object({
  title_of_training: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Year is required"),
  organizing_agency: z.string().min(1, "Organizing agency is required"),
  no_of_participants: z.coerce
    .number()
    .min(1, "No of participants are required"),
  focus_area_outcomes: z
    .string()
    .min(1, "Major focus area & outcomes is required"),
  country: z.string().min(1, "Country is required"),
  audience_type: z.string().min(1, "Audience type is required"),
  attended_as: z.string().min(1, "Attended is required"),
});
// 6 - BS Thesis Supervised
export const validateForm6 = z.object({
  level_of_degree: z.string().min(1, "Degree level is required"),
  date: z.string().min(1, "Year is required"),
  department: z.string().min(1, "Department is required"),
  university: z.string().min(1, "University is required"),
  student_name: z.string().min(1, "Student Name is required"),
  degree_stage: z.string().min(1, "Degree Stage is required"),
  degree_program: z.string().min(1, "Degree Program is required"),
  supervisor: z.string().min(1, "Supervisor is required"),
  co_supervisor: z.string().min(1, "Co-Supervisor is required"),
});
// 7 - MS PHD Thesis Supervised
export const validateForm7 = z.object({
  level_of_degree: z.string().min(1, "Degree level is required"),
  date: z.string().min(1, "Year is required"),
  department: z.string().min(1, "Department is required"),
  university: z.string().min(1, "University is required"),
  student_name: z.string().min(1, "Student Name is required"),
  degree_stage: z.string().min(1, "Degree Stage is required"),
  degree_program: z.string().min(1, "Degree Program is required"),
  supervisor: z.string().min(1, "Supervisor is required"),
  co_supervisor: z.string().min(1, "Co-Supervisor is required"),
});

// 8 - PRIVACY ADVOCACY
export const validateForm8 = z.object({
  date: z.string().min(1, "Date is required"),
  name_government_body: z.string().min(1, "Government name is required"),
  pi_name: z.string().min(1, "PI name is required"),
  pi_designation: z.string().min(1, "PI designation is required"),
  pi_department: z.string().min(1, "PI department is required"),
  area_of_advocated: z.string().min(1, "Area advocated is required"),
  brief: z.string().min(1, "Brief is required"),
  coalition_partners: z.string(),
  verification_status: z.string().min(1, "Verification status is required"),
  advocacy_tools: z.string().min(1, "Field is required"),
});

// 9 - RESEARCH LINKS OTHER HEIS
export const validateForm9 = z.object({
  type_of_linkage: z.string().min(1, "Type of linkage is required"),
  location_scope: z.string().min(1, "Field is required"),
  host_institution_name: z.string().min(1, "Field is required"),
  host_institution_address: z.string().min(1, "Address is required"),
  host_institution_country: z.string().min(1, "Country is required"),
  collaborating_agency_name: z.string().min(1, "Agency name is required"),
  collaborating_agency_address: z.string().min(1, "Agency address is required"),
  collaborating_agency_country: z.string().min(1, "Agency country is required"),
  filed_of_study: z.string().min(1, "Field of study is required"),
  scope_of_collaboration: z.string().min(1, "Collaboration scope is required"),
  linkage_establishment_date: z
    .string()
    .min(1, "Establishment date is required"),
  salient_features: z.string().min(1, "Salient features are required"),
});

// 10 -
export const validateForm10 = z.object({
  thematic_area: z.string().min(1, "Field is required"),
  title_of_research: z.string().min(1, "Title of research is required"),
  pi_name: z.string().min(1, "PI name is required"),
  pi_designation: z.string().min(1, "PI designation is required"),
  pi_department: z.string().min(1, "PI department is required"),
  co_pi_designation: z.string().min(1, "Co-PI designation is required"),
  co_pi_department: z.string().min(1, "Co-PI department is required"),
  co_pi_university: z.string().min(1, "Co-PI university is required"),
  sponsoring_agency_name: z
    .string()
    .min(1, "Sponsoring agency name is required"),
  sponsoring_agency_address: z
    .string()
    .min(1, "Sponsoring agency address is required"),
  sponsoring_agency_country: z
    .string()
    .min(1, "Sponsoring agency country is required"),
  location_scope: z.string().min(1, "Field is required"),
  counterpart_industry_address: z.string().min(1, "Field is required"),
  counterpart_industry_country: z.string().min(1, "Field is required"),
  start_date: z.string().min(1, "Starting date is required"),
  end_date: z.string().min(1, "Ending date is required"),
  total_amount_approved: z.coerce
    .number()
    .min(1, "Approved amount is required"),
  date_of_contract: z.string().min(1, "Date of contract is required"),
});

// 11 - CIVIC ENGAGEMENT EVENT
export const validateForm11 = z.object({
  title_of_event: z.string().min(1, "Title of event is required"),
  components_address: z.string().min(1, "Components address is required"),
  outcomes: z.string().min(1, "Outcomes is required"),
  collaboration_developed: z
    .string()
    .min(1, "Collaboration developed is required"),
  date: z.string().min(1, "Date is required"),
  name_of_csos: z.string().min(1, "Name of CSOs is required"),
  name_of_sponsoring_agency: z
    .string()
    .min(1, "Sponsoring agency name is required"),
  event_status: z.string().min(1, "Event status is required"),
  report_file: z.string(),
  remarks: z.string().min(1, "Remarks is required"),
  brief_report_file: z.string(),
});

// 12 - Consultancy Contract
export const validateForm12 = z.object({
  title_of_project: z.string().min(1, "Title is required"),
  pi_name: z.string().min(1, "PI name is required"),
  pi_designation: z.string().min(1, "PI designation is required"),
  pi_department: z.string().min(1, "PI department is required"),
  company_name: z.string().min(1, "Company name is required"),
  company_country: z.string().min(1, "Country is required"),
  contract_value: z.coerce.number().min(1, "contract value is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  type_of_consultancy: z.string().min(1, "Consultancy type is required"),
  key_deliverable_file: z.string(),
  oric_percentage: z.coerce.number().min(1, "ORIC percentage is required"),
  remarks: z.string().min(1, "Remarks is required"),
  annex_page_ref_file: z.string(),
});

// 13 - PatentsTrademark
export const validateForm13 = z.object({
  lead_inventor_name: z.string().min(1, "Lead inventor is required"),
  lead_inventor_designation: z.string().min(1, "Designer is required"),
  lead_inventor_department: z.string().min(1, "Department is required"),
  title_on_invention: z.string().min(1, "Invention title is required"),
  ip_category: z.string().min(1, "IP category is required"),
  development_status: z.string().min(1, "Development status is required"),
  key_scientific_aspects: z
    .string()
    .min(1, "Keyscientific aspects is required"),
  commercial_partner: z.string(),
  patent_name: z.string().min(1, "Patent name is required"),
  patent_department: z.string().min(1, "Patent department is required"),
  location_scope: z.string().min(1, "Field is required"),
  financial_support: z.string(),
  date_of_filling: z.string().min(1, "Date ofilling is required"),
  patent_copy_file: z.string(),
});

// 14 - ResearchProductsProcess
export const validateForm14 = z.object({
  lead_inventor_name: z.string().min(1, "Lead inventor is required"),
  lead_inventor_designation: z.string().min(1, "Designation is required"),
  lead_inventor_department: z.string().min(1, "Department is required"),
  title_on_invention: z.string().min(1, "Title is required"),
  ip_category: z.string().min(1, "IP is required"),
  development_status: z.string().min(1, "Development Status is required"),
  key_scientific_aspects: z
    .string()
    .min(1, "Key scientific aspects is required"),
  location_scope: z.string().min(1, "Field is required"),
  field_of_use: z.string().min(1, "Field of use is required"),
  collaborating_partner_name: z
    .string()
    .min(1, "Collaborating partner is required"),
  collaborating_partner_details: z
    .string()
    .min(1, "Details of partner is required"),
  financial_support: z.coerce.number(),
  remarks: z.string().min(1, "Remarks are required"),
  pd_proof_file: z.string(),
});

// 15 - ScienceArtsProduct
export const validateForm15 = z.object({
  title: z.string().min(1, "Title is required"),
  lead_name: z.string().min(1, "Lead name is required"),
  lead_designation: z.string().min(1, "Lead designation is required"),
  lead_department: z.string().min(1, "Lead department is required"),
  category: z.string().min(1, "Category is required"),
  location_scope: z.string().min(1, "Field is required"),
  forum: z.string().min(1, "Forum is required"),
  status: z.string().min(1, "Status is required"),
  financial_support: z.coerce.number(),
  field_of_use: z.string().min(1, "Field of use is required"),
  brief_file: z.string(),
});

// 16 - AgreementSignedForm16
export const validateForm16 = z.object({
  type_of_linkages: z.string().min(1, "Field is required"),
  location_scope: z.string().min(1, "Field is required"),
  host_name: z.string().min(1, "Host name is required"),
  host_address: z.string().min(1, "Host address is required"),
  host_country: z.string().min(1, "Host country is required"),
  duration: z.string().min(1, "Duration is required"),
  key_initiatives: z.string().min(1, "Key initiatives is required"),
  field: z.string().min(1, "Field is required"),
  scope_of_collaboration: z
    .string()
    .min(1, "Scope of collaborators is required"),
  linkage_establishment_date: z
    .string()
    .min(1, "Linkageestablishment date is required"),
  financial_support: z.coerce.number(),
  mou_copy_file: z.string(),
});

// 17 - ListOfCommunity
export const validateForm17 = z.object({
  community_type: z.string().min(1, "Community type is required"),
  title: z.string().min(1, "Title is required"),
  proofs: z.string(),
  date: z.string().min(1, "Date is required"),
  picture_file: z.string(),
});

// 18 - LIST OF MENTORSHIP
// export const validateForm18 = z.object({
//   program_name: z.string().min(1, "Program name is required"),
//   no_of_students: z.coerce.number().min(1, "No of students are required"),
//   details: z.string().min(1, "Details required"),
// });
export const validateForm18 = z.object({
  program_name: z.string().min(1, "Field is required"),
  no_of_students: z.coerce.number().min(0, "Field is required"),
  details: z.string().min(1, "Details required"),
});

// 19 - LIST OF STUDENT
export const validateForm19 = z.object({
  organization_name: z.string().min(1, "Organization name is required"),
  number_of_members: z.coerce
    .number()
    .min(1, "No of participants are required"),
  members_name: z.string().min(1, "Members name are required"),
  objective: z.string().min(1, "Objective is required"),
});

// 20 - LIST OF FACILITIES
export const validateForm20 = z.object({
  lab_name: z.string().min(1, "Lab name is required"),
  equipment_type: z.string().min(1, "Equipment type is required"),
  available_to_student: z.string().min(1, "Field is required"),
  available_to_community: z.string().min(1, "Field is required"),
});
