import {
  useGetSingleBooksQuery,
  useUpdateBookMutation,
} from "@/redux/features/books/bookApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import type { IBook } from "@/types/book.type";
import BookForm from "@/components/features/books/BookForm";
import { useParams, useNavigate } from "react-router";

export default function UpdateBookPage() {
  const { bookId: id } = useParams();
  const navigate = useNavigate();
  const { data: book, isFetching } = useGetSingleBooksQuery(id as string);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  console.log(book);

  const handleUpdate = async (values: IBook) => {
    try {
      await updateBook({ id: id as string, ...values }).unwrap();
      toast.success("Book updated successfully.");
      navigate("/all-book");
    } catch (err) {
      toast.error(`Failed to update. ${getErrorMessage(err)}`);
    }
  };

  if (isFetching) return <p className='text-center'>Loading…</p>;

  return (
    <div className='w-full md:max-w-1/2 mx-auto px-2 md:p-0 my-10'>
      <h2 className='text-xl font-semibold text-center mb-5'>Edit Book</h2>
      <BookForm
        defaultValues={book?.data}
        onSubmit={handleUpdate}
        isLoading={isLoading}
        submitLabel='Update Book'
      />
    </div>
  );
}
