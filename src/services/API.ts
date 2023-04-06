import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { ref, uploadString } from "firebase/storage";
import { storage, auth, db } from "../firebase/index";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(
  prompt: string,
  number: number,
  cover: boolean
): Promise<ImagesResponseDataInner[] | undefined> {
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

async function uploadCover(b64_string: string, prompt: string): Promise<void> {
  try {
    const storageRef = ref(
      storage,
      `${auth.currentUser?.email}/${prompt}/cover_image`
    );
    await uploadString(storageRef, b64_string, "data_url");
    await addDoc(collection(db, `users/${auth.currentUser?.email}/stories`), {
      title: `${prompt}`,
    });
  } catch (error) {
    console.error(error);
  }
}

async function uploadPage(
  b64_string: string,
  currentStoryTitle: string,
  prompt: string,
  pageNumber: number,
  text: string
): Promise<void> {
  try {
    const storageRef = ref(
      storage,
      `${auth.currentUser?.email}/${currentStoryTitle}/${prompt}`
    );

    uploadString(storageRef, b64_string, "data_url");

    addDoc(collection(db, `${auth.currentUser?.email}/${currentStoryTitle}`), {
      pageNumber: pageNumber,
      text: text,
    });
  } catch (error) {
    console.error(error);
  }
}

async function getUserBooks(): Promise<DocumentData[] | undefined> {
  try {
    const data = await getDocs(
      collection(db, `users/${auth.currentUser?.email}/stories`)
    );

    return data.docs.map((book) => book.data());
  } catch (error) {
    console.error(error);
  }
}

export { generateImage, uploadCover, uploadPage, getUserBooks };
