"use client";

import { Input } from "@/components/ui/input";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { forwardRef, useId, useMemo, useState } from "react";

export interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onValueChange?: (value: string) => void;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ onValueChange, value, onChange, ...props }, ref) => {
		const id = useId();
		const [isVisible, setIsVisible] = useState<boolean>(false);

		const toggleVisibility = () => setIsVisible((prevState) => !prevState);

		const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			onChange?.(e);
			onValueChange?.(newValue);
		};

		const checkStrength = (pass: string) => {
			const requirements = [
				{ regex: /.{8,}/, text: "At least 8 characters" },
				{ regex: /[0-9]/, text: "At least 1 number" },
				{ regex: /[a-z]/, text: "At least 1 lowercase letter" },
				{ regex: /[A-Z]/, text: "At least 1 uppercase letter" },
			];

			return requirements.map((req) => ({
				met: req.regex.test(pass),
				text: req.text,
			}));
		};

		const strength = checkStrength((value as string) || "");

		const strengthScore = useMemo(() => {
			return strength.filter((req) => req.met).length;
		}, [strength]);

		const getStrengthColor = (score: number) => {
			if (score === 0) return "bg-border";
			if (score <= 1) return "bg-red-500";
			if (score <= 2) return "bg-orange-500";
			if (score === 3) return "bg-amber-500";
			return "bg-emerald-500";
		};

		const getStrengthText = (score: number) => {
			if (score === 0) return "Enter a password";
			if (score <= 2) return "Weak password";
			if (score === 3) return "Medium password";
			return "Strong password";
		};

		const hasValue = Boolean(value);

		return (
			<div className="min-w-[300px]">
				<div className="relative">
					<Input
						id={id}
						className="pe-9"
						placeholder="Password"
						type={isVisible ? "text" : "password"}
						value={value}
						onChange={handlePasswordChange}
						aria-invalid={strengthScore < 4}
						aria-describedby={`${id}-description`}
						ref={ref}
						{...props}
					/>
					<button
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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

				{hasValue && (
					<>
						<div
							className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
							aria-valuenow={strengthScore}
							aria-valuemin={0}
							aria-valuemax={4}
							aria-label="Password strength"
						>
							<div
								className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
								style={{ width: `${(strengthScore / 4) * 100}%` }}
							/>
						</div>

						<p
							id={`${id}-description`}
							className="mb-2 font-medium text-foreground text-sm"
						>
							{getStrengthText(strengthScore)}. Must contain:
						</p>

						<ul className="space-y-1.5" aria-label="Password requirements">
							{strength.map((req) => (
								<li key={req.text} className="flex items-center gap-2">
									{req.met ? (
										<Check
											size={16}
											className="text-emerald-500"
											aria-hidden="true"
										/>
									) : (
										<X
											size={16}
											className="text-muted-foreground/80"
											aria-hidden="true"
										/>
									)}
									<span
										className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
									>
										{req.text}
										<span className="sr-only">
											{req.met
												? " - Requirement met"
												: " - Requirement not met"}
										</span>
									</span>
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		);
	},
);
