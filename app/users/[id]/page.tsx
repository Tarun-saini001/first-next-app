async function getUser(id: string) {
    console.log('id: get', id);
    const res = await fetch(
        `http://localhost:3000/api/users/${id}`,
        { cache: "no-store" }
    );
    return res.json();
}

export default async function UserDetails({ params }: any) {
    const { id } = await params;
    const response = await getUser(id);
    // console.log('response: ', response);
    const user = response.data;
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Address: {user.address}</p>
            <p>Company: {user.company}</p>
            <p>Profile: {user.profile}</p>
        </div>
    );
}