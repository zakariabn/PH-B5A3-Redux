import Loading from "@/components/common/Loading";
import BorrowForm from "@/components/features/borrow/BorrowForm";
import { useGetSingleBooksQuery } from "@/redux/features/books/bookApi";
import type { IBookFull } from "@/types/book.type";
import { useParams } from "react-router";

export default function BorrowBookPage() {
  const { bookId: id } = useParams();
  const { data, isFetching } = useGetSingleBooksQuery(id as string);

  if (isFetching) {
    return <Loading />;
  }

  // handling if book not found
  if (!data?.data) {
    return (
      <div className='text-center text-red-500 mt-10'>
        Book not found or failed to load.
      </div>
    );
  }
  const book = data.data as IBookFull;

  return (
    <div className='container my-10 flex justify-center items-center'>
      <div>
        <h2 className='text-2xl font-semibold text-center mb-10'>
          Borrow Book
        </h2>
        <BorrowForm book={book} />
      </div>
    </div>
  );
}
