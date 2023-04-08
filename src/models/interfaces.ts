export interface IBook {
  title: string;
  pages: IPage[];
}
interface IPage {
  pageNumber: number;
  text: string;
}
