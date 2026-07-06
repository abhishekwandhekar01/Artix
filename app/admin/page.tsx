"use client";

import {
  Users,
  PhoneCall,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: 126,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Contacted",
    value: 72,
    icon: PhoneCall,
    color: "bg-yellow-500",
  },
  {
    title: "Demo Scheduled",
    value: 31,
    icon: CalendarCheck,
    color: "bg-purple-500",
  },
  {
    title: "Closed",
    value: 18,
    icon: BadgeCheck,
    color: "bg-green-500",
  },
];

const recentLeads = [
  {
    name: "Abhishek",
    hospital: "Apollo",
    status: "New",
  },
  {
    name: "Krishna",
    hospital: "Ruby Hall",
    status: "Contacted",
  },
  {
    name: "Rahul",
    hospital: "AIIMS",
    status: "Demo Scheduled",
  },
  {
    name: "Sneha",
    hospital: "Fortis",
    status: "Closed",
  },
];

const badge = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-700";
    case "Contacted":
      return "bg-yellow-100 text-yellow-700";
    case "Demo Scheduled":
      return "bg-purple-100 text-purple-700";
    case "Closed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100";
  }
};

export default function DashboardPage() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-1 mb-8">
        Welcome back 👋 Here's today's overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className={`${item.color} p-4 rounded-full text-white`}>
                  <Icon size={28} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white mt-10 rounded-xl shadow">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            Recent Leads
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Hospital</th>
              <th className="text-left p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {recentLeads.map((lead) => (

              <tr
                key={lead.name}
                className="border-b"
              >
                <td className="p-4">{lead.name}</td>
                <td className="p-4">{lead.hospital}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${badge(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}