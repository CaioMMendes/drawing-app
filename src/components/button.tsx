import React from "react";
import { twMerge } from "tailwind-merge";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        type="submit"
        className={twMerge(
          ` ${
            variant === "button" &&
            "flex w-full  cursor-pointer items-center justify-center rounded-lg bg-primary-2/80 px-3 py-1.5 font-medium transition duration-300 hover:bg-primary-2/50 "
          } ${className}`
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;
