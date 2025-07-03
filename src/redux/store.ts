import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./features/books/bookApi";
import bookRouter from "./features/books/bookSlice";
import { borrowApi } from "./features/borrow/borrowApi";

export const store = configureStore({
  reducer: {
    books: bookRouter,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
