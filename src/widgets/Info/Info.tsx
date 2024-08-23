import { InfoItem } from "@/widgets/Info/InfoItem";

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
function Info({ options, contents, locale }: { options: any, contents: Array<any>, locale: string }) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-[#690000]">{options.title[locale]}</h2>
      {contents.map((item, idx) => (
        <InfoItem item={item} locale={locale} key={idx} />
      ))}
    </section>
  );
}
Info.displayName = "Info";
export default Info;
