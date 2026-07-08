"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
import api from "@/lib/axios";

type Inquiry = {
  _id: string;
  name: string;
  hospital: string;
  city: string;
  status: string;
  email: string;
  phone: string;
  createdAt: string;
};

const statusColor = (status: string) => {
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

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch whenever search/status changes
  useEffect(() => {
    fetchInquiries();
  }, [search, status]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const res = await api.get("/inquiry", {
        params: {
          search,
          status,
        },
      });

      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      

      {/* Filters */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, hospital, city, email or phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500"
            />

          </div>

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 outline-none"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Demo Scheduled</option>
              <option>Closed</option>
            </select>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[850px] w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Hospital</th>
                <th className="px-6 py-4 text-left">City</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500"
                  >
                    Loading...
                  </td>

                </tr>

              ) : inquiries.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500"
                  >
                    No Leads Found.
                  </td>

                </tr>

              ) : (

                inquiries.map((lead) => (

                  <tr
                    key={lead._id}
                    className="border-t transition hover:bg-cyan-50/50"
                  >

                    <td className="px-6 py-5 font-medium">
                      {lead.name}
                    </td>

                    <td className="px-6 py-5">
                      {lead.hospital}
                    </td>

                    <td className="px-6 py-5">
                      {lead.city}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <Link
                        href={`/admin/inquiries/${lead._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-105"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}