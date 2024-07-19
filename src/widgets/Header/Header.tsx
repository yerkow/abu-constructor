import { Navbar } from "@/widgets/Header/Navbar";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-[248px] bg-cyan-500 flex flex-col gap-5  w-full shadow-2xl">
      <section className="min-h-10"></section>
      <section className="flex items-center justify-center gap-10">
        <Image src={"/logo.svg"} height={120} width={120} alt="Logo" />
        <h1 className="font-bold text-xl text-white">
          ПРОФСОЮЗ РАБОТНИКОВ <br /> ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ
        </h1>
      </section>
      <Navbar />
    </header>
  );
};
