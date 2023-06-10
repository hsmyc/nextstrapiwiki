import Link from "next/link";
import Leftmenu from "../component/Leftmenu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen max-h-full flex">
      {/* @ts-expect-error Server Component */}
      <Leftmenu />
      <div className="flex flex-col items-center justify-center w-full p-4">
        <Link
          href={`/blog/new`}
          className="border border-black rounded-md p-4 m-8"
        >
          New
        </Link>
        <div>{children}</div>
      </div>
    </div>
  );
}
