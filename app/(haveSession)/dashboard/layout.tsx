import AutoAlert from "@/component/common/AutoAlert/AutoAlert";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import RecoilRootProvider from "@/provider/RecoilProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/component/Layout/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
