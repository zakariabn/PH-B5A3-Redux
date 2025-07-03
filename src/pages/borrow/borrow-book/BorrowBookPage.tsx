import { useParams } from "react-router";

export default function BorrowBookPage() {
  const { bookId } = useParams();

  return (
    <div className='container my-10 flex justify-center items-center'>
      <div>
        <h2>{bookId} book</h2>
      </div>
    </div>
  );
}
