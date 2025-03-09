"use client";
import { Scissors, Footprints, Paintbrush } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const sluzby = [
	{
		href: "/sluzby/manikura",
		label: "Profesionálna starostlivosť o vaše ruky a nechty",
		handle: "Manikúra",
		icon: Scissors,
		image: "/images/services/manikura.jpg"
	},
	{
		href: "/sluzby/pedikura",
		label: "Dokonalá starostlivosť o vaše chodidlá",
		handle: "Pedikúra",
		icon: Footprints,
		image: "/images/services/pedikura.jpg"
	},
	{
		href: "/sluzby/makeup",
		label: "Profesionálne líčenie pre každú príležitosť",
		handle: "Makeup",
		icon: Paintbrush,
		image: "/images/services/makeup.jpg"
	}
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{sluzby.map((s) => (
						<Card>
							<Link
								href={s.href}
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-48 lg:py-64 lg:pb-96 md:p-16 h-[600px] sm:h-[700px] md:h-[800px] overflow-hidden"
							>
								{s.image && (
									<div className="absolute inset-0 z-0">
										<Image 
											src={s.image} 
											alt={s.handle}
											fill
											className="object-cover object-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											priority
										/>
									</div>
								)}
								<div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900/20 to-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-16 h-16 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon && <s.icon size={24} />}
								</span>{" "}
								<div className="z-10 flex flex-col items-center justify-center h-full">
									<span className="lg:text-2xl font-medium duration-150 xl:text-4xl text-zinc-200 group-hover:text-white font-display text-center">
										{s.handle}
									</span>
									<span className="mt-6 text-base md:text-lg text-center max-w-xs duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
									<span className="mt-10 px-4 py-2 rounded-full border border-zinc-500 text-zinc-300 group-hover:text-white group-hover:border-zinc-300 transition-colors duration-300 text-sm">
										Zistiť viac
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
