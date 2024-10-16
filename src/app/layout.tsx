import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "@/theme/provider";
import AppLayout from "@/common/appLayout";
import ClientProvider from "@/components/ClientProvider";
import QueryProvider from "@/components/QueryProvider";
import SessionProviders from "@/components/SessionProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZeeInvoices: Custom and Smart Invoices Free and Easy",
  description:
    "Create professional, personalized invoices effortlessly with ZeeInvoices, Free AI-powered Custom invoice generator. Perfect for businesses of all sizes, fast and easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviders>
          <MuiThemeProvider>
            <ClientProvider>
              <QueryProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
                <AppLayout>{children}</AppLayout>
              </QueryProvider>
            </ClientProvider>
          </MuiThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
