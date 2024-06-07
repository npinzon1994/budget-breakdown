import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import "../index.css";
import Navbar from "src/components/Navigation/Navbar";
import StoreProvider from "./StoreProvider";

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
      <StoreProvider>
        <html lang="en">
          <body>
            <Navbar />
            <div id="modal-overlay" />
            <div id="root">{children}</div>
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
