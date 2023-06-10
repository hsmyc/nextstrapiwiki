"use client";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
export default function Page() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const removeHandler = () => {
    removeCookie("user");
    removeCookie("username");
    removeCookie("userjwt");
    router.replace("/");
    router.refresh();
  };

  return (
    <div>
      <button
        className=" text-red-500 border border-black p-2 rounded-md shadow-md hover:bg-red-500 hover:text-white"
        onClick={removeHandler}
      >
        Logout
      </button>
    </div>
  );
}
