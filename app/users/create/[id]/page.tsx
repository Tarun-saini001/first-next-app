import CreateUserForm from "@/app/components/CreateUserForm";

async function getUser(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/users/${id}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function EditPage({ params }: any) {
  const { id } = await params;
  const response = await getUser(id);
  const user = response.data;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Edit User
      </h1>

      <CreateUserForm user={user} />
    </div>
  );
}