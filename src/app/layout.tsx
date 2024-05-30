import type { Metadata } from "next"
import "../index.css";

export const metadata: Metadata = {
    title: "Budget Breakdown",
    description: "Manage your credit card expenses with ease"
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <html lang="en">
    <head>
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="theme-color" content="#000000" />
      
      <meta property="og:title" content="Budget Breakdown"/>
      <meta property="og:description" content="Manage your credit card expenses with ease"/>
  
      <meta name="twitter:title" content="Budget Breakdown"/>
      <meta name="twitter:description" content="Manage your credit card expenses with ease"/>
      
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    </head>
    <body>
      <div id="modal-overlay"></div>
      <div id="root">{children}</div>
    </body>
  </html>
  }