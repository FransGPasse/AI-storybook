export interface IBook {
  title: string;
  pages: IPage[];
  coverImg: string;
}
export interface IPage {
  pageNumber: number;
  text: string;
  image: string;
}
