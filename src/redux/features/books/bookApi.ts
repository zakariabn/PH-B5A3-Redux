// Need to use the React-specific entry point to import createApi
import type { IBook, IBookFull, IBookResponse } from "@/types/book.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base url
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
console.log("base api url", BASE_API_URL);

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    // get all book
    getBooks: builder.query<IBookResponse, void>({
      query: () => `/books`,
    }),

    getSingleBooks: builder.query<IBookResponse, string>({
      query: (id: string) => `/books/${id}`,
    }),
    

    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
    }),

    // delete book
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),

    // update book (PUT)
    updateBook: builder.mutation<IBookFull, { id: string }>({
      query: ({ id, ...payload }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
