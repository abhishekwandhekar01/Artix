"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    toast.success("Welcome back!");

    router.push("/admin");
  } catch (err: any) {
    toast.error(
      err.response?.data?.message || "Invalid Credentials"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">

          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">

              <ShieldCheck className="text-white" size={34} />

            </div>

          </div>

          <h1 className="text-3xl font-bold text-center">
            ARTIX CRM
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Cloud IVF Management System
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="text-sm font-medium">
                Email
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  placeholder="admin@artix.com"
                  className="ml-3 w-full outline-none bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            <div>

              <label className="text-sm font-medium">
                Password
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="ml-3 w-full outline-none bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

            </div>

            <button
              className="w-full bg-teal-600 hover:bg-teal-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-sm text-gray-500">
              Protected Admin Access
            </p>

            <p className="text-xs text-gray-400 mt-2">
              © 2026 ARTIX Technologies
            </p>

          </div>

        </div>

      </div>

    </>
  );
}