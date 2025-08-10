import type { IResponseData } from "./common.type";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  copies: number;
  available?: boolean;
  description: string;
}

export interface IBookFull extends IBook {
  _id: string;
  updatedAt: Date;
  createAt: Date;
}

export interface IBookResponse extends IResponseData {
  data?: IBookFull;
}
export interface IAllBookResponse extends IResponseData {
  books: IBookFull[];
  pagination: {
    page: number;
    totalPage: number;
    limit: number;
  };
}

export type OnSubmitBook = (values: IBook, reset: () => void) => void;

export interface IBookFormProps {
  defaultValues?: Partial<IBook>;
  submitLabel?: string;
  onSubmit: OnSubmitBook;
  isLoading?: boolean;
}
