const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateCover = async (prompt: string, number: number) => {
  try {
    const result = await openai.createImage({
      prompt: prompt,
      n: number,
      size: "1024x1024",
    });
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
};

const generateImage = async (prompt: string, number: number) => {
  try {
    const result = await openai.createImage({
      prompt: prompt,
      n: number,
      size: "512x512",
    });
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
};

export { generateCover, generateImage };
