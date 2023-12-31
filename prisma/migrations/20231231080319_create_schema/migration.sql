-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "secret_key" TEXT,
    "gender" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "cell_no" TEXT NOT NULL,
    "research_domain" TEXT NOT NULL,
    "highest_degree" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchPublication" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "journal_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "issn" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "page_no" INTEGER NOT NULL,
    "affiliation" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "other_countries" TEXT,
    "addressing" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchPublication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAuthoredEdited" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "title_of_book" TEXT NOT NULL,
    "title_of_research" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "affiliation" TEXT NOT NULL,
    "addressing" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookAuthoredEdited_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchProject" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "funding_agency" TEXT NOT NULL,
    "name_of_research" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "grant_amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_funding" INTEGER NOT NULL,
    "collaborating_partner" TEXT,
    "co_funding_partner" TEXT,
    "completion" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "annex_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentTraining" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title_of_training" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "no_of_participants" INTEGER NOT NULL,
    "focus_area_outcomes" TEXT NOT NULL,
    "audience_type" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepartmentTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberTraining" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title_of_training" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "organizing_agency" TEXT NOT NULL,
    "no_of_participants" INTEGER NOT NULL,
    "focus_area_outcomes" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "audience_type" TEXT NOT NULL,
    "attended_as" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MSPHDThesis" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level_of_degree" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "degree_stage" TEXT NOT NULL,
    "degree_program" TEXT NOT NULL,
    "supervisor" TEXT NOT NULL,
    "co_supervisor" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MSPHDThesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BSThesis" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level_of_degree" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "degree_stage" TEXT NOT NULL,
    "degree_program" TEXT NOT NULL,
    "supervisor" TEXT NOT NULL,
    "co_supervisor" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BSThesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyAdvocacy" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name_government_body" TEXT NOT NULL,
    "pi_name" TEXT NOT NULL,
    "pi_designation" TEXT NOT NULL,
    "pi_department" TEXT NOT NULL,
    "area_of_advocated" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "coalition_partners" TEXT,
    "verification_status" TEXT NOT NULL,
    "advocacy_tools" TEXT NOT NULL,
    "policy_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PolicyAdvocacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchLinksOtherHEIS" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_of_linkage" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "host_institution_name" TEXT NOT NULL,
    "host_institution_address" TEXT NOT NULL,
    "host_institution_country" TEXT NOT NULL,
    "collaborating_agency_name" TEXT NOT NULL,
    "collaborating_agency_address" TEXT NOT NULL,
    "collaborating_agency_country" TEXT NOT NULL,
    "filed_of_study" TEXT NOT NULL,
    "scope_of_collaboration" TEXT NOT NULL,
    "linkage_establishment_date" TEXT NOT NULL,
    "salient_features" TEXT NOT NULL,
    "mou_copy_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchLinksOtherHEIS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractResearchGovernmentOrganization" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "thematic_area" TEXT NOT NULL,
    "title_of_research" TEXT NOT NULL,
    "pi_name" TEXT NOT NULL,
    "pi_designation" TEXT NOT NULL,
    "pi_department" TEXT NOT NULL,
    "co_pi_designation" TEXT NOT NULL,
    "co_pi_department" TEXT NOT NULL,
    "co_pi_university" TEXT NOT NULL,
    "sponsoring_agency_name" TEXT NOT NULL,
    "sponsoring_agency_address" TEXT NOT NULL,
    "sponsoring_agency_country" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "counterpart_industry_address" TEXT NOT NULL,
    "counterpart_industry_country" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_amount_approved" INTEGER NOT NULL,
    "project_expected_file" TEXT NOT NULL,
    "date_of_contract" TEXT NOT NULL,
    "contract_research_copy_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractResearchGovernmentOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CivicEngagementEvent" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title_of_event" TEXT NOT NULL,
    "components_address" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL,
    "collaboration_developed" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name_of_csos" TEXT NOT NULL,
    "name_of_sponsoring_agency" TEXT NOT NULL,
    "event_status" TEXT NOT NULL,
    "report_file" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "brief_report_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CivicEngagementEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultancyContract" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title_of_project" TEXT NOT NULL,
    "pi_name" TEXT NOT NULL,
    "pi_designation" TEXT NOT NULL,
    "pi_department" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_country" TEXT NOT NULL,
    "contract_value" INTEGER NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "type_of_consultancy" TEXT NOT NULL,
    "key_deliverable_file" TEXT NOT NULL,
    "oric_percentage" INTEGER,
    "remarks" TEXT NOT NULL,
    "annex_page_ref_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultancyContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatentsTrademark" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lead_inventor_name" TEXT NOT NULL,
    "lead_inventor_designation" TEXT NOT NULL,
    "lead_inventor_department" TEXT NOT NULL,
    "title_on_invention" TEXT NOT NULL,
    "ip_category" TEXT NOT NULL,
    "development_status" TEXT NOT NULL,
    "key_scientific_aspects" TEXT NOT NULL,
    "commercial_partner" TEXT,
    "patent_name" TEXT NOT NULL,
    "patent_department" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "financial_support" INTEGER,
    "date_of_filling" TEXT NOT NULL,
    "patent_copy_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatentsTrademark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchProductsProcess" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lead_inventor_name" TEXT NOT NULL,
    "lead_inventor_designation" TEXT NOT NULL,
    "lead_inventor_department" TEXT NOT NULL,
    "title_on_invention" TEXT NOT NULL,
    "ip_category" TEXT NOT NULL,
    "development_status" TEXT NOT NULL,
    "key_scientific_aspects" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "field_of_use" TEXT NOT NULL,
    "collaborating_partner_name" TEXT NOT NULL,
    "collaborating_partner_details" TEXT NOT NULL,
    "financial_support" INTEGER,
    "remarks" TEXT NOT NULL,
    "pd_proof_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchProductsProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScienceArtsProduct" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lead_name" TEXT NOT NULL,
    "lead_designation" TEXT NOT NULL,
    "lead_department" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "forum" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "financial_support" INTEGER,
    "field_of_use" TEXT NOT NULL,
    "brief_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScienceArtsProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgreementSigned" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_of_linkages" TEXT NOT NULL,
    "location_scope" TEXT NOT NULL,
    "host_name" TEXT NOT NULL,
    "host_address" TEXT NOT NULL,
    "host_country" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "key_initiatives" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "scope_of_collaboration" TEXT NOT NULL,
    "linkage_establishment_date" TEXT NOT NULL,
    "financial_support" INTEGER,
    "mou_copy_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgreementSigned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOfCommunity" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "community_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "proofs" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "picture_file" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListOfCommunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOfMentorship" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "program_name" TEXT NOT NULL,
    "no_of_students" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "proofs" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListOfMentorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOfStudent" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "number_of_members" INTEGER NOT NULL,
    "members_name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "proofs" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListOfStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOfFacilities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lab_name" TEXT NOT NULL,
    "equipment_type" TEXT NOT NULL,
    "available_to_student" TEXT NOT NULL,
    "available_to_community" TEXT NOT NULL,
    "proofs" TEXT NOT NULL,
    "approved_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListOfFacilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnic_key" ON "User"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchPublication_issn_key" ON "ResearchPublication"("issn");

-- CreateIndex
CREATE UNIQUE INDEX "BookAuthoredEdited_isbn_key" ON "BookAuthoredEdited"("isbn");

-- AddForeignKey
ALTER TABLE "ResearchPublication" ADD CONSTRAINT "ResearchPublication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthoredEdited" ADD CONSTRAINT "BookAuthoredEdited_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchProject" ADD CONSTRAINT "ResearchProject_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTraining" ADD CONSTRAINT "DepartmentTraining_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTraining" ADD CONSTRAINT "MemberTraining_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MSPHDThesis" ADD CONSTRAINT "MSPHDThesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BSThesis" ADD CONSTRAINT "BSThesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyAdvocacy" ADD CONSTRAINT "PolicyAdvocacy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchLinksOtherHEIS" ADD CONSTRAINT "ResearchLinksOtherHEIS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractResearchGovernmentOrganization" ADD CONSTRAINT "ContractResearchGovernmentOrganization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CivicEngagementEvent" ADD CONSTRAINT "CivicEngagementEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultancyContract" ADD CONSTRAINT "ConsultancyContract_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatentsTrademark" ADD CONSTRAINT "PatentsTrademark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchProductsProcess" ADD CONSTRAINT "ResearchProductsProcess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScienceArtsProduct" ADD CONSTRAINT "ScienceArtsProduct_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgreementSigned" ADD CONSTRAINT "AgreementSigned_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOfCommunity" ADD CONSTRAINT "ListOfCommunity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOfMentorship" ADD CONSTRAINT "ListOfMentorship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOfStudent" ADD CONSTRAINT "ListOfStudent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOfFacilities" ADD CONSTRAINT "ListOfFacilities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
