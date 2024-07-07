import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RequiredTag } from "./required-tag";

type TextInputProps = {
  label: string;
  name: string;
  control: any;
  items: {
    value: string;
    label: string;
  }[];
  required?: boolean;
};

export default function SelectInput({
  label,
  control,
  name,
  items,
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="text-xs md:text-base">
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px]">
              {items.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs sm:text-base" />
        </FormItem>
      )}
    />
  );
}
