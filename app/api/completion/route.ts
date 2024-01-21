import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        // a precise prompt is important for the AI to reply with the correct tokens
        messages: [
            {
                role: "user",
                content: `${prompt}
        
Output:\n`,
            },
        ],
        max_tokens: 400,
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}
