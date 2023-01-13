const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;
import { Configuration, OpenAIApi } from "openai";
import {
  ref as refrenceToStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase/index";
import { auth } from "../firebase/index";

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateCover(prompt: string, number: number) {
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
}

async function generateImage(prompt: string, number: number) {
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
}

async function uploadImage(url: string, prompt: string) {
  console.log(url);
  try {
    const storageRef = refrenceToStorage(
      storage,
      `stories/${auth.currentUser?.uid}/${prompt}`
    );

    const result = await fetch(url);
    const blob = await result.blob();
    const file = new File([blob], `${Date.now()}.png`);

    uploadBytesResumable(storageRef, file);
  } catch (error) {
    console.error(error);
  }
}

export { generateCover, generateImage, uploadImage };
