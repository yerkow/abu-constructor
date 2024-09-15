import { backendImageUrl } from "@/shared/lib/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";

function Carousel({
  contents,
  options: { perView, variant, content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section>
      {/* <h1 className="font-bold text-2xl">{content?.[locale].title}</h1>
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
          ({ image, content }: { image: any; content: any }, idx: number) => {
            return (
              <SwiperSlide key={idx} className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${backendImageUrl}/${image}')`,
                  }}
                ></div>
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
                    <h1 className="text-white text-4xl font-bold">
                      {content.title}
                    </h1>
                    <p className="text-white text-xl">{content.content}</p>
                  </section>
                </section>
              </SwiperSlide>
            );
          }
        )}
      </Swiper> */}
    </section>
  );
}
Carousel.displayName = "Carousel";

export default Carousel;
