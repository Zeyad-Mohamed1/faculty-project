import { DashNav } from "@/components/dashboard/dash-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-[90%] mx-auto">
      <DashNav />
      {children}
    </div>
  );
}
