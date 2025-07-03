"use client";


import { useCreateBookMutation } from "@/redux/features/books/bookApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import BookForm from "@/components/features/books/BookForm";
import type { OnSubmit } from "@/types/book.type";

export default function CreateBookPage() {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleCreate : OnSubmit = async (values, reset) => {
    try {
      await createBook(values).unwrap();
      toast.success("Book created successfully.");
      reset();
    } catch (err) {
      toast.error(`Failed to create. ${getErrorMessage(err)}`);
    }
  };

  return (
    <div className="w-full md:max-w-1/2 mx-auto px-2 md:p-0 my-10">
      <h2 className="text-xl font-semibold text-center mb-5">Add Book</h2>
      <BookForm
        onSubmit={handleCreate}
        isLoading={isLoading}
        submitLabel="Create Book"
      />
    </div>
  );
}
