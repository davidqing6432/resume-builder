import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/experiences">Experiences</Link>
      <Link href="/resume">Create a Resume</Link>
    </div>
  );
}
