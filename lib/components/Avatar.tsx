import Image, { type ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "alt"> {
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
