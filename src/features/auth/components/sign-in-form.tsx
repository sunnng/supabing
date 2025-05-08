"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { signIn } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "./password-input";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export function SignInForm() {
	const mutation = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const { data, error } = await signIn.email({
				email: values.email,
				password: values.password,
			});

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
		onSuccess: (data, variables, context) => {
			toast.success("Login Success!");
		},
		onError: (error) => {
			toast.error(`Login Failed: ${error.message} !`);
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutation.mutate(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="mb-2 flex flex-col items-start gap-2 text-center">
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
									<Input placeholder="m@example.com" {...field} />
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
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="mt-4 w-full"
						disabled={mutation.isPending}
						size="lg"
					>
						{mutation.isPending && <Loader2 className="animate-spin" />}
						Login
					</Button>

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
				</div>
				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="underline underline-offset-4">
						Sign up
					</Link>
				</div>
			</form>
		</Form>
	);
}
