"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

async function getData(jwt: string, id: string) {
  const res = await fetch(`http://localhost:1337/api/products/${id}`, {
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
export default function Page(params: params) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const jwt = cookies.userjwt;
  const router = useRouter();
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    const data = getData(jwt, params.params.id).then((data) =>
      setBlog(data.data)
    );
  }, [jwt, params.params.id]);
  if (blog) {
    console.log("hi");
  }
  const blogHandler = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    console.log(title, body);
    if (!title || !body) {
      alert("Please enter a title");
      return;
    } else {
      const newBlog = {
        data: {
          title,
          body,
        },
      };
      // setIsDisabled(true);
      fetch(`http://localhost:1337/api/products/${params.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(newBlog),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          router.replace("/blog");
          router.refresh();
        });
    }
  };

  return (
    <div>
      {blog && (
        <form onSubmit={blogHandler} className="mt-8">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full py-2 px-3"
            type="text"
            name="title"
            id="title"
            value={blog.attributes.title}
            onChange={(e) =>
              setBlog({
                ...blog,
                attributes: { ...blog.attributes, title: e.target.value },
              })
            }
          />
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="body"
          >
            Body
          </label>
          <textarea
            className="border-none w-full py-2 px-3 "
            name="body"
            id="body"
            cols={30}
            rows={10}
            value={blog.attributes.body}
            onChange={(e) =>
              setBlog({
                ...blog,
                attributes: { ...blog.attributes, body: e.target.value },
              })
            }
          ></textarea>

          <input
            className="border border-black text-red-500 p-4 rounded-md shadow-md hover:bg-red-500 hover:text-white "
            type="submit"
            value="Submit"
          />
        </form>
      )}
    </div>
  );
}
