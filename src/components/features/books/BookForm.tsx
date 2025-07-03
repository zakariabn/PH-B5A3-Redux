"use client";

/* ---------------------------------- deps --------------------------------- */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type {IBook, IBookFormProps } from "@/types/book.type";


/* -------------------------- shared schema / types ------------------------- */
const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

/** Zod schema used for both create & update */
const bookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  genre: z.enum(GENRES),
  isbn: z.string().min(1, "ISBN is required."),
  copies: z.coerce.number().min(0, "Must be ≥ 0"),
  description: z.string().min(1, "Description is required."),
});

/* ------------------------------ BookForm UI ------------------------------- */

export default function BookForm({
  defaultValues = {},
  submitLabel = "Save",
  onSubmit,
  isLoading = false,
} : IBookFormProps) {
  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      copies: 1,
      description: "",
      ...defaultValues,
    },
  });

  /** Handle RHF -> parent  */
  const handleSubmit = async (values: IBook): Promise<void> => {
    const payload = { ...values, available: values.copies > 0 };
    await onSubmit(payload, form.reset);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {/* Title */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter book title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Author */}
        <FormField
          control={form.control}
          name='author'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder='Enter author name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Genre */}
        <FormField
          control={form.control}
          name='genre'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select genre' />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ISBN */}
        <FormField
          control={form.control}
          name='isbn'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder='Enter ISBN' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Copies */}
        <FormField
          control={form.control}
          name='copies'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter number of copies'
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
