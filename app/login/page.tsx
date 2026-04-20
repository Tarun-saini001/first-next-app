"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Login successful");

                router.push("/");
                router.refresh();
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-teal-200">
            <Toaster position="top-right" />
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">


                <h1 className="text-2xl font-bold text-teal-600 mb-2">
                    Login
                </h1>
                <p className="text-gray-500 mb-6">
                    Enter your credentials
                </p>


                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* email */}
                    <div>
                        <label className="text-sm text-gray-600">Your email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

                    {/* password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg mt-4 transition"
                    >
                        Login
                    </button>
                </form>


                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>
                        Don’t have an account?
                    </p>

                    <Link
                        href="/register"
                        className="block mt-2 bg-gray-200 py-3 rounded-lg text-teal-700 font-medium hover:bg-gray-300"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}