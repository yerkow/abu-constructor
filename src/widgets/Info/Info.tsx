import { backendImageUrl } from "@/shared/lib/constants";
import { Button } from "@/shared/ui";
import { InfoItem } from "@/widgets/Info/InfoItem";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  title: string;
  content: string;
  items: InfoItemProps[];
}
export interface InfoItemProps {
  image: string;
  imagePosition: string;
  href: string;
  title: string;
  content: string;
  linkText: string;
}
function Info({ title, content, items }: InfoProps) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-3xl text-center">{title}</h2>
      <p className="text-xl text-center">{content}</p>
      {items.map((item, idx) => (
        <InfoItem {...item} key={idx} />
      ))}
    </section>
  );
}
Info.displayName = "Info";
export default Info;
