import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../utils/tailwind";

type Props = ComponentProps<typeof Link>;

function AppLink({ className, ...props }: Props) {
  return <Link className={cn("underline", className)} {...props} />;
}

export default AppLink;
