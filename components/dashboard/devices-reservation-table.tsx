"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { ar } from "date-fns/locale";
import { getAllDeviceReservations } from "@/actions/devices/device";

export default function DeviceReservationTable() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data } = useQuery({
    queryKey: ["workshop-reservations", date],
    queryFn: async () => await getAllDeviceReservations(new Date(date!)),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">جدول حجوزات الأجهزة</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: ar })
              ) : (
                <span>قم بتحديد التاريخ</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <Table dir="rtl">
          <TableHeader>
            <TableRow dir="rtl" className="text-right">
              <TableHead>إسم الجهاز</TableHead>
              <TableHead>اسم المشارك</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الوقت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) &&
              data?.map((device) => (
                <TableRow key={device._id}>
                  <TableCell className="font-medium">
                    {device.deviceName}
                  </TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    {format(device.date, "PPP", { locale: ar })}
                  </TableCell>
                  <TableCell>
                    {device.time} - {device.time + 1}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-muted-foreground">
          لا يوجد حجوزات في هذا التاريخ
        </p>
      )}
    </div>
  );
}
