"use client"
import { backendImageUrl } from "@/shared/lib/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";
import Image from "next/image";

export function CarouselClient({
  contents,
  options: { perView, variant, content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  console.log(contents);
  return (
    <section>
      <h1 className="font-bold text-2xl">{content?.[locale].title}</h1>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={
          perView === "1"
            ? {}
            : {
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }
        }
        loop={true}
        spaceBetween={perView === "1" ? 0 : 10}
        modules={[Pagination, Autoplay]}
        className={clsx("w-full rounded-2xl", {
          "h-48": variant === "small",
          "h-80": variant === "medium",
          "h-[550px]": variant === "large",
        })}
      >
        {contents.map(
          ({ content }: any, idx: number) => {
            console.log(content[locale].content)
            return (
              <SwiperSlide key={idx} className="relative w-full h-full">
                <div className="w-[90%]">
                  <Image src={`${backendImageUrl}/${content.image}`} alt="" fill style={{ objectFit: "contain" }} />

                </div>
                <section
                  className={clsx(
                    "absolute inset-0 flex items-end text-justify",
                    {
                      "bg-black bg-opacity-20 ":
                        content?.title || content.content,
                    }
                  )}
                >
                  <section className="pb-8 px-5">
                    <p className="text-white text-xl" dangerouslySetInnerHTML={{ __html: content?.[locale]?.content }}></p>
                  </section>
                </section>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </section>
  );
}
