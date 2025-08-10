import Loading from "@/components/common/Loading";
import { useGetBorrowSummaryQuery } from "@/redux/features/borrow/borrowApi";
import type { IBorrowSummary } from "@/types/borrow.type";

export default function BorrowSummaryPage() {
  const {
    data,

    isLoading,
    // isFetching,
    // refetch,
  } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return <Loading />;
  }

  // handling if borrow summary found
  if (!data?.data) {
    return (
      <div className='text-center text-red-500 mt-10'>
        Book not found or failed to load.
      </div>
    );
  }
  const borrowSummary = data?.data as unknown as IBorrowSummary[];

  return (
    <div className='container mx-auto my-10'>
      <h2 className='text-2xl font-semibold text-center mt-6 mb-10'>
        Borrow Summary
      </h2>

      <div className=' grid grid-cols-3 gap-5 content-center'>
        {borrowSummary?.map((bookSummary: IBorrowSummary, index: number) => (
          <div
            key={index}
            className='flex flex-col items-center py-10 bg-amber-500'>
            <p>Name: {bookSummary.book.title}</p>
            <p>Total borrowed: {bookSummary.totalQuantity}</p>
            {/* <p>{bookSummary.book.isbn}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
