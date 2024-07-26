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
export const Accordion = ({ items }: AccordionProps) => {
  return (
    <AccordionUI type="single" collapsible>
      {items.map((item, idx) => (
        <AccordionItem key={idx} value={item.question}>
          <AccordionTrigger className="text-xl text-cyan-500">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-lg">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionUI>
  );
};
