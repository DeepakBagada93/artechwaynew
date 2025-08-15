
"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot, Search } from "lucide-react";
import { Input } from "./ui/input";

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
          <Bot className="h-6 w-6" />
          Artechway
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
                    <Bot className="h-6 w-6" />
                    Artechway
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
