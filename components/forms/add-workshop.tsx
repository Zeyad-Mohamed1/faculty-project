"use client";

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
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createWorkshop } from "@/actions/workshop/workshop";

const formSchema = z.object({
  name: z.string().min(2),
});

export function AddWorkshopForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data, mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["create-device"],
    mutationFn: async (name: string) => await createWorkshop(name),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values.name);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      router.push("/dashboard/workshops");
    }
  }, [isSuccess, data, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:w-1/2 mx-auto border p-5 rounded-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الورشة</FormLabel>
              <FormControl>
                <Input placeholder="يرجي ادخال اسم الورشة" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          إنشاء
        </Button>
      </form>
    </Form>
  );
}
