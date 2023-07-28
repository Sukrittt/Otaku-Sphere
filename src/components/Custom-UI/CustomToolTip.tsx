import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/Tooltip";

interface CustomToolTipProps {
  children: React.ReactNode;
  text: string;
}

const CustomToolTip: FC<CustomToolTipProps> = ({ children, text }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="text-xs">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomToolTip;
