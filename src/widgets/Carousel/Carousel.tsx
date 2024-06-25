import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselUI,
} from "@/shared/ui";
import Image from "next/image";
type CarouselItemType = {
  img: string;
  title: string;
  content: string;
};
interface CarouselProps {
  items: CarouselItemType[];
  position: "left" | "center" | "right";
}
export const Carousel = ({ items, position }: CarouselProps) => {
  return (
    <section className="w-full flex items-center justify-center">
      <CarouselUI
        opts={{
          align: "start",
        }}
        className="w-full max-w-[80%]  "
      >
        <CarouselContent>
          {items.map((item, idx) => (
            <CarouselItem key={idx} className="">
              <div className="p-1  ">
                <Card className="p-4 flex flex-col gap-4">
                  <CardTitle>{item.title}</CardTitle>
                  <CardContent className="flex  cursor-grab overflow-hidden   items-center justify-center p-6">
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={item.img}
                        className="absolute rounded-md"
                        objectFit="cover"
                        fill
                        alt={item.title}
                      />
                    </div>
                  </CardContent>
                  <CardDescription
                    className={cn(
                      {
                        left: "text-left",
                        center: "text-center",
                        right: "text-right",
                      }[position]
                    )}
                  >
                    {item.content}
                  </CardDescription>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselUI>
    </section>
  );
};
