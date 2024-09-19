"use client";

import React from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Page() {
  const ed_list = [
    { title: "Бакалавриат", description: "29 образовательных программ" },
    { title: "Магистратура", description: "10 образовательных программ" },
    { title: "Докторантура", description: "6 образовательных программ" },
    { title: "Военная кафедра", description: "11 военно-учетных спец." },
  ];

  const fact_list = [
    {
      count: 45,
      title: "Специальностей",
    },
    {
      count: 10,
      title: "Молодежных организаций",
    },
    {
      count: 8,
      title: "Учебных корпусов",
    },
    {
      count: 1998,
      title: "Год создания университета",
    },
  ];

  return (
    <section className="">
      {/* Hero section */}
      <section>
        <div className="absolute left-0 top-0 bottom-0 right-0">
          <Image
            src="/images/hero.gif"
            alt="video"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <section className="absolute bottom-16 w-full">
          <ul className="flex flex-wrap gap-5 w-full max-w-[1200px] mx-auto px-4">
            {ed_list.map((item, index) => (
              <li
                key={index}
                className="basis-[calc(25%-gap)] grow shadow-[0px_4px_23.3px_rgba(0,0,0,0.18)] bg-white p-3 rounded-[10px] relative z-10"
              >
                <h3
                  className="text-[#500002] font-bold"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section className="max-w-[1200px] mx-auto mt-[100vh] px-4">
        {/* Sidebar & education section */}
        <section className="flex flex-col items-center gap-4  ">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="h-[240px] sm:h-[380px] md:h-[480px] w-full mt-5]"
            style={{ maxWidth: "900px" }}
          >
            {[1, 2].map((id) => (
              <SwiperSlide className="relative" key={id}>
                <Image
                  src={`/images/banner-${id}.jpeg`}
                  alt="slide"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        {/* News sesction */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px]">НОВОСТИ И СОБЫТИЯ</h2>
          <section className="flex gap-3 flex-wrap mt-3">
            {[1, 2, 3, 4].map((id) => (
              <article key={id} className="grow basis-[283px]">
                <div className="w-full h-[280px] relative">
                  <Image
                    src="/images/banner-2.jpeg"
                    alt="news"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <section className="mt-[20px]">
                  <header>
                    <h2 className="text-[18px] font-bold ">
                      Диагностика профессорско-преподавательского состава
                      Alikhan Bokeikhan University
                    </h2>
                    <p className="text-[#A3A3A3] text-[16px] mt-[6px]">
                      17 апреля, 2024
                    </p>
                  </header>
                  <footer className="mt-[12px]">
                    <button className="text-[#640000] font-bold">
                      Подробнее{" "}
                    </button>
                  </footer>
                </section>
              </article>
            ))}
          </section>
        </section>
        {/* Facts section */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px]">ФАКТЫ О НАС</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {fact_list.map((item: any, index: number) => (
              <article
                key={index}
                className="last:bg-[#640000] last:text-white grow basis-[calc(25%-gap)] shadow-[0px_4px_23.3px_rgba(0,0,0,0.18)] p-3 rounded-[10px] relative"
              >
                <h3
                  className="last:text-white text-inherit  decoration-solid underline font-semibold"
                  style={{ fontSize: "clamp(28px, 1.6vw, 42px)" }}
                >
                  {item.count}
                </h3>
                <p
                  className="text-inherit"
                  style={{ fontSize: "clamp(12px, 2vw, 16px)" }}
                >
                  {item.title}
                </p>
              </article>
            ))}
          </section>
        </section>
        {/* President section */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px]">ОБРАЩЕНИЕ ПРЕЗИДЕНТА</h2>
          <section className="mt-4">
            <p className="text-justify break-all sm:break-normal">
              <div className="w-[240px] h-[310px] relative float-left mr-4">
                <Image
                  src="/images/president.jpg"
                  alt="president"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]  "
                />
              </div>
              Достар, Әлихан Бөкейхан университетінің ресми сайтына қош
              келдіңіздер! Біз ерекше тарихи кезеңде өмір сүріп жатырмыз: Әлем
              IV Өндірістік революция қарсаңында тұр. Шекарамен белгіленбейтін
              білім беру кеңістігінің көкжиегі барынша кеңейіп келеді. Оның
              айғағы – шетелдік университеттердің қазақстандық жоғары оқу
              орындарында филиалдарының ашылуы. Ұлттық менталитетіміз бен
              тарихи, мәдени құндылықтарымызды барынша сақтай отырып, өзіндік
              қолтаңбасы бар іргелі оқу орны болу миссиясына сәйкес, заман
              үндеуіне бейімделуге міндеттіміз. Ақпараттық технология ағынынан
              қалыспай, Abai IT-Walley арқылы Жасанды интеллектіні жұмыс стилі,
              өмір сүру салты ретінде тұтынуына жол ашып, үздік тәжіибелер
              енгізу жүйесі қарастырылуда. Жасанды интеллект – бүгінгі уақыттың
              күн тәртібіндегі бірінші мәселе. Алаш көсемі Әлихан Бөкейхан «алда
              күнді көре білетін ұрпақ келеді», - деп келешекке зор үмітпен
              сенім артқаны белгілі. Кешегі күні қиял мен арман болған бүгінгі
              күннің ақиқаты адамзатты жаңа тарихтағы прогреске жетелейді.
              Тәуелсіздік аңсаған Алаш ардақтыларының идеясын жүйелі түрде
              ілгерілету басты мақсатымыз бола береді. Білімді ізгілендіру
              арқылы жоғары кәсіби біліктілігі туралы дипломы бар маман ғана
              емес кемел Тұлға тәрбиелеу игілікті, аяқталмайтын қызметіміз болып
              қала береді.
            </p>
          </section>
        </section>
        {/* President section */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px]">Галлерея</h2>
          <section className="mt-4 grid grid-cols-[1fr_1fr_300px] gap-2 ">
            <img
              className="row-span-1 col-span-1 rounded-md"
              src="/images/gallery/1.png"
              alt="gallery-image-1"
            />
            <img
              className="row-start-1 col-start-2 rounded-md"
              src="/images/gallery/2.png"
              alt="gallery-image-2"
            />
            <img
              className="row-start-2 col-span-1 rounded-md"
              src="/images/gallery/3.png"
              alt="gallery-image-3"
            />
            <img
              className="row-start-2 col-start-2 rounded-md"
              src="/images/gallery/4.png"
              alt="gallery-image-4"
            />
            <img
              className="col-start-3 h-full row-span-2 object-cover rounded-md"
              src="/images/gallery/5.png"
              alt="gallery-image-5"
            />
          </section>
        </section>
      </section>
    </section>
  );
}
