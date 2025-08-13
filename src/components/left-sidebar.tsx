import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, Hash, User, Settings, Info, Mail } from "lucide-react";

export function LeftSidebar() {
  const navItems = [
    { href: "/", icon: Home, text: "Home" },
    { href: "#articles", icon: Hash, text: "AI Creatives" },
    { href: "#articles", icon: Hash, text: "AI Business" },
  ];

  const secondaryNavItems = [
     { href: "#", icon: Info, text: "About" },
     { href: "#", icon: Mail, text: "Contact" },
     { href: "#", icon: Settings, text: "Settings" },
  ]

  return (
    <aside className="sticky top-0 h-screen w-64 flex-col justify-between border-r border-border/40 p-4 hidden lg:flex">
      <div>
        <div className="p-4">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline text-2xl">
            <Bot className="h-8 w-8" />
            Artechway
          </Link>
        </div>
        <nav className="mt-6 flex flex-col items-start gap-2">
          {navItems.map((item) => (
            <Link key={item.text} href={item.href} className="w-full">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-4 px-4 py-2 text-lg"
              >
                <item.icon className="h-6 w-6" />
                <span>{item.text}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <p className="px-4 mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">More</p>
         <nav className="flex flex-col items-start gap-2">
          {secondaryNavItems.map((item) => (
            <Link key={item.text} href={item.href} className="w-full">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-4 px-4 py-2 text-md text-muted-foreground"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.text}</span>
              </Button>
            </Link>
          ))}
        </nav>

      </div>
      <div className="p-4">
        <Button variant="ghost" className="flex w-full items-center justify-start gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground"/>
          </div>
          <div className="text-left">
            <p className="font-bold">Your Name</p>
            <p className="text-sm text-muted-foreground">@yourhandle</p>
          </div>
        </Button>
      </div>
    </aside>
  );
}
