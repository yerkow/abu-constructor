import { ChangeLocale } from "@/features";
import { AnimatedText, SocialLinks } from "@/shared/ui";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-auto relative   bg-cyan-500 flex flex-col gap-2   w-full ">
      <section className="min-h-10 mr-0 md:mr-10 flex gap-6 items-center  justify-end pt-3 pr-3">
      <Links/>
        <SocialLinks />
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <section className=" md:px-20 px-5 grid    grid-cols-[100px_1fr]  md:items-center gap-5">
          <Image
            src={"/logo.svg"}
            height={80}
            width={80}
            alt="Logo"
            className=" w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
          />
          <AnimatedText
            text={[
              "ПРОФСОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ",
              "АСТАНА ҚАЛАСЫНЫҢ БІЛІМ БЕРУ ҚЫЗМЕТКЕРЛЕРІНІҢ КӘСІПОДАҒЫ",
            ]}
          />
      </section>
      <Navbar />
    </header>
  );
};
const Links = () => {
  return (
    <div className="text-white gap-10  hidden lg:flex">
      <div className="flex gap-4">
        <Phone />
        <a href="tel:+7 /7172/ 21-71-06">+7 /7172/ 21-71-06</a>
      </div>
      <div className="flex gap-4">
        <Mail />
        <a href="email:prof_adilet@mail.ru">prof_adilet@mail.ru</a>
      </div>
      <div className="flex gap-4">
        <MapPin />
        <span>Астана, проспект Абая, 38, офис 401</span>
      </div>
    </div>
  );
};
