import type { HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

type Props = HTMLProps<"input">;

function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-[20em] border border-border shadow-card rounded-md p-[1em] h-[1em]",
        className,
      )}
      placeholder="Type in here"
      {...props}
    />
  );
}

export default Input;
