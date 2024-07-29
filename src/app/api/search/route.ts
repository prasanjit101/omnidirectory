import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getFile, uploadFile } from '@/lib/firebase';
import { getEmbeddingsModel } from '@/lib/ai/gemini';
import { pineconeIndex } from '@/lib/ai/vectorstore';
import { NextApiRequest } from 'next';

export const POST = async (req: NextRequest, res: any) => {
	try {
		const body = await req.json();
		const searchText = body.searchText;
		// search in pinecone
		const embeddingModel = getEmbeddingsModel();
		const embedding = await embeddingModel.embedQuery(searchText);
		const records = await pineconeIndex.query({
			topK: 3,
			vector: embedding,
			includeMetadata: true,
			includeValues: false,
		});
		const results = records?.matches ?? [];
		return NextResponse.json({ message: 'Success', results, status: 201 });
	} catch (error) {
		console.log('Error occured ', error);
		return NextResponse.json({ message: 'Failed', results: [], status: 500 });
	}
};

export const GET = async (req: NextRequest, res: any) => {
	// query param fileRef
	const fileRef = req.nextUrl.searchParams.get('fileRef');
	try {
		// download the file
		if (!fileRef) {
			return NextResponse.json({ message: 'No fileRef provided', file: null, status: 400 });
		}
		const file = await getFile(fileRef);
		return NextResponse.redirect(file);
	} catch (error) {
		console.log('Error occured ', error);
		return NextResponse.json({ message: 'Failed', file: null, status: 500 });
	}
};