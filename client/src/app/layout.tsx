import type { Metadata } from "next";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Banking App",
  description: "Created by pawandai",
};

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(), // cache is used to store the data that is fetched from the server.
  credentials: "include", // send cookies with every request.
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} font-medium`}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
