import { SignInForm } from "@/components/sign-in-form";
import { MaskedImage } from "@/components/ui/masked-image";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
	return (
		<div className="relative grid min-h-svh lg:grid-cols-2">
			<div className="absolute top-0 mx-auto mt-6 w-full px-8 sm:px-6 lg:px-8">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="#" className="flex items-center gap-2 font-medium">
						<Image
							src={"/logo.svg"}
							width={136}
							height={136}
							alt="logo"
							className="size-8"
						/>
						<span className="font-bold text-xl">supabing</span>
					</Link>
				</div>
			</div>
			<main className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignInForm />
					</div>
				</div>
			</main>
			<aside className="hidden justify-center bg-muted lg:flex lg:items-center">
				<MaskedImage
					src="/title.png"
					alt="Image"
					width={1087}
					height={659}
					variant="shape6"
					className="size-[361px]"
				/>
			</aside>
		</div>
	);
}
