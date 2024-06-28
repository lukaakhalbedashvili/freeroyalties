import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string | undefined | false;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, className, type, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        <Label htmlFor={props.id} className="text-right">
          {label}
        </Label>

        <div className="mt-2 w-full">
          <input
            type={type}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
          />
        </div>

        {errorMessage && (
          <span className="mt-2 text-sm text-red-600">{errorMessage}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
