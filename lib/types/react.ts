import type { ComponentPropsWithRef, ElementType } from "react";

export type HTMLProps<T extends ElementType> = ComponentPropsWithRef<T>;
