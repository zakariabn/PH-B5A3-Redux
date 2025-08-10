import type {
  IBook,
  IBookFull,
  IBookResponse,
  IAllBookResponse,
} from "@/types/book.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base url
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
console.log("base api url", BASE_API_URL);

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ["Books", "Book"],
  endpoints: (builder) => ({
    // get all book
    getBooks: builder.query<
      IAllBookResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => `/books?page=${page}&limit=${limit}`,
      transformResponse: (response: any) => {
        console.log("API Response before transform:", response);

        if (response.data && response.data.books && response.data.pagination) {
          const transformedData = {
            books: response.data.books,
            pagination: response.data.pagination,
            success: response.success,
            message: response.message,
          };
          console.log("Transformed data:", transformedData);
          return transformedData;
        }

        // Fallback for other response structures
        const data = response.data || response;
        console.log("Fallback transformed data:", data);
        return data;
      },
      providesTags: ["Books"],
    }),

    getSingleBooks: builder.query<IBookResponse, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // delete book
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // update book (PUT)
    updateBook: builder.mutation<IBookFull, { id: string; [key: string]: any }>(
      {
        query: ({ id, ...payload }) => ({
          url: `/books/${id}`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          "Books",
          { type: "Book", id },
        ],
      }
    ),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
