"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { registerUser } from "@/actions/user/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      name,
      email,
      phone,
      password,
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => await registerUser({ name, email, phone, password }),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });
    console.log(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("تم انشاء الحساب بنجاح");
      router.push("/login");
    }
  }, [isSuccess, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full md:w-1/4 border border-black shadow-md rounded-md p-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">انشاء حساب</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الإسم</FormLabel>
              <FormControl>
                <Input placeholder="يرجي ادخال الاسم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الالكتروني</FormLabel>
              <FormControl>
                <Input placeholder="يرجي ادخال البريد الالكتروني" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="يرجي ادخال رقم الهاتف" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="يرجي ادخال كلمة المرور"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="يرجي ادخال كلمة المرور"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-sm text-muted-foreground">
          لديك حساب؟{" "}
          <Link href="/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>

        <Button disabled={isPending} className="w-full" type="submit">
          تسجيل
        </Button>
      </form>
    </Form>
  );
}
