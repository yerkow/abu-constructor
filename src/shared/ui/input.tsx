import clsx from "clsx";
import * as React from "react";
import { Label } from "./label";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type, ...props }, ref) => {
    return (
      <div className="grid w-full  items-center gap-1.5">
        <Label
          className={clsx(error && "text-red-500", "text-[18px]")}
          htmlFor={label}
        >
          {label}
        </Label>
        <input
          type={type}
          id={label}
          className={clsx(
            error && "ring-red-500",
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="text-red-500">{error}</span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
