import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { storage, auth, db } from "../firebase/index";
import {
  ref,
  uploadString,
  listAll,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  DocumentData,
} from "firebase/firestore";

import { IBook } from "../models/interfaces";

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
    const colRef = collection(db, `users/${auth.currentUser?.email}/stories`);
    const docRef = await addDoc(colRef, {
      title: prompt,
      pages: [],
    });

    const coverRef = ref(
      storage,
      `${auth.currentUser?.email}/${docRef.id}/${prompt}`
    );
    await uploadString(coverRef, b64_string, "data_url");

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
      `${auth.currentUser?.email}/${docRef}/${prompt.toLowerCase()}`
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

async function getUserBooks(): Promise<DocumentData[] | undefined> {
  try {
    const colRef = collection(db, `users/${auth.currentUser?.email}/stories`);

    const data = await getDocs(colRef);

    return data.docs.map((book) => ({ id: book.id, title: book.data().title }));
  } catch (error) {
    console.error(error);
  }
}

async function fetchImageLinks(
  storageRef: StorageReference
): Promise<string[] | undefined> {
  try {
    const res = await listAll(storageRef);
    const promises = res.items.map((imageRef) => getDownloadURL(imageRef));
    const urls = await Promise.all(promises);
    return urls;
  } catch (error) {
    console.error(error);
  }
}

async function getUserBook(
  id: string | string[]
): Promise<DocumentData | undefined> {
  try {
    const storageRef = ref(storage, `${auth.currentUser?.email}/${id}`);

    const links = await fetchImageLinks(storageRef);

    console.log("links", links);

    const docRef = doc(db, `users/${auth.currentUser?.email}/stories`, `${id}`);

    return (await getDoc(docRef)).data();
  } catch (error) {
    console.error(error);
  }
}

export { generateImage, uploadCover, uploadPage, getUserBooks, getUserBook };
