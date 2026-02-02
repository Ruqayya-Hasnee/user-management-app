import "./globals.css";
import { ReactNode } from "react";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  title: "User Management App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
