"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Users,
  PhoneCall,
  CalendarCheck,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

type DashboardStats = {
  total: number;
  newLeads: number;
  contacted: number;
  demoScheduled: number;
  closed: number;
};

type Inquiry = {
  _id: string;
  name: string;
  hospital: string;
  status: string;
};

const badge = (status: string) => {
  switch (status) {
    case "New":
      return "bg-cyan-100 text-cyan-700";

    case "Contacted":
      return "bg-yellow-100 text-yellow-700";

    case "Demo Scheduled":
      return "bg-purple-100 text-purple-700";

    case "Closed":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    newLeads: 0,
    contacted: 0,
    demoScheduled: 0,
    closed: 0,
  });

  const [recentLeads, setRecentLeads] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.get("/inquiry/dashboard"),
        api.get("/inquiry"),
      ]);

      setStats(statsRes.data.data);

      setRecentLeads(leadsRes.data.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Users,
      gradient: "from-cyan-500 to-sky-500",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      icon: PhoneCall,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Demo Scheduled",
      value: stats.demoScheduled,
      icon: CalendarCheck,
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Closed",
      value: stats.closed,
      icon: BadgeCheck,
      gradient: "from-emerald-500 to-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="py-20 text-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div>

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
          Overview
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Welcome back 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Here's a quick overview of your CRM today.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-3xl border border-white bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-4xl font-bold text-slate-900">
                    {card.value}
                  </h3>

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${card.gradient} text-white shadow-lg`}
                >
                  <Icon size={30} />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-600">

                <ArrowUpRight size={16} />

                Live Data

              </div>

            </div>
          );
        })}

      </div>

      {/* Recent Leads */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Recent Leads
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest enquiries received from clinics.
            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Hospital
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-t transition hover:bg-cyan-50/50"
                >

                  <td className="px-6 py-5 font-medium">
                    {lead.name}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {lead.hospital}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}