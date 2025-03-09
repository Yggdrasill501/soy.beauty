export default function ONasLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-800/30 to-zinc-900">
			{children}
		</div>
	);
}
