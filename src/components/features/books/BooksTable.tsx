import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import type { IBookFull } from "@/types/book.type";
import { getErrorMessage } from "@/utils/errorHandler";
import { Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type BooksTableProps = {
  books: IBookFull[]; // Accepts array or undefined
};

export default function BooksTable({ books }: BooksTableProps) {
  const navigate = useNavigate();

  const [
    deleteBook,
    {
      isLoading,
      //  isError, isSuccess
    },
  ] = useDeleteBookMutation();

  function handelBorrowRedirect(id: string) {
    if (!id) return;
    navigate(`/borrow/${id}`);
  }

  function handelUpdateBookRedirect(id: string) {
    if (!id) return;
    navigate(`/book/update/${id}`);
  }

  async function handleBookDelete(bookId: string) {
    console.log("Deleting Book", bookId);

    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(bookId).unwrap();
        toast.success("Book deleted successfully ");
      } catch (error) {
        const msg = getErrorMessage(error);
        toast.error(`Failed to remove Book: ${msg}`);
        console.log("Failed to delete:", error);
      }
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>Title</TableHead>
          <TableHead className='text-center'>Author</TableHead>
          <TableHead className='text-center'>Genre</TableHead>
          <TableHead className='text-center'>ISBN</TableHead>
          <TableHead className='text-center'>Copies</TableHead>
          <TableHead className='text-center'>Availability</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className='text-center'>
        {books && books?.length > 0 ? (
          books?.map((book) => (
            <TableRow
              key={book?._id}
              className={cn(book?.available ? "bg-green-50" : "bg-red-50")}>
              <TableCell>{book?.title}</TableCell>
              <TableCell>{book?.author}</TableCell>
              <TableCell>{book?.genre}</TableCell>
              <TableCell>{book?.isbn}</TableCell>
              <TableCell>{book?.copies}</TableCell>
              <TableCell>{book?.available ? "Yes" : "No"}</TableCell>
              <TableCell className='space-x-2 '>
                {/* book update btn */}
                <Button
                  onClick={() => handelUpdateBookRedirect(book._id)}
                  variant={"outline"}
                  className='bg-gray-100 hover:cursor-pointer'>
                  <Pen color='skyblue' />
                </Button>

                {/* book delete btn */}
                <Button
                  onClick={() => handleBookDelete(book._id)}
                  disabled={isLoading}
                  variant={"outline"}
                  className='bg-gray-100 hover:cursor-pointer'>
                  <Trash2 color='red' />
                </Button>

                {/* borrow book btn */}
                {book?.available && (
                  <Button
                    onClick={() => handelBorrowRedirect(book._id)}
                    variant={"outline"}
                    className='bg-gray-100 hover:cursor-pointer'>
                    Borrow
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className='text-center'>
              No Books Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
