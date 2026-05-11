"use client";

import Button from "@/lib/components/Button";
import Moon from "@/lib/components/icons/Moon";
import Sun from "@/lib/components/icons/Sun";
import type { Theme } from "@/lib/types/theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const theme = resolvedTheme as Theme;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function handleClick() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      onClick={handleClick}
      className="p-1 rounded-full text-foreground border-none"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}

export default ThemeToggle;
