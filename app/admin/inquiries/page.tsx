"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function InquiriesPage() {

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await api.get("/inquiry");
      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading inquiries...
      </div>
    );
  }
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Lead Management
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Hospital</th>
              <th className="text-left p-4">City</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {inquiries.map((lead) => (

              <tr
                key={lead._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">{lead.name}</td>

                <td className="p-4">{lead.hospital}</td>

                <td className="p-4">{lead.city}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/inquiries/${lead._id}`}
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}