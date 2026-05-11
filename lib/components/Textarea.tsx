import { type HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

type Props = HTMLProps<"textarea">;

function Textarea({ className, ...props }: Props) {
  return (
    <textarea
      className={cn(
        "min-w-[20em] min-h-[6em] border border-border shadow-card rounded-md p-[1em] resize",
        className,
      )}
      placeholder="Type in here"
      {...props}
    />
  );
}

export default Textarea;
