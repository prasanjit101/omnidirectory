import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';

export const getEmbeddingsModel = () => {
	return new GoogleGenerativeAIEmbeddings({
		model: 'embedding-001', // 768 dimensions
		taskType: TaskType.RETRIEVAL_QUERY,
		apiKey: process.env.GEMINI_API_KEY,
	});
};

export const model = new ChatGoogleGenerativeAI({
	model: 'gemini-1.0-pro',
	apiKey: process.env.GEMINI_API_KEY,
});
