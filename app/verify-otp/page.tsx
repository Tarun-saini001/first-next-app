"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyOtpPage() {
    const router = useRouter();

    const storedSession =
        typeof window !== "undefined"
            ? localStorage.getItem("otpSession")
            : null;

    const {
        email,
        name,
        password,
        confirmPassword,
        otpType,
        expiresAt,
    } = storedSession ? JSON.parse(storedSession) : {};

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);


    useEffect(() => {
        if (!storedSession) {
            router.push("/register");
        }
    }, []);

    // timer
    useEffect(() => {
        if (!expiresAt) return;

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.floor((expiresAt - Date.now()) / 1000)
            );
            setTimeLeft(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    
    useEffect(() => {
        if (timeLeft === 0 && expiresAt) {
            localStorage.removeItem("otpSession");
            toast.error("OTP expired");
            router.push("/register");
        }
    }, [timeLeft]);

   
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        setOtp(value);

        if (value.length < 6) {
            setError("OTP must be 6 digits");
        } else {
            setError("");
        }
    };

    // verify OTP
    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("OTP must be 6 digits");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp,
                    otp_type: otpType,
                    name,
                    password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.removeItem("otpSession");
                toast.success("Account verified successfully");
                router.push("/login");
            } else {
                setError(data.message);
                toast.error(data.message,{
                    id:"register-failed"
                });
            }
        } catch {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-teal-200">
            <Toaster position="top-right" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                
                <h1 className="text-2xl font-bold text-teal-600 mb-2">
                    Verify OTP
                </h1>

                <p className="text-gray-500 mb-4">
                    OTP sent to <span className="font-semibold">{email}</span>
                </p>


                {/* Input */}
                <div className="space-y-2">
                    <input
                        value={otp}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="Enter OTP"
                        className="w-full p-3 rounded-lg bg-gray-100 text-center text-lg"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                </div>

                {/* timer */}
                <p className="text-sm text-red-500 mb-4">
                    {timeLeft > 0
                        ? `Expires in ${formatTime(timeLeft)}`
                        : "OTP expired"}
                </p>

                
                <button
                    onClick={handleVerify}
                    disabled={loading || otp.length !== 6 || timeLeft === 0}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg mt-5 disabled:bg-gray-400"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
}