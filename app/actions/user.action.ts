"use server";

import connectDB from "../lib/db";
import { User } from "@/app/lib/models/user"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUserAction(formData: FormData) {
    await connectDB();
    console.log('formData: ', formData);

    const data = {
        name: formData.get("name"),
        age: Number(formData.get("age")),
        gender: formData.get("gender"),
        address: formData.get("address"),
        company: formData.get("company"),
        profile:formData.get("profile")
    }

    console.log('data: ', data);
    const yser =await User.create(data)
    console.log('yser: ', yser);
    revalidatePath("/");
    redirect("/ ")
}


export async function deleteUserAction(id: string) {
  await connectDB();

  await User.findByIdAndDelete(id);

  revalidatePath("/"); 
  redirect("/");     
}


export async function updateUserAction(formData: FormData) {
  await connectDB();

  const id = formData.get("id");

  const data = {
    name: formData.get("name"),
    age: Number(formData.get("age")),
    gender: formData.get("gender"),
    address: formData.get("address"),
    company: formData.get("company"),
  };

  await User.findByIdAndUpdate(id, data);

  revalidatePath("/");
  redirect("/");
}