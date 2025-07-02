import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import BooksTable from "@/components/features/books/BooksTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function BookPage() {
  // Using a query hook automatically fetches data and returns query values

  const navigate = useNavigate();

  const {
    data: books,
    error,
    isLoading,
    // isFetching,
    // refetch,
  } = useGetBooksQuery("boos");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage err={error} />;
  }

  function handleAddBookRedirect() {
    navigate("/books/create");
  }

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
        <BooksTable books={books?.data} />
      </div>
    </div>
  );
}
