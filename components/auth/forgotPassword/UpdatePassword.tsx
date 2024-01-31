"use client";

import { updatePassword } from "@/app/actions/user/auth";
import TextInput from "@/components/InputFields/textInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { userUpdatePasswordSchema } from "@/lib/validations/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = userUpdatePasswordSchema;

export default function UpdatePassword({ id }: { id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("id", id || "");
    formData.append("password", values.password);
    await updatePassword(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="w-full">
          <div>
            <TextInput
              label="New Password"
              name="password"
              type="password"
              placeholder="*****"
              control={form.control}
            />
          </div>
        </div>
        {/* Password */}
        <div className="relative">
          <div>
            <TextInput
              label="New Confirm Password"
              name="confirm_password"
              type="password"
              placeholder="*****"
              control={form.control}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center w-full">
            <FormSubmitButton
              loading={form.formState.isSubmitting}
              className="flex mx-auto text-xs bg-primary text-primary-foreground md:text-base"
            >
              Update
            </FormSubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
