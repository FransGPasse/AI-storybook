const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateCover = async (prompt: string) => {
  try {
    const result = await openai.createImage({
      prompt: prompt + "no text, book cover",
      n: 1,
      size: "1024x1024",
    });
    return result.data.data[0].url;
  } catch (error) {
    console.error(error);
  }
};

const generateImage = async (prompt: string) => {
  try {
    const result = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    return result.data.data[0].url;
  } catch (error) {
    console.error(error);
  }
};

export { generateCover, generateImage };
