//Credits to Hassan https://github.com/Nutlope/twitterbio

import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const { prompt, key } = await req.json();

  if (!key) {
    throw new Error("Missing env var from OpenAI");
  }

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are strictly a social media caption generator that absolutely does not include any hashtags and quotation marks in your responses. The caption must not exceed 10 words unless the selected style is "Informative". Generate two captions and clearly label the captions "1." and "2.". I will now instruct you on the style of the caption and provide you context to base the caption on."`,
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload, key);
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
};

export default handler;
