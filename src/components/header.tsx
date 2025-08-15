
"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "./ui/input";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold font-headline text-lg">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M12 8V4H8v4" />
      <rect width="12" height="10" x="6" y="10" rx="2" />
      <path d="M6 14h12" />
      <path d="M16 8v4h4V8" />
    </svg>
    Artechway
  </div>
);


export function AppHeader() {
  const navItems = [
    { href: "/", text: "Home" },
    { href: "#articles", text: "AI Creatives" },
    { href: "#articles", text: "AI Business" },
    { href: "#", text: "About" },
    { href: "#", text: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
                <Link key={item.text} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    {item.text}
                </Link>
            ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 w-[150px] rounded-full pl-9 lg:w-[250px]" />
            </div>
            <Button size="sm">Subscribe</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="p-6 pt-12">
                <Link href="/" className="mb-8 flex items-center gap-2 font-bold font-headline text-lg">
                    <Logo />
                </Link>
                <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link key={item.text} href={item.href} className="text-lg font-medium">
                    {item.text}
                    </Link>
                ))}
                </nav>
                <Button size="lg" className="mt-8 w-full">Subscribe</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
