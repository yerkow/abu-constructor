import { ChangeLocale } from "@/features";
import { AnimatedText, SocialLinks } from "@/shared/ui";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-[248px] relative   bg-cyan-500 flex flex-col gap-5  w-full ">
      <section className="min-h-10 mr-10 flex gap-6 items-center  justify-end pt-3 pr-3">
        <SocialLinks />
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <section className="grid grid-cols-3 items-center gap-10">
        <div className="flex gap-10 items-center  col-start-2 col-end-3">
          <Image src={"/logo.svg"} height={120} width={120} alt="Logo" />
          <AnimatedText
            text={[
              "ПРОФСОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ ГОРОДА АСТАНЫ",
              "АСТАНА ҚАЛАСЫНЫҢ БІЛІМ БЕРУ ҚЫЗМЕТКЕРЛЕРІНІҢ КӘСІПОДАҒЫ",
            ]}
          />
        </div>
        <div className="text-white col-start-3 col-end-4 justify-self-center">
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
      </section>
      <Navbar />
    </header>
  );
};
