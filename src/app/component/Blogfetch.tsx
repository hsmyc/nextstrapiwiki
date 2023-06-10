import { cookies } from "next/headers";

export async function getData(jwt: string | undefined) {
  const res = await fetch("http://localhost:1337/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
