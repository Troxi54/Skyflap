import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skyflap",
  description: "Skyflap social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arimo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="skyflap:theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
