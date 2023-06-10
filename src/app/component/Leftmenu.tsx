import Link from "next/link";
import { getData } from "./Blogfetch";
import { cookies } from "next/headers";

export default async function Leftmenu() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("userjwt");
  const data = await getData(jwt?.value);
  return (
    <div className="w-screen m-96 max-h-full flex">
      <div className="flex flex-col justify-center items-center border-r border-black m-4 p-4">
        {data &&
          data.data.map((item: Blog) => (
            <Link href={`/blog/${item.id}`} key={item.id} className="w-max">
              <div key={item.id}>
                <h1>{item.attributes.title}</h1>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
