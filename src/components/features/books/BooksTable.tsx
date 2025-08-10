import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import type { IAllBookResponse } from "@/types/book.type";
import { getErrorMessage } from "@/utils/errorHandler";
import { Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setPage } from "@/redux/features/books/bookSlice";

export default function BooksTable({
  booksData,
}: {
  booksData: IAllBookResponse;
}) {
  const navigate = useNavigate();
  const { books, pagination } = booksData;

  const dispatch = useAppDispatch();

  // Add default values to prevent undefined errors
  // Handle potential property name mismatches (totalPage vs totalPages)
  const safePagination = pagination
    ? {
        page: pagination.page || 1,
        totalPage: pagination.totalPage || 1,
        limit: pagination.limit || 10,
      }
    : { page: 1, totalPage: 1, limit: 10 };
  const safeBooks = books || [];

  console.log("BooksTable received booksData:", booksData);
  console.log("Extracted books:", books);
  console.log("Extracted pagination:", pagination);
  console.log(
    "Pagination keys:",
    pagination ? Object.keys(pagination) : "No pagination"
  );
  console.log("Pagination values:", pagination);

  const [
    deleteBook,
    {
      isLoading,
      //  isError, isSuccess,
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
        toast.success("Book deleted successfully");
      } catch (error) {
        const msg = getErrorMessage(error);
        toast.error(`Failed to remove Book: ${msg}`);
        console.log("Failed to delete:", error);
      }
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = safePagination.totalPage;
    const current = safePagination.page;

    // Always show first page
    pages.push(1);

    // Show pages around current page
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    if (start > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
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
          {safeBooks && Array.isArray(safeBooks) && safeBooks.length > 0 ? (
            safeBooks.map((book) => (
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
              <TableCell colSpan={7} className='text-center'>
                No Books Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      {safePagination && safePagination.totalPage > 1 && (
        <div className='flex flex-col items-center mt-6 space-y-4'>
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (safePagination.page > 1) {
                      handlePageChange(safePagination.page - 1);
                    }
                  }}
                  className={
                    safePagination.page <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page numbers */}
              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis-start" || page === "ellipsis-end" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page as number);
                      }}
                      isActive={safePagination.page === page}
                      className='cursor-pointer'>
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next button */}
              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (safePagination.page < safePagination.totalPage) {
                      handlePageChange(safePagination.page + 1);
                    }
                  }}
                  className={
                    safePagination.page >= safePagination.totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
