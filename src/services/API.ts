import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { storage, auth, db } from "../firebase/index";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
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

const userEmail = auth.currentUser?.email;

const colRef = collection(db, `users/${userEmail}/stories`);

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
    /* Uploads a document with a title and an empty pages array */
    const docRef = await addDoc(colRef, {
      title: prompt,
      pages: [],
    });

    /* Uses the freshly generated document id to add the generated cover image to a storage folder with the same id as the Firestore document */
    const coverRef = ref(
      storage,
      `${auth.currentUser?.email}/${docRef.id}/cover`
    );
    const snapshot = await uploadString(coverRef, b64_string, "data_url");

    /* ...THEN refrences the same document and updates it with the link to the cover image */
    const downloadURL = await getDownloadURL(snapshot.ref);
    const document = doc(colRef, docRef.id);
    await updateDoc(document, {
      coverImg: downloadURL,
    });

    /* And returns the refrence to the document so we can save it in our helper store and continue updating the document */
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
}

async function uploadPage(
  b64_string: string,
  prompt: string,
  docRef: string,
  pageNumber: number,
  text: string
): Promise<void> {
  try {
    const storageRef = ref(
      storage,
      `${auth.currentUser?.email}/${docRef}/${prompt
        .toLowerCase()
        .replaceAll(" ", "")}`
    );
    const snapshot = await uploadString(storageRef, b64_string, "data_url");
    const downloadURL = await getDownloadURL(snapshot.ref);

    const document = doc(colRef, `${docRef}`);
    await updateDoc(document, {
      pages: arrayUnion({
        image: downloadURL,
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
    const books = await getDocs(colRef);

    return books.docs.map((book) => ({
      id: book.id,
      title: book.data().title,
    }));
  } catch (error) {
    console.error(error);
  }
}

async function getUserBook(
  id: string | string[]
): Promise<DocumentData | undefined> {
  try {
    const docRef = doc(db, `users/${auth.currentUser?.email}/stories`, `${id}`);
    const book = (await getDoc(docRef)).data();
    return book;
  } catch (error) {
    console.error(error);
  }
}

export { generateImage, uploadCover, uploadPage, getUserBooks, getUserBook };
