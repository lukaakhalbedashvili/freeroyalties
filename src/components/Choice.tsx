import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ChoiceProps {
  txtInputLabel: string;
  txtInputId: string;
  selectValue: string;
  selectOptions: Array<{ value: string; label: string }>;
  className?: string;
  txtValue: string;
  txtOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  txtOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  txtErrorMessage?: string | false | undefined;
  selectOnChange: (value: string) => void;
  txtInputName: string;
  selectInputName: string;
}

const Choice = ({
  txtInputLabel,
  txtInputId,
  selectOptions,
  className,
  selectValue,
  txtValue,
  txtOnChange,
  txtOnBlur,
  txtErrorMessage,
  selectOnChange,
  txtInputName,
  selectInputName,
}: ChoiceProps) => {
  return (
    <div className={className}>
      <Input
        label={txtInputLabel}
        id={txtInputId}
        value={txtValue}
        onChange={txtOnChange}
        onBlur={txtOnBlur}
        errorMessage={txtErrorMessage}
        name={txtInputName}
      />

      <Select onValueChange={selectOnChange} name={selectInputName}>
        <SelectTrigger className="w-full mt-5">
          <SelectValue placeholder={selectValue} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Choice;
