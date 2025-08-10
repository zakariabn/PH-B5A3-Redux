import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type {
  IBorrow,
  IBorrowFormProps,
  IBorrowPayload,
} from "@/types/borrow.type";
import { useEffect } from "react";
import { useCreateBorrowMutation } from "@/redux/features/borrow/borrowApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { useNavigate } from "react-router";

/* --------------------------- Zod schema ---------------------------------- */
const formSchema = z.object({
  name: z.string(), // ✅ no min‑length
  id: z.string(),
  quantity: z.coerce.number().gte(1, {
    message: "Quantity must be at least 1",
  }),
  dueDate: z.date({ required_error: "Please pick due date" }),
});

export default function BorrowForm({ book }: IBorrowFormProps) {
  const navigate = useNavigate();
  // create form with simple static defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      quantity: 1,
      dueDate: undefined,
    },
    mode: "onSubmit", // avoids early front‑end errors
  });

  // when 'book' arrives, reset the whole form
  useEffect(() => {
    if (book) {
      form.reset({
        id: book._id,
        name: book.title,
        quantity: 1,
        dueDate: undefined,
      });
    }
  }, [book, form]);

  const [createBorrow, { isLoading }] = useCreateBorrowMutation();

  // submit handler
  const onSubmit = async (values: IBorrow) => {
    const payload: IBorrowPayload = {
      book: values.id,
      quantity: values.quantity,
      duDate: values.dueDate.toISOString(),
    };

    try {
      const res = await createBorrow(payload).unwrap();
      console.log(res);
      toast.success("Successfully borrowed a book");
      navigate("/borrow-summary");
    } catch (error) {
      toast.error(`Failed to create. ${getErrorMessage(error)}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        {/* Book title (read‑only) */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  value={field.value}
                  onChange={(e) => field.onChange(+e.target.value)}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due date */}
        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        "pl-3 text-left font-normal w-full",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value
                        ? format(field.value, "PPP")
                        : "Pick due date"}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={(d) => d && field.onChange(d)}
                    disabled={(date) => date < new Date()}
                    captionLayout='dropdown'
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? "Loading.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
