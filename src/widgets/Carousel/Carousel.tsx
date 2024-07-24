"use client";
import { backendImageUrl } from "@/shared/lib/constants";
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
import Link from "next/link";
import { useParams } from "next/navigation";
type CarouselItemType = {
  image: string;
  title: string;
  content: string;
  href?: string;
};
interface CarouselProps {
  items: CarouselItemType[];
  position: "left" | "center" | "right";
}
export const Carousel = ({ items, position }: CarouselProps) => {
  const params = useParams();
  return (
    <section className="w-full flex items-center justify-center">
      <CarouselUI
        opts={{
          align: "start",
        }}
        className="w-full max-w-[80%]  "
      >
        <CarouselContent>
          {items.map((item, idx) => {
            const Comp = item.href
              ? (Link as React.ElementType)
              : ("div" as "div");
            return (
              <CarouselItem key={idx}>
                <div className="p-1  ">
                  <Card className="p-4 flex flex-col gap-4">
                    <CardTitle>{item.title}</CardTitle>
                    <CardContent className="flex  cursor-grab overflow-hidden   items-center justify-center p-6">
                      <Comp
                        href={`/${params.locale}/${item.href}`}
                        className="relative w-full h-[200px] md:h-[400px]"
                      >
                        <Image
                          src={`${backendImageUrl}/${item.image}`}
                          className="absolute rounded-md"
                          objectFit="cover"
                          fill
                          alt={item.title}
                        />
                      </Comp>
                    </CardContent>
                    <CardDescription className={cn("text-justify")}>
                      {item.content}
                    </CardDescription>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious>a</CarouselPrevious>
        <CarouselNext>a</CarouselNext>
      </CarouselUI>
    </section>
  );
};
