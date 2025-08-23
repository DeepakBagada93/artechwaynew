
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, Hash, User, Info, Mail, Search, Newspaper } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
import Image from "next/image";
import { Input } from "./ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold font-mono text-lg uppercase">
      <span className="group-data-[collapsible=icon]:hidden">Artechway</span>
  </div>
);


export function LeftSidebar() {
  const navItems = [
    { href: "/", icon: Home, text: "Home" },
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
                <Collapsible asChild>
                  <>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip="Articles"
                          className="w-full justify-start text-base font-normal"
                        >
                          <Newspaper className="h-5 w-5" />
                          <span className="group-data-[collapsible=icon]:hidden">Articles</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent asChild>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <Link href="/?category=Creatives">
                              <SidebarMenuSubButton>AI Creatives</SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                         <SidebarMenuSubItem>
                          <Link href="/?category=Business">
                              <SidebarMenuSubButton>AI Business</SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                </Collapsible>
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
