import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { ref, uploadString, getBytes } from "firebase/storage";
import { storage, auth, db } from "../firebase/index";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  arrayUnion,
  updateDoc,
  DocumentData,
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

async function uploadCover(
  b64_string: string,
  prompt: string
): Promise<string | undefined> {
  try {
    const coverRef = ref(storage, `${auth.currentUser?.email}/${prompt}/cover`);
    await uploadString(coverRef, b64_string, "data_url");

    const colRef = collection(db, `users/${auth.currentUser?.email}/stories`);

    const docRef = await addDoc(colRef, {
      title: prompt,
      pages: [],
    });

    return docRef.id;
  } catch (error) {
    console.error(error);
  }
}

async function uploadPage(
  b64_string: string,
  currentStoryTitle: string,
  prompt: string,
  docRef: string,
  pageNumber: number,
  text: string
): Promise<void> {
  try {
    const storageRef = ref(
      storage,
      `${auth.currentUser?.email}/${currentStoryTitle}/${prompt}`
    );

    uploadString(storageRef, b64_string, "data_url");

    const colRef = collection(db, `users/${auth.currentUser?.email}/stories`);

    const document = doc(colRef, `${docRef}`);

    await updateDoc(document, {
      pages: arrayUnion({
        pageNumber: pageNumber,
        text: text,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function getUserTexts(): Promise<DocumentData[] | undefined> {
  try {
    const colRef = collection(db, `users/${auth.currentUser?.email}/stories`);

    const data = await getDocs(colRef);

    return data.docs.map((book) => book.data());
  } catch (error) {
    console.error(error);
  }
}

async function getUserPictures(): Promise<ArrayBuffer | undefined> {
  try {
    const storageRef = ref(storage, `${auth.currentUser?.email}`);

    return await getBytes(storageRef);
  } catch (error) {
    console.error(error);
  }
}

export {
  generateImage,
  uploadCover,
  uploadPage,
  getUserTexts,
  getUserPictures,
};
