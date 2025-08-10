import Loading from "@/components/common/Loading";
import BooksTable from "@/components/features/books/BooksTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import type { IAllBookResponse } from "@/types/book.type";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/redux/hooks";

export default function BookPage() {
  // Using a query hook automatically fetches data and returns query values
  const navigate = useNavigate();
  const { currentPage, limit } = useAppSelector((state) => state.books);

  const {
    data,
    isLoading,
    // isFetching,
    // refetch,
  } = useGetBooksQuery({ page: currentPage, limit });

  if (isLoading) {
    return <Loading />;
  }

  function handleAddBookRedirect() {
    navigate("/book/create");
  }

  // Debug: Log the raw response
  console.log("Raw API response:", data);

  // handling if book not found
  if (!data) {
    return (
      <div className='text-center text-red-500 mt-10'>
        Book not found or failed to load.
      </div>
    );
  }

  const booksData = data as IAllBookResponse;
  console.log("Processed books data:", booksData);

  return (
    <div className='my-5'>
      <h2 className='text-2xl font-semibold text-center mt-5 mb-10'>
        All Books
      </h2>

      <div className='w-full max-w-11/12 mx-auto flex flex-col'>
        {/* create books route redirect button */}
        <Button
          variant={"outline"}
          className='ml-auto mb-3'
          onClick={handleAddBookRedirect}>
          <Plus size={24} />
          <span>Add Books</span>
        </Button>

        {/* books table */}
        <BooksTable booksData={booksData} />
      </div>
    </div>
  );
}
