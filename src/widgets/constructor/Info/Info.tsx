import { backendImageUrl } from "@/shared/lib/constants";
import Image from "next/image";

export interface InfoItemProps {
  image: string;
  imagePosition: string;
  href: string;
  title: string;
  content: string;
  linkText: string;
}
function Info({
  options: { content },
  locale,
}: {
  options: any;
  locale: string;
}) {

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-[#690000]">
        {content[locale]?.title}
      </h2>
      <section className="flex flex-col md:flex-row   gap-4 bg-slate-100 rounded-sm  p-5">
        <section className="relative w-[100%] md:w-[35%] h-[350px]">
          <Image
            src={`${backendImageUrl}${content.image}`}
            fill
            objectFit="cover"
            objectPosition="center"
            alt="image"
            className="rounded-md"
          />
        </section>
        <section className="w-[100%] md:w-[65%] quill-content" dangerouslySetInnerHTML={{ __html: content[locale].content }}></section>
      </section>
    </section>
  );
}
Info.displayName = "Info";
export default Info;
