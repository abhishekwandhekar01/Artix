"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

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
];

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    router.push("/admin/login");
  };

  return (
    <aside
  className={`
fixed
top-0
left-0
z-50

h-screen
w-64

flex
flex-col

bg-gradient-to-b
from-[#0F2E42]
to-[#112240]

shadow-2xl
transition-transform
duration-300

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
>

      {/* Logo */}

      <div className="border-b border-white/10 px-8 py-8">

        <Image
          src="/images/artixlogo.png"
          alt="ARTIX"
          width={130}
          height={40}
        />

        <p className="mt-3 text-sm text-slate-300">
          Admin Portal
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-4 py-8">

        <div className="space-y-3">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300

${
active
? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-xl"
: "text-slate-300 hover:bg-white/10 hover:text-white"
}
`}
              >

                <Icon
                  size={20}
                  className="group-hover:scale-110 transition"
                />

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="mt-auto border-t border-white/10 p-6">

        <div className="mb-6 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 font-bold shadow-lg">

            A

          </div>

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-slate-400">
              admin@artix.com
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-red-300 transition hover:bg-red-500 hover:text-white"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}