"use client";

import {
  Bell,
  UserCircle2,
  Menu,
} from "lucide-react";

import { usePathname } from "next/navigation";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({
  toggleSidebar,
}: NavbarProps) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";

    if (pathname.startsWith("/admin/inquiries"))
      return "Lead Management";

    if (pathname.startsWith("/admin/settings"))
      return "Settings";

    return "Admin Panel";
  };

  const getSubtitle = () => {
    if (pathname === "/admin")
      return "Monitor your CRM and recent activities.";

    if (pathname.startsWith("/admin/inquiries"))
      return "Manage enquiries received from clinics.";

    return "ARTIX Admin Portal";
  };

  return (
    <header className="sticky top-3 z-30 flex h-16 md:h-20 items-center justify-between rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 px-4 md:px-6 shadow-lg backdrop-blur-xl">

      {/* Left */}

      <div className="flex items-center gap-3">

        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>

          <h1 className="text-2xl md:text-3xl font-bold leading-none text-slate-900">
            {getTitle()}
          </h1>

          <p className="mt-1 hidden md:block text-sm text-slate-500">
            {getSubtitle()}
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2 md:gap-4">

        {/* Search */}

        

        {/* Notification */}

        <button className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50">

          <Bell
            size={18}
            className="text-slate-600 md:h-5 md:w-5"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        {/* Profile */}

        <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

          <UserCircle2
            size={40}
            className="text-teal-600"
          />

          <div>

            <h3 className="font-semibold text-slate-800">
              Admin
            </h3>

            <p className="text-xs text-slate-500">
              admin@artix.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}