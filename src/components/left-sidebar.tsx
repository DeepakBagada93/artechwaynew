import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, Hash, User, Settings, Info, Mail, Search } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "./ui/sidebar";
import Image from "next/image";
import { Input } from "./ui/input";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold font-headline text-lg">
      <Image src="/atechwya dp.png" alt="Artechway Logo" width={40} height={40} />
      <span className="group-data-[collapsible=icon]:hidden">Artechway</span>
  </div>
);


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
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <Link href="/">
                <Logo />
            </Link>
        </SidebarHeader>
        <SidebarContent>
            <div className="relative mb-4 px-2 group-data-[collapsible=icon]:hidden">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 w-full rounded-full pl-9" />
            </div>
            <SidebarMenu>
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.text}>
                        <Link href={item.href} className="w-full">
                            <SidebarMenuButton tooltip={item.text} className="w-full justify-start text-base font-normal">
                                <item.icon className="h-5 w-5" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.text}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>

             <p className="px-4 mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">More</p>
            <SidebarMenu>
                 {secondaryNavItems.map((item) => (
                    <SidebarMenuItem key={item.text}>
                        <Link href={item.href} className="w-full">
                            <SidebarMenuButton tooltip={item.text} className="w-full justify-start text-base font-normal text-muted-foreground">
                                <item.icon className="h-5 w-5" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.text}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>

        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-4 p-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User />
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                    <p className="font-bold">Your Name</p>
                    <p className="text-sm text-muted-foreground">@yourhandle</p>
                </div>
            </div>
        </SidebarFooter>
    </Sidebar>
  );
}
