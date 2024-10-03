"use client";
import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/common/Header/Navbar";
import Image from "next/image";
import Link from "next/link";
import { SearchWidget } from "../SearchWidget/SearchWidget";

const topHeaderMenuList = [
  { title: "Обучающимся", link: "home" },
  { title: "Международное сотрудничество", link: "home" },
  { title: "Выпусникам", link: "home" },
  { title: "AIS", link: "https://ais.semuniver.kz/login.php" },
  { title: "Abai IT", link: "https://abai-it.kz/" },
];

export const Header = () => {
  return (
    <header className="relative z-50  flex flex-col  w-full">
      <section
        className="bg-[#640000] min-h-5 w-full flex justify-between [@media(min-width:890px)]:justify-end px-4 fixed [@media(min-width:890px)]:static"
        style={{ gap: "clamp(20px, 1.5vw, 80px) " }}
      >
        <Link
          href="/"
          className="inline [@media(min-width:890px)]:hidden"
          style={{ position: "relative", height: "80px", width: "180px" }}
        >
          <Image
            src={`/images/logo-white.png`}
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </Link>
        <section
          className="text-white items-center hidden [@media(min-width:890px)]:flex"
          style={{ gap: "clamp(15px, 1.5vw, 40px)" }}
        >
          {topHeaderMenuList.map((item, index) => (
            <Link href={item.link} key={index}>
              {item.title}
            </Link>
          ))}
        </section>
        <section className="flex items-center gap-7">
          <SearchWidget />
          <ChangeLocale />
          <BurgerMenu topHeaderMenuList={topHeaderMenuList} />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
