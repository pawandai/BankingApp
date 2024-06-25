"use client";

import TransactionFormSkeleton from "@/components/shared/FormSkeleton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Username must be at least 3 characters.",
  }),
  paymentType: z.string({
    required_error: "Payment type is required.",
  }),
  category: z.string({
    required_error: "Category is required.",
  }),
  amount: z.string({ required_error: "Amount is required." }),
  location: z.string({ required_error: "Location is required." }),
  date: z.date({ required_error: "Date is required." }),
});

const TransactionPage = () => {
  const { id } = useParams();
  // const { loading, data } = useQuery(GET_TRANSACTION, {
  //   variables: { id: id },
  // });

  // console.log("Transaction", data);

  // const [updateTransaction, { loading: loadingUpdate }] = useMutation(
  //   UPDATE_TRANSACTION,
  //   {
  //     // https://github.com/apollographql/apollo-client/issues/5419 => refetchQueries is not working, and here is how we fixed it
  //     refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
  //   }
  // );

  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: undefined,
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // event type any for now
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const amount = parseFloat(formData.amount);
  //   try {
  //     toast.success("Transaction updated successfully");
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //   }
  // };

  // if (loading) return <TransactionFormSkeleton />;

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="md:text-4xl text-2xl lg:text-4xl font-semibold text-center mb-4">
        Update this transaction
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rent, Groceries, Salary, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-3">
            {/* Payment Method */}
            <div className="w-full flex-1 mb-6 md:mb-0">
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Payment Method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CATEGORY */}
            <div className="w-full flex-1 mb-6 md:mb-0">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="saving">Saving</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* AMOUNT */}
            <div className="w-full flex-1 mb-6 md:mb-0">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (£)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-wrap gap-3 space-y-2">
            <div className="w-full flex-1">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DATE */}
            <div className="w-full flex-1">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Pick a Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Transaction"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default TransactionPage;
