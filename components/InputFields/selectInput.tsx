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

type TextInputProps = {
  label: string;
  name: string;
  control: any;
  items: string[];
};

export default function SelectInput({
  label,
  control,
  name,
  items,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs md:text-base">{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            //   defaultValue={field.value}
          >
            <FormControl className="text-xs md:text-base">
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item: string, index: number) => (
                <SelectItem key={index} value={item}>
                  {item}
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
