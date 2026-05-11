import type { HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

interface Props extends HTMLProps<"button"> {
  variant?: "primary" | "secondary";
}

function Button({ variant = "secondary", className, ...props }: Props) {
  return (
    <button
      className={cn(
        "px-6 py-2 rounded-xl cursor-pointer transition-colors",
        {
          primary:
            "bg-primary text-button-text hover:bg-primary-hover active:bg-primary-active",
          secondary:
            "border border-secondary-border text-secondary-accent hover:bg-secondary-hover active:bg-secondary-active",
        }[variant],
        className,
      )}
      {...props}
    />
  );
}

export default Button;
