import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";

//import ReduxProvider from "@/app/redux/provider";

const DynamicContextProvider = dynamic(
  () => import("@/app/redux/provider").then((ctx) => ctx.default),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "SaveEcoBot",
  description: "SaveEcoBot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <DynamicContextProvider>
          <Header />
          <main className="flex min-h-[calc(100%-70px)]">
            <Sidebar />
            {children}
          </main>
          <ToastContainer autoClose={2000} />
        </DynamicContextProvider>
      </body>
    </html>
  );
}
