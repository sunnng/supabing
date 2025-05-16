import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function DashboardPage() {
	let session = null;
	try {
		session = await auth.api.getSession({
			headers: await headers(),
		});
	} catch (error) {
		console.error("Error fetching session:", error);
		// 可以在这里决定是重定向还是显示错误
		// 为了安全，通常会重定向到登录页
		redirect("/sign-in");
	}

	console.log(session); // 如果上面捕获到错误并重定向了，这行不会执行

	if (!session) {
		redirect("/sign-in");
	} else {
		return <div className="p-6">Dashboard</div>;
	}
}
