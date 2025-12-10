"use client";

import { DarkModeProvider } from "@/utils/useDarkMode";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
