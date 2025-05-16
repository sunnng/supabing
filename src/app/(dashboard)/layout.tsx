import "@/app/(dashboard)/theme.css";

import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	let session = null;

	try {
		session = await auth.api.getSession({
			headers: await headers(),
		});
	} catch (error) {
		console.error("Error fetching session in layout:", error);
		// 捕获会话获取错误，通常重定向到登录页
		redirect("/sign-in");
	}

	// 如果没有会话，重定向到登录页
	if (!session) {
		console.log("No session found, redirecting to /sign-in");
		redirect("/sign-in");
	}

	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" session={session} />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
