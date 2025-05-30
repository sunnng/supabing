"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
	remember: z.boolean(),
});

export function SignInForm() {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: true,
		},
	});

	async function onSubmit({
		email,
		password,
		remember,
	}: z.infer<typeof formSchema>) {
		await signIn.email(
			{
				email,
				password,
				callbackURL: "/dashboard",
				/**
				 * remember the user session after the browser is closed.
				 * @default true
				 */
				rememberMe: remember,
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					setLoading(false);
					toast.success("Login Success!");
				},
				onError: (ctx) => {
					setLoading(false);
					toast.error(`Login Failed: ${ctx.error.message} !`);
				},
			},
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col items-start gap-2 text-center">
					<h1 className="font-bold text-3xl">Welcome back</h1>
					<p className="text-balance text-muted-foreground text-sm">
						Enter your email below to login to your account
					</p>
				</div>

				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="you@example.com"
										type="email"
										{...field}
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
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link
										href="#"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>

								<FormControl>
									<div className="relative">
										<Input
											className="pe-9"
											placeholder="Password"
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

					<FormField
						control={form.control}
						name="remember"
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel>Remember me</FormLabel>
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={loading} size="lg">
						{loading && <Loader2 className="animate-spin" />}
						Sign In
					</Button>
				</div>
			</form>

			<div className="mt-4 flex flex-col gap-4">
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>

				<Button variant="outline" className="w-full" size="lg">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<title>github</title>
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
							fill="currentColor"
						/>
					</svg>
					Login with GitHub
				</Button>

				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="underline underline-offset-4">
						Sign up
					</Link>
				</div>
			</div>
		</Form>
	);
}
