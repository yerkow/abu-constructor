import {
  Accordion as AccordionUI,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui";
interface AccordionProps {
  items: AccordionItem[];
}
interface AccordionItem {
  question: string;
  answer: string;
}
function Accordion({
  contents,
  options,
  locale,
}: {
  contents: any;
  options: any;
  locale: string;
}) {
  return (
    <section className="mt-7">
      <h2 className="text-2xl font-bold text-[#690000]">
        {options?.title && options?.title[locale]}
      </h2>
      <AccordionUI type="single" collapsible>
        {contents.map(({ content }: any, idx: number) => {
          return (
            <AccordionItem
              key={idx}
              value={idx + `-` + content[locale].content}
            >
              <AccordionTrigger className="text-xl text-[#690000]">
                {content[locale].title}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: content[locale]?.content || "",
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </AccordionUI>
    </section>
  );
}
Accordion.displayName = "Accordion";
export default Accordion;
