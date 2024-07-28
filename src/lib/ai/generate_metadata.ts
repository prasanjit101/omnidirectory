import { StringOutputParser, JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { model } from './gemini';
import { PineconeRecord } from '@pinecone-database/pinecone';

export async function generateMetadata({
	fileName,
	lastModified,
	contentType,
	context,
}: {
	fileName: string;
	lastModified: string;
	contentType: string;
	context: string;
}) {
	const generateFileContextPrompt = ChatPromptTemplate.fromMessages([
		[
			'system',
			'You are a helpful assistant who excels in generating meaniful descriptive texts from unstructured, incomprehensible contents.',
		],
		[
			'user',
			'Given the following metadata about a file. Generate a description on the context of the file. Please only generate the detailed context and nothing else.\n\nMetadata of the file: \n{metadata}',
		],
	]);

	const fileMetadata =
		`file name: ${fileName}\ncreated on: ${lastModified}\ncontent type: ${contentType}\n` +
		(context ? `description: ${context}\n` : '');

	const generatedContext = await generateFileContextPrompt
		.pipe(model)
		.pipe(new StringOutputParser())
		.invoke({
			metadata: fileMetadata,
		});
	return {
		metadata: {
			title: fileName,
			context,
			description: generatedContext,
			lastModified,
			contentType,
			fileRef: 'public/files/' + fileName.replace(/ /g, '_'),
		},
		generatedContext,
	};
}
