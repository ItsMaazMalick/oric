import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RequiredTag } from "./required-tag";
type TextInputProps = {
  label: string;
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};

export default function TextInput({
  label,
  control,
  name,
  type,
  placeholder,
  description,
  required,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs md:text-base">
            {label}
            {required && <RequiredTag />}
          </FormLabel>
          <FormControl className="text-xs md:text-base">
            <Input
              type={type ? type : "text"}
              placeholder={placeholder ? placeholder : label}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-xs md:text-base" />
        </FormItem>
      )}
    />
  );
}
