'use client';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function SearchPanel() {
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState('');

	const handleSearchFiles = () => {
		if (searchText) {
		}
	};

	return (
		<div className="w-full space-y-4">
			<h3 className="text-xl">Search for files</h3>
			<div className="w-full flex">
				<Input placeholder="Enter anything that you remember about the file" />
				<Button onClick={() => handleSearchFiles()}>Search</Button>
			</div>
			<div className="w-full text-center space-y-4">
				{searchResults.length > 0 ? <p>Results</p> : <p>No results found</p>}
			</div>
		</div>
	);
}
