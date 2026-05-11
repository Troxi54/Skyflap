import { type HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

type Props = HTMLProps<"span">;

function TextGradient({ className, ...props }: Props) {
  return (
    <span
      className={cn("bg-linear-to-r bg-clip-text text-transparent", className)}
      {...props}
    />
  );
}

export default TextGradient;
