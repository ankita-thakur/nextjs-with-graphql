"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apollo-client";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from 'next/navigation'
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!isAuthenticated()) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <AuthProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <ApolloProvider client={client}>
            {loading ? <Loader /> : children}
          </ApolloProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
