/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteWorkshop, getWorkshops } from "@/actions/workshop/workshop";
import toast from "react-hot-toast";

export default function WorkshopsTable() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["workshops"],
    queryFn: async () => await getWorkshops(),
  });

  const {
    mutate,
    isPending: isDeleting,
    data: deletedWorkshop,
    isSuccess,
  } = useMutation({
    mutationKey: ["delete-workshop"],
    mutationFn: async (id: string) => await deleteWorkshop(id),
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(deletedWorkshop?.message);
      refetch();
    }
  }, [isSuccess, refetch, deletedWorkshop]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">قائمة الورشات</h1>
      {isLoading && (
        <div>
          <Loader2 className="animate-spin size-5" />
        </div>
      )}
      <Table dir="rtl">
        <TableHeader dir="rtl">
          <TableRow dir="rtl">
            <TableHead className="text-right">اسم الورشة</TableHead>
            <TableHead className="w-[100px] text-start">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((workshop: any) => (
            <TableRow key={workshop._id}>
              <TableCell className="font-medium">{workshop.name}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(workshop._id)}
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
