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
import type { FontKeys } from "@/lib/fonts";
import { useFont } from "./font-provider";

type ThemeType = {
	name: string;
	value: string;
	font: string;
};

const THEME_CONFIG = {
	"kodama-grove": {
		name: "Kodama Grove",
		value: "kodama-grove",
		font: "merriweather",
	},
	"retro-arcade": {
		name: "Retro Arcade",
		value: "retro-arcade",
		font: "outfit",
	},
	default: {
		name: "Default",
		value: "default",
		font: "sans",
	},
};

type ThemeKeys = keyof typeof THEME_CONFIG;

const DEFAULT_THEMES: ThemeType[] = [
	{
		name: "Default",
		value: "default",
		font: "sans",
	},
	{
		name: "Kodama Grove",
		value: "kodama-grove",
		font: "merriweather",
	},
	{
		name: "Retro Arcade",
		value: "retro-arcade",
		font: "outfit",
	},
];

const SCALED_THEMES = [
	{
		name: "Default",
		value: "default-scaled",
	},
	{
		name: "Blue",
		value: "blue-scaled",
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
	const { currentFontKey, setCurrentFontKey } = useFont();

	function handleThemeChange(value: ThemeKeys) {
		setActiveTheme(value);
		const themeFont = THEME_CONFIG[value].font as FontKeys;

		setCurrentFontKey(themeFont);
	}

	return (
		<div className="flex items-center gap-2">
			<Label htmlFor="theme-selector" className="sr-only">
				Theme
			</Label>
			<Select value={activeTheme} onValueChange={handleThemeChange}>
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
