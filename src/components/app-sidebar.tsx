"use client";

import type { Session } from "@/lib/auth-types";
import type * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, List, Smile } from "lucide-react";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: List,
		},
		{
			title: "Analytics",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			title: "Projects",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			title: "Team",
			url: "#",
			icon: LayoutDashboard,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: LayoutDashboard,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: LayoutDashboard,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: LayoutDashboard,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			title: "Get Help",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			title: "Search",
			url: "#",
			icon: LayoutDashboard,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			name: "Reports",
			url: "#",
			icon: LayoutDashboard,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: LayoutDashboard,
		},
	],
};

// 定义 AppSidebar 的 props 类型
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	session: Session; // 明确要求 session 必须存在且类型为 Session
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<Smile className="!size-5" />
								<span className="font-semibold text-base">Supabina</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser session={session} />
			</SidebarFooter>
		</Sidebar>
	);
}
