import DeleteButton from "@/app/components/DeleteButton";
import Link from "next/link";

async function getUser(id: string) {
    console.log('id: get', id);
    const res = await fetch(
        `http://localhost:3000/api/users/${id}`,
        { cache: "no-store" }
    );
    return res.json();
}

// async function deleteUser(id:string) {
//     const res = await fetch(
//         `http://localhost:3000/api/users/${id}`,
//         {method:"DELETE"}
//     )
//     return res.json();
// }
export default async function UserDetails({ params }: any) {
    const { id } = await params;
    const response = await getUser(id);
    // console.log('response: ', response);
    const user = response.data;
    console.log('user: ', user);
    return (
        <div className="p-10 flex flex-col justify-center items-center border-2 h-screen">
            <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p>Age: {user.age}</p>
                <p>Gender: {user.gender}</p>
                <p>Address: {user.address}</p>
                <p>Company: {user.company}</p>
                <p>Profile: {user.profile}</p>
            </div>
            <div className="flex gap-2">
                <DeleteButton id={user._id} />

            <Link href={`/users/create/${user._id}`}
            className="bg-green-600 text-white cursor-pointer px-4 py-2 mt-4">
                Edit User
            </Link>
            </div>
        </div>
    );
}