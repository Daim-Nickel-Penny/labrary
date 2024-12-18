"use client";

import * as React from "react";
import {
  Command,
  Inbox,
  HelpCircle,
  Moon,
  FlameKindling,
  PawPrint,
} from "lucide-react";

import { NavUser } from "~/components/nav-user";
import { Label } from "~/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Switch } from "~/components/ui/switch";
import { PorosityOutputCard } from "./porosity-output-card";
import { PorosityCalculationsOutputCard } from "./porosity-calculations-output-card";
import ChristmasLight from "./christmas-lights";

const data = {
  user: {
    name: "Basic Plan",
    email: "m@example.com",
    avatar: "/avatar.gif",
  },
  navMain: [
    {
      title: "Inbox",
      url: "/",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Support",
      url: "/",
      icon: HelpCircle,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <PawPrint className="size-4 stroke-white/50" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Labrary</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      isActive={item.isActive}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="border-1 hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div
              className="relative select-none font-serif text-base font-medium italic text-foreground"
              title="Christmas"
            >
              Labrary
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
                <ChristmasLight />
              </div>
            </div>

            <Label className="flex items-center gap-2 text-sm">
              <span>
                <Moon size={16} />
              </span>
              <Switch className="shadow-none" />
            </Label>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <div className="flex flex-col justify-center gap-4 p-1 pt-0">
                <PorosityOutputCard />
                <PorosityCalculationsOutputCard />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
