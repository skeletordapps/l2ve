import Link from "next/link";
import Nav from "./components/v2/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="flex flex-col items-center">
        <Link
          target="blank"
          href="/v1"
          className="transition-all hover:opacity-80 hover:underline"
        >
          V1
        </Link>
      </div>
    </>
  );
}
