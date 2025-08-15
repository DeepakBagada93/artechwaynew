
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Image from 'next/image'
import { SidebarTrigger } from "./ui/sidebar";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold font-headline text-lg">
      <Image src="/atechwya dp.png" alt="Artechway Logo" width={40} height={40} />
      <span className="hidden sm:inline-block">Artechway</span>
  </div>
);


export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden"/>
          <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg md:hidden">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 w-[150px] rounded-full pl-9 lg:w-[250px]" />
            </div>
            <Button size="sm">Subscribe</Button>
        </div>
      </div>
    </header>
  );
}
