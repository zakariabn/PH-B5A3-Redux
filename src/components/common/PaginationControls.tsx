"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { setPage } from "@/redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector((state) => state.books);

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => handlePageClick(e, currentPage - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              isActive={page === currentPage}
              onClick={(e) => handlePageClick(e, page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => handlePageClick(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
