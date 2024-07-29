import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import UploadForm from '@/components/Uploadform';
import SearchPanel from '@/components/SearchPanel';
import HowItWorks from '@/components/HowItWorks';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
	return (
		<main className="flex min-h-screen gap-4 flex-col items-center justify-center w-3/5 mx-auto space-y-9 p-24">
			<div className="space-y-3 text-center">
				<h1 className="text-3xl font-bold">Omnidirectory - The AI File Manager</h1>
				<h3 className="text-lg font-semibold">#Never lose your files again</h3>
			</div>
			<Tabs defaultValue="upload" className="w-full">
				<TabsList className="w-full my-5">
					<TabsTrigger className="w-1/3" value="hiw">
						How it works
					</TabsTrigger>
					<TabsTrigger className="w-1/3" value="upload">
						Upload Files
					</TabsTrigger>
					<TabsTrigger className="w-1/3" value="files">
						Search Files
					</TabsTrigger>
				</TabsList>
				<TabsContent value="upload" className="min-h-96">
					<UploadForm />
				</TabsContent>
				<TabsContent value="hiw" className="min-h-96">
					<HowItWorks />
				</TabsContent>
				<TabsContent value="files" className="min-h-96">
					<SearchPanel />
				</TabsContent>
			</Tabs>
		</main>
	);
}
