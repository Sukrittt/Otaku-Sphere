"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";
import { Calendar } from "@/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";

interface DatePickerProps {
  value: Date | undefined;
  setValue: (date: Date | undefined) => void;
}

export function DatePicker({ setValue, value }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setValue(date);
  }, [date, setValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "max-w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          today={value || new Date()}
          selected={value}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
