"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonitorSmartphone, Plus, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const routes = [
  {
    name: "الأجهزة",
    href: "/dashboard/devices",
    icon: <MonitorSmartphone />,
  },
  {
    name: "إضافة جهاز",
    href: "/dashboard/devices/add",
    icon: <Plus />,
  },
  {
    name: "الورش المتاحة",
    href: "/dashboard/workshops",
    icon: <UserRoundSearch />,
  },
  {
    name: "اضافة ورشة",
    href: "/dashboard/workshops/add",
    icon: <Plus />,
  },
  {
    name: "حجوزات الورش",
    href: "/dashboard/workshops/reservations",
  },
  {
    name: "حجوزات الأجهزة",
    href: "/dashboard/devices/reservations",
  },
  {
    name: "حجوزات التصنيع",
    href: "/dashboard/factory/reservations",
  },
];

export function DashNav() {
  const router = useRouter();

  const handleRoute = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-full my-5">
      <Select dir="rtl" onValueChange={handleRoute}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="لوحة التنقل" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>الأجهزة</SelectLabel>
            {routes.slice(0, 2).map((route) => (
              <Link href={route.href} key={route.href}>
                <SelectItem value={route.href}>
                  <div className="flex items-center gap-2">
                    <span>{route.icon}</span>
                    {route.name}
                  </div>
                </SelectItem>
              </Link>
            ))}
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>الورش</SelectLabel>
            {routes.slice(2, 4).map((route) => (
              <Link href={route.href} key={route.href}>
                <SelectItem value={route.href}>
                  <div className="flex items-center gap-2">
                    <span>{route.icon}</span>
                    {route.name}
                  </div>
                </SelectItem>
              </Link>
            ))}
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>حجوزات</SelectLabel>
            {routes.slice(4, 7).map((route) => (
              <Link href={route.href} key={route.href}>
                <SelectItem value={route.href}>
                  <div className="flex items-center gap-2">
                    <span>{route.icon}</span>
                    {route.name}
                  </div>
                </SelectItem>
              </Link>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
