
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, Hash, User, Info, Mail, Search } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "./ui/sidebar";
import Image from "next/image";
import { Input } from "./ui/input";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold font-headline text-lg">
      <Image src="/artechway.png" alt="Artechway Logo" width={40} height={40} data-ai-hint="logo" />
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
     { href: "/about", icon: Info, text: "About" },
     { href: "/contact", icon: Mail, text: "Contact" },
  ]

  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <Link href="/">
                <Logo />
            </Link>
        </SidebarHeader>
        <SidebarContent>
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
    </Sidebar>
  );
}
