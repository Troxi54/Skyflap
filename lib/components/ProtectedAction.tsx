"use client";

import { useClerk } from "@clerk/nextjs";
import { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function ProtectedAction({ children }: Props) {
  const { openSignIn, isSignedIn } = useClerk();

  function handleClick() {
    if (isSignedIn) return;

    const href = window.location.href;

    openSignIn({
      forceRedirectUrl: href,
      fallbackRedirectUrl: href,
    });
  }

  return <div onClick={handleClick}>{children}</div>;
}

export default ProtectedAction;
