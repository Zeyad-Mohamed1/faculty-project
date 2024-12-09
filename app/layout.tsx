import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import StoreProvider from "@/components/shared/store-provider";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "مركز سلام للبحث والابتكار التقني",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        <StoreProvider>
          <Toaster position="top-right" />
          <NavBar />
          <main className="">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
