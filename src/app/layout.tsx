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
import Script from "next/script";
import CustomHooks from "@/utils/CustomHooks";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://zeeinvoices.com";

export const metadata: Metadata = {
  title: {
    default: "ZeeInvoices: Custom and Smart Invoices Free and Easy",
    template: "%s - ZeeInvoices",
  },
  description:
      "Create professional, personalized invoices effortlessly with ZeeInvoices, Free AI-powered Custom invoice generator. Perfect for businesses of all sizes, fast and easy.",
  openGraph: {
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        alt: "ZeeInvoices AI-powered Invoice Generator",
      },
    ],
    type: "website",
    siteName: "ZeeInvoices",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        {/* Google Ads Tracking Code */}
        <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-05BL6M7BW1"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-05BL6M7BW1');
          `}
        </Script>
        <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-11380785487"
        />
        <Script id="google-ads">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11380785487');
          `}
        </Script>
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "ZeeInvoices",
            address: {
              "@type": "PostalAddress",
              streetAddress: "144/2, Block B, Bankers Society",
              addressLocality: "Lahore",
              addressRegion: "Lahore",
              postalCode: "12345",
            },
            telephone: "+92-3008542811",
            openingHours: "Mo-Fr 10:00-19:00",
          })}
        </Script>
      </head>
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
                  theme="light"
                  toastClassName="custom-toast"
                  bodyClassName="custom-toast-body"
                  // progressClassName="custom-progress-bar"
              />
              <CustomHooks />
              <AppLayout>{children}</AppLayout>
            </QueryProvider>
          </ClientProvider>
        </MuiThemeProvider>
      </SessionProviders>
      </body>
      </html>
  );
}
