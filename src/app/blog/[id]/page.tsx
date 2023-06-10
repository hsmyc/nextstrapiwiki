import Link from "next/link";
import { cookies } from "next/headers";
import { getData } from "../../component/Blogfetch";
import Deletedata from "../../component/Deleteblog";

export default async function Page({ params }: { params: params }) {
  const cookieStore = cookies();
  const jwt = cookieStore.get("userjwt");
  const blogs = await getData(jwt?.value);

  return (
    <div>
      {blogs.data
        .filter((blog: Blog) => blog.id == params.id)
        .map((blog: Blog) => (
          <div
            key={blog.id}
            className="flex flex-col justify-center items-center border border-black rounded-md shadow-md m-4 p-4"
          >
            <h1 className="text-2xl">{blog.attributes.title}</h1>
            <p>{blog.attributes.body}</p>
            <Link
              href={`/blog/${blog.id}/edit`}
              className="border border-black rounded-md p-4 m-4"
            >
              Edit
            </Link>
          </div>
        ))}
      {/* @ts-expect-error Server Component */}
      <Deletedata params={params} />
    </div>
  );
}
