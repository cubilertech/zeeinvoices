import AppLayout from "@/common/appLayout";
import MuiThemeProvider from "@/theme/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
