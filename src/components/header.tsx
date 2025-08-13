
"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
        <Bot className="h-6 w-6" />
        Artechway
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col p-6">
            <Link href="/" className="mb-8 flex items-center gap-2 font-bold font-headline text-lg">
              <Bot className="h-6 w-6" />
              Artechway
            </Link>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link href="#articles">AI Creatives</Link>
              <Link href="#articles">AI Business</Link>
            </nav>
            <Button size="lg" className="mt-8">Post</Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
