"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Save,
} from "lucide-react";

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
      console.log(err);
      toast.error("Failed to fetch inquiry");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      setSaving(true);

      const res = await api.patch(`/inquiry/${id}`, {
        status,
      });

      if (res.data.success) {
        toast.success("Status Updated");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="py-24 text-center">
        Inquiry not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
          Lead Details
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          {inquiry.name}
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage this enquiry.
        </p>

      </div>

      {/* Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-xl font-bold">
          Contact Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <InfoCard icon={<User size={18} />} title="Name" value={inquiry.name} />

          <InfoCard icon={<Mail size={18} />} title="Email" value={inquiry.email} />

          <InfoCard icon={<Phone size={18} />} title="Phone" value={inquiry.phone} />

          <InfoCard
            icon={<Building2 size={18} />}
            title="Hospital"
            value={inquiry.hospital}
          />

          <InfoCard icon={<MapPin size={18} />} title="City" value={inquiry.city} />

          <InfoCard
            icon={<Calendar size={18} />}
            title="Created"
            value={new Date(inquiry.createdAt).toLocaleString()}
          />

        </div>

      </div>

      {/* Message */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <FileText className="text-cyan-600" size={20} />

          <h2 className="text-xl font-bold">
            Message
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6 whitespace-pre-wrap leading-7 text-slate-700">

          {inquiry.message || "No message provided."}

        </div>

      </div>

      {/* Status */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-xl font-bold">
          Lead Status
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Demo Scheduled</option>
            <option>Closed</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3 font-semibold text-white transition hover:scale-105 disabled:opacity-50"
          >

            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <div className="mb-3 flex items-center gap-2 text-cyan-600">

        {icon}

        <span className="text-sm font-semibold">
          {title}
        </span>

      </div>

      <p className="break-words text-lg font-semibold text-slate-900">
        {value}
      </p>

    </div>
  );
}