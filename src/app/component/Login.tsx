"use client";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
export default function Page() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const cookiesetHandler = (
    user: boolean,
    username: string,
    userjwt: string
  ) => {
    setCookie("user", user);
    setCookie("username", username);
    setCookie("userjwt", userjwt);
    router.replace("/");
    router.refresh();
  };

  const loginHandler = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    const identifier = document.getElementById("identifier")?.value;
    const password = document.getElementById("password")?.value;

    if (!identifier || !password) {
      alert("Please enter a username");
      return;
    } else {
      const userLog = {
        identifier,
        password,
      };
      fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLog),
      })
        .then((response) => response.json())
        .then((data) => cookiesetHandler(true, data.user.username, data.jwt))
        .catch((error) => console.error("Error:", error));
    }
  };
  return (
    <div>
      <form
        onSubmit={loginHandler}
        className="flex flex-col w-fit h-auto m-5 p-5 border border-black text-black"
      >
        <input
          type="text"
          name="email"
          id="identifier"
          className="border border-blue-500 m-4"
        />
        <input
          type="text"
          name="email"
          id="password"
          className="border border-blue-500 m-4"
        />
        <input
          type="submit"
          value="Submit"
          className="border border-black-500 m-4 text-black"
        />
      </form>
    </div>
  );
}
