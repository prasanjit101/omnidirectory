import '@/app/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});
export const metadata = {
	title: 'Omnidirectory',
	description: 'Never lose your files again when you need them the most.',
	metadataBase: new URL('https://omnidirectory.byjit.com'),
	keywords: [
		'openai',
		'ai',
		'file manager',
		'best',
		'top',
		'advanced',
		'productivity',
		'chat gpt',
		'top rank',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
