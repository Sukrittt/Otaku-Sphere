import React, { FC, forwardRef, useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { GenreItemType } from "@/types/item-type";

interface ComboboxProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  data: GenreItemType[];
  setGenre: (genre: string) => void;
  selectedOption?: string;
}

export const Combobox: FC<ComboboxProps> = forwardRef<
  HTMLInputElement,
  ComboboxProps
>(({ data, placeholder, setGenre, selectedOption, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const selectedGenre = data.find((item) => item.label === selectedOption);

  const [value, setValue] = useState(selectedGenre?.value ?? "");

  useEffect(() => {
    if (value) {
      const findIndex = data.findIndex((item) => item.value === value);

      setGenre(data[findIndex].label);
    }
  }, [value, setGenre, data]);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} ref={ref} />
          <CommandEmpty>Search not found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
Combobox.displayName = "Combobox";
