import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-black">
      <Link href={"/ai"} className="px-7 py-3 bg-[#161616] text-white border-[1px] border-[#6c6c6c] hover:bg-black transition-all rounded-full">TAKE ME TO AI</Link>
    </main>
  );
}
