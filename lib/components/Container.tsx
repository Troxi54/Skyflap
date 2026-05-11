import type { HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

type Props = HTMLProps<"div">;

function Container({ className, ...props }: Props) {
  return <div className={cn("flex justify-center", className)} {...props} />;
}

export default Container;
