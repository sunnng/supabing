"use client";

import { type FontKeys, fonts } from "@/lib/fonts"; // 调整路径
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";

interface FontContextType {
	currentFontKey: FontKeys;
	setCurrentFontKey: (fontKey: FontKeys) => void;
	availableFonts: FontKeys[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
	const getInitialFont = (): FontKeys => {
		if (typeof window !== "undefined") {
			const storedFont = localStorage.getItem("selectedFont") as FontKeys;
			if (storedFont && fonts[storedFont]) {
				return storedFont;
			}
		}
		return "sans"; // 默认字体
	};

	const [currentFontKey, setCurrentFontKey] = useState<FontKeys>(
		getInitialFont(),
	);

	const availableFonts = Object.keys(fonts) as FontKeys[];

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("selectedFont", currentFontKey);
			const fontVariable = fonts[currentFontKey]; // e.g., '--font-inter'
			// 更新根元素上的 CSS 变量，这个变量将用于 Tailwind 配置
			document.documentElement.style.setProperty(
				"--font-main",
				`var(${fontVariable})`,
			);
		}
	}, [currentFontKey]);

	return (
		<FontContext.Provider
			value={{ currentFontKey, setCurrentFontKey, availableFonts }}
		>
			{children}
		</FontContext.Provider>
	);
};

export const useFont = (): FontContextType => {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error("useFont must be used within a FontProvider");
	}
	return context;
};
