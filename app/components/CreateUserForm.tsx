"use client";

import { useRouter } from "next/navigation";
import { createUserAction } from "../actions/user.action";

export default function CreateUserForm() {
    const router = useRouter();


    return (
        <form action={createUserAction} className="space-y-3">
            <input name="name" placeholder="Name" className="border p-2 w-full" />
            <input name="age" placeholder="Age" className="border p-2 w-full" />
            <input name="gender" placeholder="Gender" className="border p-2 w-full" />
            <input name="address" placeholder="Address" className="border p-2 w-full" />
            <input name="company" placeholder="Company" className="border p-2 w-full" />
            <input name="profile" placeholder="Profile" className="border p-2 w-full" />

            <button className="bg-green-600 text-white px-4 py-2">
                Create
            </button>
        </form>
    );
}