'use client';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PineconeMetadata } from '@/dto/pinecone.dto';
import { Card } from './ui/card';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SearchPanel() {
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searching, setSearching] = useState(false);

	const handleSearchFiles = () => {
		if (searchText) {
			setSearching(true);
			fetch('/api/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchText }),
			})
				.then((res) => res.json())
				.then((data) => {
					toast.success(data.message ?? 'Search performed');
					setSearching(false);
					setSearchResults(data.results);
				})
				.catch((error) => {
					setSearching(false);
					console.log(error);
					toast.error(error?.message ?? 'Search failed');
				});
		}
	};

	return (
		<Card className="w-full space-y-4 p-7">
			<h3 className="text-xl">Search for files</h3>
			<div className="w-full flex">
				<Input
					onChange={(e) => setSearchText(e.target.value)}
					placeholder="Enter anything that you remember about the file"
				/>
				<Button disabled={searching} onClick={() => handleSearchFiles()}>
					Search
				</Button>
			</div>
			<div className="w-full text-center space-y-4">
				{searchResults.length > 0 ? (
					<div className="">
						{searchResults.map(({ metadata }: { metadata: PineconeMetadata }) => (
							<Card className="p-6 my-3 text-left space-y-3">
								<p className="text-lg font-semibold">{metadata.title}</p>
								<p>{metadata.context}</p>
								<p className="text-sm">Created on {metadata.lastModified}</p>
								<p className="text-sm">Type. {metadata.contentType}</p>
								<div className="py-5">
									<Link
										href={'/api/search?fileRef=' + metadata.fileRef}
										className="bg-primary text-white py-3 px-4"
										target="_blank"
									>
										Retrieve File
									</Link>
								</div>
							</Card>
						))}
					</div>
				) : (
					<p className="text-sm">No results found</p>
				)}
			</div>
		</Card>
	);
}
