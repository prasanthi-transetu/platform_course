import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "LMS Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 m-0 p-0">{children}</body>
    </html>
  );
}

