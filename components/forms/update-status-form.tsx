"use client";

import { FormSuccess } from "../forms/FormSuccess";
import { FormError } from "../forms/FormError";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  saveResearchPublications,
  saveResearchPublicationsNill,
  updateResearchPublicationsStatus,
} from "@/app/actions/user/records/researchPublications";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SDG, countries, years } from "@/constants/data";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../InputFields/MultiSelectInput";
import SelectInput from "../InputFields/selectInput";
import TextInput from "../InputFields/textInput";
import FormSubmitButton from "../button/FormSubmitButton";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useRouter } from "next/navigation";
import { RequiredTag } from "../InputFields/required-tag";
import { Button } from "@/components/ui/button";
import { formStatusSchema } from "@/lib/validations/formValidations";
import { updateResearchPublicationStatus } from "@/app/actions/admin/update-form-status";
import { updateBookAuthoredEditedStatus } from "@/app/actions/user/records/book-authored-edited";
import { updateResearchProjectsStatus } from "@/app/actions/user/records/researchProjects";
import { updateTrainingsWorkshopsStatus } from "@/app/actions/user/records/tranings-workshop";
import { updateThesisStatus } from "@/app/actions/user/records/thesis";
import { updatePolicyAdvocacyStatus } from "@/app/actions/user/records/policy-advocacy";
import { updateLinksEstablishedStatus } from "@/app/actions/user/records/links-established";
import { updateContractResearchStatus } from "@/app/actions/user/records/contract-research";
import { updateCivicEngagementStatus } from "@/app/actions/user/records/civic-engagement";
import { updateConsultancyContractsStatus } from "@/app/actions/user/records/consultancy-contracts";
import { updatePatentsTradeStatus } from "@/app/actions/user/records/patents-trade";
import { updateResearchProductsStatus } from "@/app/actions/user/records/research-products";
import { updateScienceArtsProductsStatus } from "@/app/actions/user/records/science-arts-products";
import { updateAgreementsSignedStatus } from "@/app/actions/user/records/agreements-signed";
import { updateNationalInternationalHonorsStatus } from "@/app/actions/user/records/national-international-honors";
import { updateDataProvidedToHecStatus } from "@/app/actions/user/records/data-provided-to-hec";
import { updateCommunityWorkStatus } from "@/app/actions/user/records/community-work";
import { updateMentorshipProgramStatus } from "@/app/actions/user/records/mentorship-program";
import { updateStudentOrganizationStatus } from "@/app/actions/user/records/student-organization";

export function UpdateStatusForm({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formStatusSchema>>({
    resolver: zodResolver(formStatusSchema),
    defaultValues: {
      status: data.approvedStatus,
    },
  });

  const onSubmit = async (values: z.infer<typeof formStatusSchema>) => {
    setError("");
    setSuccess("");
    let res;
    if (index === 1) {
      res = await updateResearchPublicationsStatus(values, data.id);
    } else if (index === 2)
      res = await updateBookAuthoredEditedStatus(values, data.id);
    else if (index === 3)
      res = await updateResearchProjectsStatus(values, data.id);
    else if (index === 4)
      res = await updateTrainingsWorkshopsStatus(values, data.id);
    else if (index === 5) res = await updateThesisStatus(values, data.id);
    else if (index === 6)
      res = await updatePolicyAdvocacyStatus(values, data.id);
    else if (index === 7)
      res = await updateLinksEstablishedStatus(values, data.id);
    else if (index === 8)
      res = await updateContractResearchStatus(values, data.id);
    else if (index === 9)
      res = await updateCivicEngagementStatus(values, data.id);
    else if (index === 10)
      res = await updateConsultancyContractsStatus(values, data.id);
    else if (index === 11)
      res = await updatePatentsTradeStatus(values, data.id);
    else if (index === 12)
      res = await updateResearchProductsStatus(values, data.id);
    else if (index === 13)
      res = await updateScienceArtsProductsStatus(values, data.id);
    else if (index === 14)
      res = await updateAgreementsSignedStatus(values, data.id);
    else if (index === 15)
      res = await updateNationalInternationalHonorsStatus(values, data.id);
    else if (index === 16)
      res = await updateDataProvidedToHecStatus(values, data.id);
    else if (index === 17)
      res = await updateCommunityWorkStatus(values, data.id);
    else if (index === 18)
      res = await updateMentorshipProgramStatus(values, data.id);
    else if (index === 19)
      res = await updateStudentOrganizationStatus(values, data.id);

    setError(res?.error);
    setSuccess(res?.success);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SelectInput
          label="Status"
          name="status"
          control={form.control}
          items={["pending", "accepted", "rejected"]}
          required
        />
        {success && <FormSuccess message={success} className="my-2" />}
        {error && <FormError message={error} className="my-2" />}
        <div className="flex items-center justify-center w-full">
          <FormSubmitButton
            loading={form.formState.isSubmitting}
            className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
          >
            Update
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  );
}
