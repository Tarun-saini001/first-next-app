import connectDB from "@/app/lib/db";
import { User } from "@/app/lib/models/user";
import { OTP_FOR } from "@/app/constants/otp";
import { NextResponse } from "next/server";
import next from "next";
import { OTP } from "@/app/lib/models/otp";

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, otp_type } = await req.json();
        switch (Number(otp_type)) {
            case OTP_FOR.REGISTER: {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return NextResponse.json({ message: "User Already Registerd" }, { status: 400 });
                }
                 break;
            }
            case OTP_FOR.LOGIN: {
                const existingUser = await User.findOne({ email });
                if (!existingUser) {
                    return NextResponse.json({ message: "User Not Found", data: {} }, { status: 400 })
                }
                 break;
            }
            case OTP_FOR.FORGOT_PASSWORD: {
                const existingUser = await User.findOne({ email });
                if (!existingUser) {
                    return NextResponse.json({ message: "User Not Found", data: {} }, { status: 400 })
                }
                 break;
            }
            default:{
                return  NextResponse.json({message:"Invalid Otp Type"},{status:400})
            }
        }

        const otp = generateOTP();
        console.log('otp: ', otp);
        await OTP.findOneAndUpdate({email,type:otp_type},
            {
                $set:{
                    email,
                    otp,
                    type:otp_type,
                    expiresAt: new Date(Date.now()+60*1000)
                }
            },
            {
                upsert:true,
                returnDocument:"after"
            }
        )
        console.log("OTP:", otp);
        return NextResponse.json({
            message:"OTP sent successfully"
        },{status:200})
    } catch (error) {
        console.log('failed to reister', error);
          return NextResponse.json(
                    { message: "Something went wrong" },
                    { status: 500 }
                );
    }
}