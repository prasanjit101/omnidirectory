'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export default function Component() {
	const [uploadedFile, setUploadedFile] = useState<File>();
	const [context, setContext] = useState('');
	const [uploading, setUploading] = useState(false);

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB to bytes

	const handleUpload = () => {
		const formData = new FormData();
		formData.set('context', context);
		formData.set('lastModified', new Date().toLocaleString());
		if (uploadedFile) {
			formData.set('file', uploadedFile);
		}

		setUploading(true);
		fetch('/api/upload', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				setUploading(false);
				toast(data.message ?? 'File uploaded');
				setContext('');
			})
			.catch((error) => {
				setUploading(false);
				console.log(error);
				toast.error(error?.message ?? 'Upload failed');
			});
	};

	const onFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target;
		console.log({ fileInput });
		if (!fileInput.files) {
			console.warn('no file was chosen');
			return;
		}
		if (!fileInput.files || fileInput.files.length === 0) {
			console.warn('files list is empty');
			return;
		}
		const file = fileInput.files[0];
		console.log({ file });
		try {
			if (file.size > MAX_FILE_SIZE) {
				alert('File size exceeds the limit of 5mb');
				throw new Error('File size exceeds the limit of 5mb');
			}
			setUploadedFile(file);
		} catch (error: any) {
			console.error(error.message ?? 'Error uploading file');
			fileInput.files = null;
		}
	};

	return (
		<Card className="w-full">
			<CardContent className="space-y-3 p-7">
				<h3 className="text-xl">Upload file</h3>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="file">Attach a File (Max. 5mb)</Label>
						<Input onChange={onFileInputChange} required id="file" type="file" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="context">Add context (optional)</Label>
						<Textarea
							id="context"
							placeholder="Add any relevant context to the file (optional). It will help to find the file in the future quicker."
							className="min-h-[100px]"
							onChange={(e) => setContext(e.target.value)}
						/>
					</div>
					<Button disabled={uploading} onClick={() => handleUpload()} className="w-full">
						Submit{uploading ? 'ting' : ''}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
