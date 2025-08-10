import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalPages: 1,
  limit: 10,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setTotalPages, setLimit } = bookSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.books.books;
export default bookSlice.reducer;
