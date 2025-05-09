"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { PasswordInput } from "./password-input";

const formSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "用户名最少需要 2 个字符" }) // 长度规则保持不变
			.max(10, { message: "用户名最多不能超过 10 个字符" }) // 长度规则保持不变
			// 修改正则表达式，允许字母、数字、下划线、连字符 和 中文字符
			// ^ 匹配字符串的开始
			// [a-zA-Z0-9_-\u4E00-\u9FFF] 匹配 字母、数字、下划线、连字符 或 中文字符
			// + 匹配前一个字符集合一次或多次
			// $ 匹配字符串的结束
			.regex(/^[a-zA-Z0-9_\-\u4E00-\u9FFF]+$/, {
				message: "用户名只能包含字母、数字、下划线、连字符或中文字符",
			}), // 修改了message

		// 其他字段验证保持不变
		email: z.string().email({ message: "邮箱格式不正确" }),
		password: z
			.string()
			.min(8, { message: "密码最少需要 8 个字符" })
			.regex(/[0-9]/, { message: "密码必须包含至少 1 个数字" })
			.regex(/[a-z]/, {
				message: "密码必须包含至少 1 个小写字母",
			})
			.regex(/[A-Z]/, {
				message: "密码必须包含至少 1 个大写字母",
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "两次输入的密码不一致",
		path: ["confirmPassword"],
	});

export function SignUpForm() {
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const router = useRouter();

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await signUp.email({
			email: values.email,
			password: values.password,
			name: values.name,
			callbackURL: "/dashboard",
			fetchOptions: {
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: async () => {
					router.push("/dashboard");
					toast.success("Sign up success!");
				},
			},
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col items-start gap-2 text-center">
					<h1 className="font-bold text-3xl">Sign up</h1>
					<p className="text-balance text-muted-foreground text-sm">
						Enter your information to create an account
					</p>
				</div>

				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Your Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="you@example.com"
										{...field}
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										value={field.value}
										onChange={field.onChange}
										onBlur={field.onBlur}
										name={field.name}
										placeholder="Password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											className="pe-9"
											placeholder="Confirm Password"
											type={isVisible ? "text" : "password"}
											{...field}
										/>
										<button
											className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
											type="button"
											onClick={toggleVisibility}
											aria-label={isVisible ? "Hide password" : "Show password"}
											aria-pressed={isVisible}
											aria-controls="password"
										>
											{isVisible ? (
												<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
											) : (
												<Eye size={16} strokeWidth={2} aria-hidden="true" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="mt-4 w-full cursor-pointer"
						size="lg"
						disabled={loading}
					>
						{loading && <Loader2 className="animate-spin" />}
						Sign Up
					</Button>

					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
						<span className="relative z-10 bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
					<Button variant="outline" className="w-full cursor-pointer" size="lg">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<title>github</title>
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								fill="currentColor"
							/>
						</svg>
						Login with GitHub
					</Button>
				</div>
				<div className="text-center text-sm">
					Have an account?{" "}
					<Link href="/sign-in" className="underline underline-offset-4">
						Sign In Now
					</Link>
				</div>
			</form>
		</Form>
	);
}
