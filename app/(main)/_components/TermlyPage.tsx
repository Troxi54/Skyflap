import type { HTMLProps } from "@/lib/types/react";
import { cn } from "@/lib/utils/tailwind";

interface Props extends HTMLProps<"div"> {
  html: string | TrustedHTML;
}

function TermlyPage({ className, html, ...props }: Props) {
  return (
    <div
      className={cn("bg-white", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

export default TermlyPage;
