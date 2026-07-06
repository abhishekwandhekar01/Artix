"use client";

import { Bell, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold">
          ARTIX CRM
        </h1>

        <p className="text-sm text-gray-500">
          Lead Management Dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell className="text-gray-600" size={22} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle2
            size={38}
            className="text-teal-600"
          />

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              admin@artix.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}