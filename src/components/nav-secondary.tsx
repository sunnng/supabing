"use client";

import { Angry, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
					<SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
						<SidebarMenuButton asChild>
							<label>
								<Angry />
								<span>Dark Mode</span>
								{mounted ? (
									<Switch
										className="ml-auto"
										checked={resolvedTheme !== "light"}
										onCheckedChange={() =>
											setTheme(resolvedTheme === "dark" ? "light" : "dark")
										}
									/>
								) : (
									<Skeleton className="ml-auto h-4 w-8 rounded-full" />
								)}
							</label>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
