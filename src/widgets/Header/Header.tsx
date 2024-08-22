'use client';
import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import Link from "next/link";

const topHeaderMenuList = [
  { title: "Обучающимся", link: "home" },
  { title: "Международный отдел", link: "home" },
  { title: "Выпусникам", link: "home" },
  { title: "AIS", link: "https://ais.semuniver.kz/login.php" },
  { title: "Abai IT", link: "https://abai-it.kz/" },
]

export const Header = () => {
  return (
    <header className="relative z-50  flex flex-col  w-full ">
      <section className="bg-[#640000] min-h-5 flex justify-end  pr-3" style={{ gap: "clamp(20px, 1.5vw, 80px) " }}>
        <section className="flex  text-white items-center" style={{ gap: "clamp(15px, 1.5vw, 40px)" }}>
          {topHeaderMenuList.map((item, index) => (
            <Link href={item.link} key={index}>
              {item.title}
            </Link>
          ))}
        </section>
        <section className="flex items-center">
          <ChangeLocale />
          <BurgerMenu />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
