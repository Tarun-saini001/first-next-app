import Link from 'next/link'
type User = {
  _id: string;
  name: string;
  company: string;
};

type UsersResponse = {
  message: string;
  data: User[];
};

async function getUsers(): Promise<UsersResponse> {
  const res = await fetch("http://localhost:3000/api/users")
  // console.log('res: ', res);
  return res.json();
}
export default async function Home() {
  const response = await getUsers();
  const users = response.data;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className=' w-full flex justify-center items-center mb-2 '>
        <Link
          href="/login"
          className=" bg-teal-600 hover:bg-teal-700 text-white  py-3 px-3 rounded-lg transition"
        >
          Login
        </Link>
      </div>
      <div className="flex justify-between mb-4 w-[48%]">
        <h1 className="text-3xl font-bold text-gray-800">
          Users List
        </h1>

        <Link
          href="/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create User
        </Link>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">





        <div className="space-y-2">
          <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 border-b pb-2 mb-3">
            <p>Name</p>
            <p>Company</p>
            <p className="text-right">Details</p>
          </div>
          {users.map((user: User) => (
            <div
              key={user._id}
              className="grid grid-cols-3 items-center p-3 rounded-lg bg-gray-50 hover:shadow-md transition"
            >
              <p className="text-gray-900 font-medium">
                {user.name}
              </p>

              <p className="text-gray-600 text-sm">
                {user.company}
              </p>
              <Link href={`/users/${user._id}`}
                className="text-right text-blue-600 text-sm font-medium hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}