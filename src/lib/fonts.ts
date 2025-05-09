import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Merriweather,
  Mulish,
  Noto_Sans_Mono,
  Outfit,
  Oxanium,
  Poppins,
} from "next/font/google";

import { cn } from "@/lib/utils";

const fontPoppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const fontOxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontInstrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fontNotoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-mono",
});

const fontMullish = Mulish({
  subsets: ["latin"],
  variable: "--font-mullish",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontMerriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInstrument.variable,
  fontNotoMono.variable,
  fontMullish.variable,
  fontInter.variable,
  fontMerriweather.variable,
  fontOutfit.variable,
  fontOxanium.variable,
  fontPoppins.variable
);
