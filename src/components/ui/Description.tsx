"use client";
import { formatDescription } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { Balancer } from "react-wrap-balancer";

interface DescriptionProps {
  description: string;
  trim?: number;
}

const Description: FC<DescriptionProps> = ({ description, trim }) => {
  const [toggleFullView, setToggleFullView] = useState(false);
  const [formattedDescription, setFormattedDescription] = useState(
    formatDescription(description, trim ?? 300)
  );

  useEffect(() => {
    if (toggleFullView) setFormattedDescription(description);
    else setFormattedDescription(formatDescription(description, trim ?? 400));
  }, [toggleFullView, description, trim]);

  return (
    <Balancer className="text-muted-foreground">
      {formattedDescription}{" "}
      <span
        className="cursor-pointer font-medium"
        onClick={() => setToggleFullView((prev) => !prev)}
      >
        {toggleFullView ? "Read Less" : "Read More"}
      </span>
    </Balancer>
  );
};

export default Description;
