import DashBoardLayout from "@/common/dashboardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
