"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getFactoryServices } from "@/actions/service/service";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function FactoryReservationTable() {
  const { data } = useQuery({
    queryKey: ["factory-reservations"],
    queryFn: async () => await getFactoryServices(),
  });

  console.log(data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">جدول حجوزات التصنيع</h2>
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <Table dir="rtl">
          <TableHeader>
            <TableRow dir="rtl" className="text-right">
              <TableHead>الإسم</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead>اسم الجهاز</TableHead>
              <TableHead>المستوي</TableHead>
              <TableHead>إسم المؤسسة</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>الملف</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) &&
              data?.map((factory) => (
                <TableRow key={factory._id}>
                  <TableCell className="font-medium">{factory.name}</TableCell>
                  <TableCell>{factory.description}</TableCell>
                  <TableCell>{factory.device}</TableCell>
                  <TableCell>{factory.level}</TableCell>
                  <TableCell>{factory.organization}</TableCell>
                  <TableCell>{factory.phone}</TableCell>

                  <TableCell>
                    <a href={factory.file} target="_blank">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        التحميل
                      </Button>
                    </a>
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
