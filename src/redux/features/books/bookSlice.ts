import type { RootState } from "@/redux/store";
import type { IBook } from "@/types/book.type";
import { createSlice } from "@reduxjs/toolkit";

interface BookInitState {
  books: IBook[];
}

const initialState: BookInitState = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks: (state, actions) => {
      console.log(state, actions);
    },
  },
});

export const { getBooks } = bookSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.books.books;
export default bookSlice.reducer;
