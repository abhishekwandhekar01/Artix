"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  hospital: string;
  city: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function InquiryDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchInquiry();
  }, []);

  const fetchInquiry = async () => {
    try {
      const res = await api.get(`/inquiry/${id}`);

      if (res.data.success) {
        setInquiry(res.data.data);
        setStatus(res.data.data.status);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch inquiry");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      setSaving(true);

      const res = await api.put(`/inquiry/${id}`, {
        status,
      });

      if (res.data.success) {
        toast.success("Status updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-8">
        Inquiry not found.
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Lead Details
      </h1>

      <div className="bg-white rounded-2xl shadow p-8 max-w-5xl">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">Name</p>
            <h2 className="font-semibold text-lg">
              {inquiry.name}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h2 className="font-semibold">
              {inquiry.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <h2 className="font-semibold">
              {inquiry.phone}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Hospital</p>
            <h2 className="font-semibold">
              {inquiry.hospital}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">City</p>
            <h2 className="font-semibold">
              {inquiry.city}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Created
            </p>

            <h2 className="font-semibold">
              {new Date(
                inquiry.createdAt
              ).toLocaleString()}
            </h2>
          </div>

        </div>

        <div className="mt-8">

          <p className="text-gray-500 mb-2">
            Message
          </p>

          <div className="rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap">
            {inquiry.message}
          </div>

        </div>

        <div className="mt-8">

          <label className="block mb-2 font-semibold">
            Lead Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded-lg px-4 py-3 w-72"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Demo Scheduled</option>
            <option>Closed</option>
          </select>

        </div>

        <button
          onClick={updateStatus}
          disabled={saving}
          className="mt-8 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition"
        >
          {saving ? "Updating..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
}