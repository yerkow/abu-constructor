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
export interface CarouselProps {
  items: CarouselItemType[];
  position: "left" | "center" | "right";
}
const CarouselClient = ({ contents, locale }: any) => {


  return (
    <section className="w-full flex items-center px-2  justify-center">
      <CarouselUI
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mb-20  md:max-w-[80%]  "
      >
        <CarouselContent>
          {contents.map((slide: any, idx: any) => {
            const { content } = slide.content[locale]
            return (
              <CarouselItem key={idx}>
                <div className="p-1  ">
                  <Card className="py-0 px-1 md:p-4 flex flex-col gap-4">
                    {/* <CardTitle>{item.title}</CardTitle> */}
                    <CardContent className="flex cursor-grab overflow-hidden  min-h-60 h-full items-center justify-center p-1  ">
                      <Image
                        src={`${backendImageUrl}/${slide.content.image}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw "
                        className="absolute object-cover rounded-md"
                        fill
                        objectFit="cover"
                        alt={`carousel item ${idx}`}
                      />
                    </CardContent>
                    <CardDescription className={cn("text-justify")} dangerouslySetInnerHTML={{ __html: content }}>
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
export { CarouselClient };
