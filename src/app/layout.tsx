import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import Layout from "@/components/Layout";
import ReactQueryProvider from "@/react-query/provider";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: ":)) - Shopping Best Deals & Prices",
  description: "Shopping Best Deals & Prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ReactQueryProvider>
            <Layout>{children}</Layout>
          </ReactQueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
