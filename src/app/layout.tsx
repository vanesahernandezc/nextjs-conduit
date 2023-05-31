import "./globals.css";
import "@/app/page.module.css";
//Refreshing many times
//TODO: Dynamic title
export const metadata = {
  title: "Conduit",
  description: "A place to share your knowledge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
