import Link from "next/link";
export default function Page() {
  return (
    <nav className="flex items-center justify-between m-8">
      <Link
        href="/"
        className="border border-black-500 shadow-md rounded-md p-4"
      >
        Home
      </Link>
      <Link
        href="/blog"
        className="border border-black-500 shadow-md rounded-md p-4"
      >
        {" "}
        Blog
      </Link>
    </nav>
  );
}
