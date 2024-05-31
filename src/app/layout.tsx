import type { Metadata } from "next";
import "../index.css";

const title = "Budget Breakdown";
const description = "Manage your credit card expenses with ease";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="modal-overlay"></div>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
