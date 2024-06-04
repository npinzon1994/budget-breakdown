import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../index.css";
import Navbar from "src/components/Navigation/Navbar";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div id="modal-overlay"></div>
          <div id="root">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
