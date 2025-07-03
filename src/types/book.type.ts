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

export interface IBookResponse {
  success: boolean;
  message: string;
  data?: IBookFull;
  error?: {}
}

export type OnSubmit = (values: IBook, reset: () => void) => void;  
export interface IBookFormProps {
  defaultValues?: Partial<IBook>;
  submitLabel?: string;
  onSubmit: OnSubmit;
  isLoading?: boolean;
}