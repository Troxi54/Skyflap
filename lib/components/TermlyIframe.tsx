import type { ComponentProps } from "react";
import IframeResizer from "./IframeResizer";
import { cn } from "../utils/tailwind";

type Props = ComponentProps<typeof IframeResizer>;

function TermlyIframe({ className, srcDoc, ...props }: Props) {
  return (
    <IframeResizer
      className={cn("w-full", className)}
      srcDoc={
        `<style>
        *, :after, :before, ::backdrop {
          box-sizing: border-box;
          border: 0 solid;
          margin: 0;
          padding: 0;
        }
        body {
          background: white;
        }
      </style>` + srcDoc
      }
      {...props}
    />
  );
}

export default TermlyIframe;
