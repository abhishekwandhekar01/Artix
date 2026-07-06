"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Lead Management",
    href: "/admin/inquiries",
    icon: Users,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg">

            <ShieldCheck size={26} />

          </div>

          <div>

            <h1 className="font-bold text-xl">
              ARTIX CRM
            </h1>

            <p className="text-slate-400 text-sm">
              Admin Portal
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 px-5 py-6">

        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
          MAIN MENU
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300

                ${
                  active
                    ? "bg-teal-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={21} />

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>
            );
          })}

        </div>

      </div>

      {/* Profile */}

      <div className="border-t border-slate-800 p-6">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center font-bold text-lg">

            A

          </div>

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-slate-400 text-sm">
              admin@artix.com
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition rounded-xl py-3"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}