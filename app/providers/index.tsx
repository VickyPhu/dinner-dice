"use client";

import { ReactNode } from "react";
import ThemeProviders from "./themeProvider";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProviders>
        {children}
    </ThemeProviders>
  );
}