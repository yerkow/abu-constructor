"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string[];
}
export const AnimatedText = ({ text }: AnimatedTextProps) => {
  const [activeText, setActiveText] = useState(0);
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("fade-out");
      setTimeout(() => {
        setActiveText((prev) => (prev >= text.length - 1 ? 0 : prev + 1));
        setFade("fade-in");
      }, 1600); // Match this duration with the fade-out animation duration
    }, 6000);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <h1
      className={clsx(
        "font-bold text-md min-h-[120px] text-start flex justify-center items-center sm:text-lg md:text-xl max-w-[159px] md:max-w-[300px] text-wrap text-white",
        fade == "fade-in" ? "animate-fadeIn" : "animate-fadeOut",
      )}
    >
      {text[activeText]}
    </h1>
  );
};
