import { DocumentData } from "@firebase/firestore";

export interface IBook {
  id: string;
  title: string;
  pages: IPage[];
}

export interface IPage {
  pageNumber: number;
  text: string;
}
