"use client";

import { useThemeConfig } from "@/components/active-theme";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const DEFAULT_THEMES = [
	{
		name: "Default",
		value: "default",
	},
	{
		name: "Kodama Grove",
		value: "kodama-grove",
	},
	{
		name: "Retro Arcade",
		value: "retro-arcade",
	},
	{
		name: "Doom 64",
		value: "doom-64",
	},
	{
		name: "Supabase",
		value: "supabase",
	},
	{
		name: "Clean Slate",
		value: "clean-slate",
	},
	{
		name: "Modern Minimal",
		value: "modern-minimal",
	},
	{
		name: "Neo Brutalism",
		value: "neo-brutalism",
	},
	{
		name: "Twitter",
		value: "twitter",
	},
	{
		name: "Cosmic Night",
		value: "cosmic-night",
	},
];

const SCALED_THEMES = [
	{
		name: "Default",
		value: "default-scaled",
	},
	{
		name: "Kodama Grove",
		value: "kodama-grove-scaled",
	},
];

const MONO_THEMES = [
	{
		name: "Mono",
		value: "mono-scaled",
	},
];

export function ThemeSelector() {
	const { activeTheme, setActiveTheme } = useThemeConfig();

	return (
		<div className="flex items-center gap-2">
			<Label htmlFor="theme-selector" className="sr-only">
				Theme
			</Label>
			<Select value={activeTheme} onValueChange={setActiveTheme}>
				<SelectTrigger
					id="theme-selector"
					size="sm"
					className="justify-start *:data-[slot=select-value]:w-12"
				>
					<span className="hidden text-muted-foreground sm:block">
						Select a theme:
					</span>
					<span className="block text-muted-foreground sm:hidden">Theme</span>
					<SelectValue placeholder="Select a theme" />
				</SelectTrigger>
				<SelectContent align="end">
					<SelectGroup>
						<SelectLabel>Default</SelectLabel>
						{DEFAULT_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Scaled</SelectLabel>
						{SCALED_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectGroup>
						<SelectLabel>Monospaced</SelectLabel>
						{MONO_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
