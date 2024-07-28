import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { uploadFile } from '@/lib/firebase';
import { getEmbeddingsModel } from '@/lib/ai/gemini';
import { pineconeIndex } from '@/lib/ai/vectorstore';

export const POST = async (req: NextRequest, res: any) => {
	try {
		const body = await req.json();
		const searchText = body.searchText;
		// search in pinecone
		const embeddingModel = getEmbeddingsModel();
		const embedding = await embeddingModel.embedQuery(searchText);
		const records = await pineconeIndex.query({ topK: 10, vector: embedding });
		const results = records?.matches ?? [];
		return NextResponse.json({ message: 'Success', results, status: 201 });
	} catch (error) {
		console.log('Error occured ', error);
		return NextResponse.json({ message: 'Failed', results: [], status: 500 });
	}
};
