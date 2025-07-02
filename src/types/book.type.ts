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
  available: boolean;
  description: string;
}

export interface IBookFull extends IBook {
  _id: string;
  updatedAt: Date;
  createAt: Date;
}
