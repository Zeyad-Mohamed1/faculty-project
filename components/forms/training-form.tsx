/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {} from "react-day-picker";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMutation, useQuery } from "@tanstack/react-query";

import { ar } from "date-fns/locale";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  availableTimesForWorkshop,
  getWorkshops,
  reserveWorkshop,
} from "@/actions/workshop/workshop";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  date: z.date({ required_error: "A date is required." }),
  workshopName: z.string({ required_error: "Please select a workshop." }),
  time: z.string(),
});

export default function TrainingBookingForm() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") as string) || {};

  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => await getWorkshops(),
  });
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      workshopName: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["times", selectedDevice, form.watch("date")],
    queryFn: async () =>
      await availableTimesForWorkshop({
        deviceName: selectedDevice!,
        date: new Date(form.watch("date")),
      }),
    enabled: !!selectedDevice && !!form.watch("date"),
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
      email,
      workshopName,
      date,
      time,
    }: {
      name: string;
      email: string;
      workshopName: string;
      date: Date;
      time: string;
    }) => await reserveWorkshop({ name, email, workshopName, date, time }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      name: values.name,
      email: values.email,
      workshopName: values.workshopName,
      date: values.date,
      time: values.time || "",
    });
    console.log(values);
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
        className="space-y-4 border p-5 rounded-lg max-w-[500px] mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الإسم</FormLabel>
              <FormControl>
                <Input placeholder="برجاء ادخال الاسم" {...field} />
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
                <Input placeholder="برجاء ادخال البريد الالكتروني" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>التاريخ</FormLabel>
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ar })
                      ) : (
                        <span>قم بتحديد التاريخ</span>
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
                      date < new Date() ||
                      date >
                        new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workshopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الورشة</FormLabel>
              <Select
                dir="rtl"
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDevice(value);
                  form.setValue("time", ""); // Reset time when device changes
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="قم باختيار الورشة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="حجز القسم بالكامل">
                    حجز القسم بالكامل
                  </SelectItem>
                  {isLoading
                    ? "Loading..."
                    : Array.isArray(devices) &&
                      devices?.map((device: any) => (
                        <SelectItem key={device._id} value={device.name}>
                          {device.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedDevice && form.watch("date") !== undefined && (
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوقت المتاح</FormLabel>
                <Select dir="rtl" onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="قم بتحديد الوقت"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((time: any, index: number) => (
                      <SelectItem key={String(index)} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  يرجي العلم ان الحجز اقصاه ساعه
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={isPending} type="submit" className="w-full">
          حجز
        </Button>
      </form>
    </Form>
  );
}
