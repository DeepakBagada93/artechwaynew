import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, Hash, Bell, Mail, Bookmark, User } from "lucide-react";

export function LeftSidebar() {
  const navItems = [
    { href: "/", icon: Home, text: "Home" },
    { href: "#articles", icon: Hash, text: "AI Creatives" },
    { href: "#articles", icon: Hash, text: "AI Business" },
    { href: "#", icon: Bell, text: "Notifications" },
    { href: "#", icon: Mail, text: "Messages" },
    { href: "#", icon: Bookmark, text: "Bookmarks" },
    { href: "#", icon: User, text: "Profile" },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 flex-col justify-between p-2 hidden lg:flex">
      <div>
        <div className="p-4">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline text-2xl">
            <Bot className="h-8 w-8" />
            Artechway
          </Link>
        </div>
        <nav className="mt-4 flex flex-col items-start">
          {navItems.map((item) => (
            <Link key={item.text} href={item.href}>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-4 px-4 py-6 text-xl"
              >
                <item.icon className="h-7 w-7" />
                <span>{item.text}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-6 px-4">
          <Button size="lg" className="w-full text-lg">
            Post
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Button variant="ghost" className="flex w-full items-center justify-start gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="text-left">
            <p className="font-bold">Your Name</p>
            <p className="text-sm text-muted-foreground">@yourhandle</p>
          </div>
        </Button>
      </div>
    </aside>
  );
}
