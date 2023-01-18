import { Configuration, OpenAIApi } from "openai";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../firebase/index";
import { auth } from "../firebase/index";

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt: string, number: number, cover: boolean) {
  const imageSize = cover ? "1024x1024" : "512x512";
  try {
    const result = await openai.createImage({
      prompt: prompt,
      n: number,
      size: imageSize,
      response_format: "b64_json",
    });

    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function uploadImage(b64_string: string, prompt: string) {
  try {
    const storageRef = ref(
      storage,
      `stories/${auth.currentUser?.email}/${prompt}`
    );

    uploadString(storageRef, b64_string, "data_url");
  } catch (error) {
    console.error(error);
  }
}

async function uploadPage(b64_string: string, prompt: string, text: string) {}

export { generateImage, uploadImage, uploadPage };
