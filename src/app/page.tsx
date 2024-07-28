import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import UploadForm from '@/components/Uploadform';
import SearchPanel from '@/components/SearchPanel';
import HowItWorks from '@/components/HowItWorks';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<main className="flex min-h-screen gap-4 flex-col items-center justify-center w-3/5 mx-auto space-y-9 p-24">
			<div className="space-y-3 text-center">
				<h1 className="text-3xl font-bold">Omnidirectory - The AI File Manager</h1>
				<h3 className="text-lg font-semibold">#Never lose your files again</h3>
			</div>
			<HowItWorks />
			<UploadForm />
			<Separator />
			<SearchPanel />
		</main>
	);
}
