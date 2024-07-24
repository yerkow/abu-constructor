import { ChangeLocale } from "@/features";
import { AnimatedText, SocialLinks } from "@/shared/ui";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-[248px] relative   bg-cyan-500 flex flex-col gap-5  w-full ">
      <section className="min-h-10 mr-0 md:mr-10 flex gap-6 items-center  justify-end pt-3 pr-3">
        <SocialLinks />
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <section className="grid  grid-cols-1  md:grid-cols-3  md:items-center gap-10">
        <div className="flex px-5 md:px-0  gap-5 md:gap-10 items-center w-full justify-center  md:col-start-2 md:col-end-3">
          <Image
            src={"/logo.svg"}
            height={120}
            width={120}
            alt="Logo"
            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
          />
          <AnimatedText
            text={[
              "ПРОФСОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ",
              "АСТАНА ҚАЛАСЫНЫҢ БІЛІМ БЕРУ ҚЫЗМЕТКЕРЛЕРІНІҢ КӘСІПОДАҒЫ",
            ]}
          />
        </div>
        <Links />
      </section>
      <Navbar />
    </header>
  );
};
const Links = () => {
  return (
    <div className="text-white col-start-3 col-end-4 justify-self-center hidden lg:block">
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
