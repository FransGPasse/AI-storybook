export interface IBook {
  title: string;
  pages: IPage[];
  cover: string;
}
export interface IPage {
  pageNumber: number;
  text: string;
  image: string;
}
