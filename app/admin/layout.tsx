"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't check auth on login page
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router, pathname]);

  // Login page should NOT show sidebar/navbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-72 flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}