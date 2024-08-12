'use client';
import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";


const topHeaderMenuList = [
  { title: "Обучающимся", link: "home" },
  { title: "Международный отдел", link: "home" },
  { title: "Выпусникам", link: "home" },
  { title: "AIS", link: "https://ais.semuniver.kz/login.php" },
  { title: "Abai IT", link: "https://abai-it.kz/" },
]


export const Header = () => {

  const params = useParams();

  // href={`/${params.locale}/main`}
  return (
    <header className="relative  flex flex-col  w-full ">
      <section className="bg-[#640000] min-h-10 flex gap-20 justify-end  pr-3 ">
        <section className="flex gap-10 text-white items-center">
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
