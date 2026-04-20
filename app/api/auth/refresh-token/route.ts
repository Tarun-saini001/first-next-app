import connectDB from "@/app/lib/db";
import { RefreshToken } from "@/app/lib/models/refreshToken";
import { User } from "@/app/lib/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@/app/lib/utils/jwt";

export async function POST(req: Request) {
    try {
        await connectDB();

        const refreshToken = req.headers
            .get("cookie")
            ?.split("refreshToken=")[1];

        if (!refreshToken) {
            return NextResponse.json(
                { message: "No refresh token" },
                { status: 401 }
            );
        }

        const decoded: any = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET as string
        );

        const tokenDoc = await RefreshToken.findOne({
            token: refreshToken,
        });

        if (!tokenDoc) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 403 }
            );
        }

        if (tokenDoc.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ _id: tokenDoc._id });

            return NextResponse.json(
                { message: "Token expired" },
                { status: 403 }
            );
        }

        const user = await User.findById(decoded.id);

        
        await RefreshToken.deleteOne({ _id: tokenDoc._id });

        const newRefreshToken = generateRefreshToken(user);
        const newAccessToken = generateAccessToken(user);

        await RefreshToken.create({
            token: newRefreshToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        const res = NextResponse.json({
            message: "Token refreshed",
        },{status:200});

        res.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 15 * 60,
        });

        res.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60,
        });

        return res;

    } catch (error) {
        console.log("Refresh error:", error);

        return NextResponse.json(
            { message: "Invalid refresh token" },
            { status: 403 }
        );
    }
}