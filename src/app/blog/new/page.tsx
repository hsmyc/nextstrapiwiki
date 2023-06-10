"use client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Chatbot from "@/app/chatbot/page";
export default function Page({}) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const jwt = cookies.userjwt;
  const [blog, setBlog] = useState({
    data: {
      title: "",
      body: "",
    },
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const blogHandler = () => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

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

      setBlog(newBlog);
      setIsDisabled(true);
      fetch("http://localhost:1337/api/products", {
        method: "POST",
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
          router.push("/blog");
          router.refresh();
        });
    }
  };

  return (
    <div>
      <form onSubmit={blogHandler} className=" px-8 pt-6 pb-8 mb-4">
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
        ></textarea>
        <button
          className="border border-black text-red-500 p-4 rounded-md shadow-md hover:bg-red-500 hover:text-white "
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
      <Chatbot />
    </div>
  );
}
