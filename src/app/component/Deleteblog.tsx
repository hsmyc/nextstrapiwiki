"use client";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export async function deleteData(jwt: string | undefined, id: string) {
  const res = await fetch(`http://localhost:1337/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default async function Deletedata({ params }: { params: params }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const jwt = cookies.userjwt;
  const router = useRouter();
  console.log("hi");
  const blogDeleteHandler = async () => {
    try {
      const data = await deleteData(jwt, params.id);
      console.log(data);
      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={blogDeleteHandler}
        className="border border-black text-red-500 p-4 rounded-md shadow-md hover:bg-red-500 hover:text-white "
      >
        Delete
      </button>
    </div>
  );
}
