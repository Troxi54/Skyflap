import Image from "next/image";
import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<typeof Image>, "alt"> {
  username: string;
}

function Avatar({ username, ...props }: Props) {
  return (
    <div className="relative size-8 rounded-full overflow-hidden">
      <Image {...props} alt={`${username}'s Logo`} fill sizes="32px, 32px" />
    </div>
  );
}

export default Avatar;
