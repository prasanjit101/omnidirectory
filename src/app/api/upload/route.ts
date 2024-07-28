import { NextResponse } from 'next/server';
import path from 'path';
import { uploadFile } from '@/lib/firebase';
import { generateMetadata } from '@/lib/ai/generate_metadata';
import { getEmbeddingsModel } from '@/lib/ai/gemini';
import { pineconeIndex } from '@/lib/ai/vectorstore';

export const POST = async (req: any, res: any) => {
	const formData = await req.formData();

	const file: File = formData.get('file');
	const context = formData.get('context');
	if (!file) {
		return NextResponse.json({ error: 'No files received.' }, { status: 400 });
	}
	const fileName = file.name;
	const lastModified = file.lastModified.toLocaleString();
	const contentType = file.type;
	const fileSize = file.size;
	try {
		if (fileSize > 5 * 1024 * 1024) {
			return NextResponse.json({ error: 'File size exceeds the limit of 5mb' }, { status: 400 });
		}
		// upload to firebase
		await uploadFile(fileName, file);
		// generate the metadata
		const { metadata, generatedContext } = await generateMetadata({
			fileName,
			lastModified,
			contentType,
			context,
		});
		// convert generatedContext to embedding
		const embeddingModel = getEmbeddingsModel();
		const embedding = await embeddingModel.embedQuery(generatedContext);
		// add to pinecone
		const pineconeRecord = {
			metadata,
			values: embedding,
			id: fileName,
		};
		await pineconeIndex.upsert([pineconeRecord]);
		return NextResponse.json({ Message: 'Success', status: 201 });
	} catch (error) {
		console.log('Error occured ', error);
		return NextResponse.json({ Message: 'Failed', status: 500 });
	}
};
