import { Pinecone } from '@pinecone-database/pinecone';

export const pinecone = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY!,
});

export const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!).namespace('omnidirectory');
