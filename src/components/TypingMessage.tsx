"use client";
import { FC } from "react";
import { TypeAnimation } from "react-type-animation";

interface TypingMessageProps {
  text: string;
  delay?: number;
}

const TypingMessage: FC<TypingMessageProps> = ({ text }) => {
  return <TypeAnimation sequence={[text, 1000]} speed={50} cursor={false} />;
};

export default TypingMessage;
