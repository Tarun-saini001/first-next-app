"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OTP_FOR } from "../constants/otp";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    otp_type: OTP_FOR.REGISTER,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("OTP sent successfully");
                const expiresAt = Date.now() + 1 * 60 * 1000;

                localStorage.setItem(
                    "otpSession",
                    JSON.stringify({
                        email: form.email,
                        name: form.name,
                        password: form.password,
                        confirmPassword: form.confirmPassword,
                        otpType: OTP_FOR.REGISTER,
                        expiresAt,
                    })
                );

                router.push(
                    `/verify-otp`
                );
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (err) {
            toast.error("Server error", {
                id: "server-error"
            });
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-teal-200">
            <Toaster position="top-right" />
            <div className="w-full  max-w-md bg-white rounded-3xl my-8 shadow-xl p-8">


                <h1 className="text-2xl font-bold text-teal-600 mb-2">
                    Create account
                </h1>
                <p className="text-gray-500 mb-6">
                    Please enter your details
                </p>


                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* name */}
                    <div>
                        <label className="text-sm text-gray-600">Your name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>

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

                    {/* confirm password */}
                    <div>
                        <label className="text-sm text-gray-600">Repeat password</label>
                        <input
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Repeat password"
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 cursor-pointer rounded-lg mt-4 transition"
                    >
                        Register
                    </button>
                </form>


                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account?
                </p>

                <Link
                    href="/login"
                    className="block text-center mt-2 bg-gray-200 py-3 rounded-lg text-teal-700 font-medium hover:bg-gray-300"
                >
                    Login
                </Link>

            </div>
        </div>
    );
}