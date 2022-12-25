const API_KEY = import.meta.env.VITE_API_KEY;
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (prompt: string) => {
  const result = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  return result.data.data[0].url;
};

export { generateImage };
