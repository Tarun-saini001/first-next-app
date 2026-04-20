import connectDB from "@/app/lib/db";
import { OTP } from "@/app/lib/models/otp";
import { User } from "@/app/lib/models/user";
import { OTP_FOR } from "@/app/constants/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, otp, otp_type, name, password, confirmPassword } = await req.json();

        const otpRecord = await OTP.findOne({
            email,
            type: otp_type,
        });

        if (!otpRecord) {
            return NextResponse.json(
                { message: "Invalid OTP" },
                { status: 400 }
            );
        }

        if (otpRecord.expiresAt < new Date()) {
            return NextResponse.json(
                { message: "OTP expired" },
                { status: 400 }
            );
        }

        switch (Number(otp_type)) {
            case OTP_FOR.REGISTER: {
                if (password !== confirmPassword) {
                    return NextResponse.json({ message: "Password do not match" }, { status: 400 })
                }
                const existingUser = await User.findOne({ email });
                if (!existingUser) {
                    return NextResponse.json({ message: "User Not Found", data: {} }, { status: 400 })
                }
                const hashedPassword = await bcrypt.hash(password, 10);

                await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    isVerified: true
                });


                await OTP.deleteOne({ _id: otpRecord._id });
                return NextResponse.json({ message: "User verified successfully" }, { status: 200 })
            }
            case OTP_FOR.LOGIN:
            case OTP_FOR.FORGOT_PASSWORD: {
                const existingUser = await User.findOne({ email });
                if (!existingUser) {
                    return NextResponse.json({ message: "User Not Found", data: {} }, { status: 400 })
                }
            }
        }

    } catch (error) {
        console.log("Verify OTP error:", error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}