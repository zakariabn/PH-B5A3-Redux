// Need to use the React-specific entry point to import createApi
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
    getBooks: builder.query({
      query: () => `/books`,
    }),

    // DELETE book
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),

    // update book (PUT)
    updateBook: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

/*
    updatePost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),

*/

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
