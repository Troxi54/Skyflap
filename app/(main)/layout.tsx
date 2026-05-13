import Button from "@/lib/components/Button";
import Container from "@/lib/components/Container";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { type ReactNode } from "react";
import ThemeToggle from "./_components/ThemeToggle";
import AppLink from "@/lib/components/AppLink";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      localization={{
        userButton: {
          action__signOut: "Log out",
        },
      }}
    >
      <header className="px-2 shadow-card border-b border-border">
        <nav className="flex h-12 items-center py-1.5">
          <Container className="mr-auto ml-10">
            <Link href="/">
              <h2 className="text-xl font-bold text-primary">Skyflap</h2>
            </Link>
          </Container>
          <Container className="ml-auto gap-2 items-center h-full">
            <ThemeToggle />
            <Show when="signed-out">
              <SignInButton>
                <Button variant="primary" className="h-full py-1.5 px-5">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="h-full py-1.5 px-5">Sign up</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </Container>
        </nav>
      </header>
      <main>
        <Container className="flex-col gap-5 p-5 items-center">
          {children}
        </Container>
      </main>
      <footer className="mt-auto px-2">
        <nav className="flex h-10 text-sm items-center justify-center gap-4">
          @2026 Skyflap<AppLink href="/terms">Terms of Service</AppLink>
          <AppLink href="/privacy">Privacy Policy</AppLink>
          <AppLink href="/cookies">Cookie Policy</AppLink>
        </nav>
      </footer>
    </ClerkProvider>
  );
}
