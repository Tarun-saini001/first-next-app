import connectDB from "@/app/lib/db";
import { 
    getUserById,
    updateUser,
    deleteUser
} from "@/app/services/user.service"
import { NextBuildContext } from "next/dist/build/build-context";
import { NextResponse } from "next/server";

export async function GET(_:Request,{params}:any) {
    await connectDB();
    const user = await getUserById(params.id);
    return NextResponse.json({message:"User Fetched Successfully",data:user})
}

export async function PUT(req:Request,{params}:any) {
    await connectDB();
    const body = await req.json();
    const user = await updateUser(params.id,body);
    return NextResponse.json({message:"User Updated Successfully",data:user});
}

export async function DELET(_:Request,{params}:any) {
    await connectDB();
    await deleteUser(params.id);
    return NextResponse.json({message:"User Deleted Successfully"})
}