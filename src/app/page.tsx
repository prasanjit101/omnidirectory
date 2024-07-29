import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import UploadForm from '@/components/Uploadform';
import SearchPanel from '@/components/SearchPanel';
import HowItWorks from '@/components/HowItWorks';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { YouTubeEmbed } from '@next/third-parties/google';

export default function Home() {
	return (
		<main className="flex min-h-screen gap-4 flex-col items-center justify-center w-3/5 mx-auto space-y-9 p-24">
			<div className="space-y-3 text-center">
				<h1 className="text-3xl font-bold">Omnidirectory - The AI File Manager</h1>
				<h3 className="text-lg font-semibold">#Never lose your files again</h3>
			</div>
			<Tabs defaultValue="demo" className="w-full">
				<TabsList className="w-full my-5">
					<TabsTrigger className="w-1/4" value="demo">
						Demo video
					</TabsTrigger>
					<TabsTrigger className="w-1/4" value="hiw">
						How it works
					</TabsTrigger>
					<TabsTrigger className="w-1/4" value="upload">
						Upload Files
					</TabsTrigger>
					<TabsTrigger className="w-1/4" value="files">
						Search Files
					</TabsTrigger>
				</TabsList>
				<TabsContent value="demo" className="min-h-96">
					<YouTubeEmbed videoid="C1cSQPSqpAE" height={800} params="controls=0" />
				</TabsContent>
				<TabsContent value="upload" className="min-h-96 space-y-14">
					<div className="space-y-3 text-sm">
						<p>
							Note that this app is just a demo app. The uploaded files are not
							segregated per user.
						</p>
						<p>
							Thus any uploaded file is accessible to all the users. Hence
							uploading sensitive files, files containing personal infos are not
							recommended.
						</p>
					</div>
					<UploadForm />
				</TabsContent>
				<TabsContent value="hiw" className="min-h-96">
					<HowItWorks />
				</TabsContent>
				<TabsContent value="files" className="min-h-96 space-y-14">
					<div className="space-y-3 text-sm">
						<p>
							Search results will be arranged from most relevant to least from the
							top to the bottom.
						</p>
						<p>
							In this demo app, only 3 result is shown by default. But it is
							planned to have the user choose how many results to show in the
							future.
						</p>
					</div>
					<SearchPanel />
				</TabsContent>
			</Tabs>
		</main>
	);
}
