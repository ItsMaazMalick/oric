import { deleteAgreementsSigned } from "@/app/actions/user/records/agreements-signed";
import { deleteBookAuthoredEdited } from "@/app/actions/user/records/book-authored-edited";
import { deleteCivicEngagement } from "@/app/actions/user/records/civic-engagement";
import { deleteCommunityWork } from "@/app/actions/user/records/community-work";
import { deleteConsultancyContracts } from "@/app/actions/user/records/consultancy-contracts";
import { deleteContractResearch } from "@/app/actions/user/records/contract-research";
import { deleteDataProvidedToHec } from "@/app/actions/user/records/data-provided-to-hec";
import { deleteLinksEstablished } from "@/app/actions/user/records/links-established";
import { deleteMentorshipProgram } from "@/app/actions/user/records/mentorship-program";
import { deleteNationalInternationalHonors } from "@/app/actions/user/records/national-international-honors";
import { deletePatentsTrade } from "@/app/actions/user/records/patents-trade";
import { deletePolicyAdvocacy } from "@/app/actions/user/records/policy-advocacy";
import { deleteResearchProducts } from "@/app/actions/user/records/research-products";
import { deleteResearchProjects } from "@/app/actions/user/records/researchProjects";
import { deleteResearchPublications } from "@/app/actions/user/records/researchPublications";
import { deleteScienceArtsProducts } from "@/app/actions/user/records/science-arts-products";
import { deleteStudentOrganization } from "@/app/actions/user/records/student-organization";
import { deleteThesis } from "@/app/actions/user/records/thesis";
import { deleteTrainingsWorkshops } from "@/app/actions/user/records/tranings-workshop";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { agreementSignedSchema } from "@/lib/validations/formValidations";
import React from "react";

type DeleteDialogProps = {
  children: React.ReactNode;
  id: string;
  index: number;
};

export function DeleteUserRecord({ children, id, index }: DeleteDialogProps) {
  const deleteFunctions = [
    deleteResearchPublications,
    deleteBookAuthoredEdited,
    deleteResearchProjects,
    deleteTrainingsWorkshops,
    deleteThesis,
    deletePolicyAdvocacy,
    deleteLinksEstablished,
    deleteContractResearch,
    deleteCivicEngagement,
    deleteConsultancyContracts,
    deletePatentsTrade,
    deleteResearchProducts,
    deleteScienceArtsProducts,
    deleteAgreementsSigned,
    deleteNationalInternationalHonors,
    deleteDataProvidedToHec,
    deleteCommunityWork,
    deleteMentorshipProgram,
    deleteStudentOrganization,
  ];

  const handleDelete = async () => {
    if (index >= 0 && index < deleteFunctions.length) {
      await deleteFunctions[index](id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
