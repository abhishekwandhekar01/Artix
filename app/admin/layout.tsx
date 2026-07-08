"use client";

import { useEffect, useState } from "react";
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router, pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex-1 lg:ml-64 p-4">

        <Navbar
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="mt-4 rounded-3xl">
          {children}
        </main>

      </div>

    </div>
  );
}