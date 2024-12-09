/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import { createFactoryService } from "@/actions/service/service";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string(),
  organization: z.string(),
  description: z.string(),
  level: z.string(),
  device: z.string(),
  file: z.string().nullable(),
});

const devices = [
  "طباعة ثلاثي الأبعاد",
  "اله قطع بالليزر",
  "اله التحكم الرقمي بالحاسب",
];

const levels = ["نموذج قيد التطوير", "قيد التطبيق"];

export default function ServiceBookingForm() {
  const [url, setUrl] = useState<string | null>(null);
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") as string) || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: user?.phone || "",
      device: "",
      organization: "",
      description: "",
      level: "",
      file: null,
    },
  });

  const {
    mutate,
    isPending,
    isSuccess,
    data: reservation,
  } = useMutation({
    mutationKey: ["reserve-device"],
    mutationFn: async ({
      name,
      phone,
      organization,
      description,
      level,
      device,
      file,
    }: {
      name: string;
      phone: string;
      organization: string;
      description: string;
      level: string;
      device: string;
      file: string;
    }) =>
      await createFactoryService({
        name,
        phone,
        organization,
        description,
        level,
        device,
        file,
      }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      name: values.name,
      phone: values.phone,
      organization: values.organization,
      description: values.description,
      level: values.level,
      device: values.device,
      file: values.file || "",
    });
    console.log(values);
    form.reset();
    // Here you would typically send the form data to your backend
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(reservation?.message);
      router.push("/");
    }
  }, [isSuccess, router, reservation]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 border p-5 rounded-lg max-w-[500px] mx-auto my-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="برجاء ادخال الاسم" {...field} />
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
              <FormLabel>الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="برجاء ادخال الهاتف" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>الجهة</FormLabel>
              <FormControl>
                <Input placeholder="برجاء ادخال اسم الجهة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المشروع</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="برجاء ادخال وصف المشروع"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مرحلة المشروع</FormLabel>
              <Select dir="rtl" onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="قم باختيار مرحلة المشروع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {levels?.map((time: any, index: number) => (
                    <SelectItem key={String(index)} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="device"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ماهو الجهاز الذي تريد استخدامه؟</FormLabel>
              <Select
                dir="rtl"
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="قم بتحديد الجهاز" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {devices?.map((device: any, i: number) => (
                    <SelectItem key={i} value={device}>
                      {device}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("device") === "طباعة ثلاثي الأبعاد" ? (
          url === null ? (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                form.setValue("file", res[0].url);
                setUrl(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
          ) : (
            <div className="flex items-center justify-center text-muted-foreground">
              تم رفع الملف بنجاح
            </div>
          )
        ) : null}

        <Button disabled={isPending} type="submit" className="w-full">
          حجز
        </Button>

        {form.watch("device") === "طباعة ثلاثي الأبعاد" && (
          <Link href="/stl-viewer">
            <Button
              disabled={isPending}
              type="submit"
              className="mt-5 text-center"
            >
              STL Viewer
            </Button>
          </Link>
        )}
      </form>
    </Form>
  );
}
