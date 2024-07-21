import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-[248px] relative   bg-cyan-500 flex flex-col gap-5  w-full ">
      <section className="min-h-10 flex gap-6  justify-end pt-3 pr-3">
        <ChangeLocale />
        <BurgerMenu />
      </section>
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
