"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SDG } from "@/constants/data";

type MultiInputProps = {
  label: string;
  name: string;
  data: string[];
};

export default function MultiSelectInput({
  label,
  name,
  data,
}: MultiInputProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const checkChange = (fieldName: string) => {
    setSelectedValues((prevSelected: any) => {
      if (prevSelected.includes(fieldName)) {
        return prevSelected.filter((name: any) => name !== fieldName);
      } else {
        return [...prevSelected, fieldName];
      }
    });
  };

  return (
    <>
      <div className="mb-2 text-xs sm:text-base sm:font-medium">{label}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant="outline">
            {selectedValues.map((value, index) => (
              <span
                key={index}
                className="p-1 m-1 border rounded-lg border-primary"
              >
                {value}
              </span>
            ))}
            <span className="ml-1 rounded-md bg-primary text-primary-foreground">
              <ChevronDown size={20} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 h-64 overflow-y-auto">
          <DropdownMenuLabel>Select {name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data.map((value, index: number) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={selectedValues.includes(value)}
              onCheckedChange={() => checkChange(value)}
            >
              {value}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
