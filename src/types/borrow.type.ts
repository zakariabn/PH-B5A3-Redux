import type { IBookFull } from "./book.type";
import type { IResponseData } from "./common.type";

export interface IBorrow {
  id: string;
  name?: string;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowPayload {
  book: string;
  quantity: number;
  duDate: string;
}

export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface IBorrowResponse extends IResponseData {
  data?: IBorrow;
}

export interface ISummaryResponse extends IResponseData {
  data?: IBorrowSummary;
}

export type OnSubmitBorrow = (values: IBorrow, reset: () => void) => void;

export interface IBorrowFormProps {
  book: IBookFull;
}
