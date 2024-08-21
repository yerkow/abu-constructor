"use client"

import React from 'react'

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Page() {

    const edList = [
        { title: 'Бакалавриат', description: '29 образовательных программ' },
        { title: 'Магистратура', description: '10 образовательных программ' },
        { title: 'Докторантура', description: '6 образовательных программ' },
        { title: 'Военная кафедра', description: '6 военно-учетных спец.' }
    ]

    return (
        <section className=''>
            {/* Hero section */}
            <section className="bg-[url('/images/hero.png')] bg-cover bg-center bg-no-repeat h-[700px] w-full relative z-[1]">
                <section className="w-full h-full bg-black/30 flex justify-center items-center">
                    <Image src="/images/logo-white.png" alt="logo" width={656} height={80} />
                </section>
            </section>
            <section className="max-w-[1200px] mx-auto mt-5 px-4">
                {/* Sidebar & education section */}
                <section className="flex flex-col items-center gap-4 relative top-[-60px] ">
                    <ul className="flex flex-wrap gap-5 w-full ">
                        {
                            edList.map((item, index) => (
                                <li key={index} className="basis-[calc(25%-gap)] grow shadow-[0px_4px_23.3px_rgba(0,0,0,0.18)] bg-white p-3 rounded-[10px] relative z-10">
                                    <h3 className='text-[#500002] font-bold' style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>{item.title}</h3>
                                    <p style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>{item.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                    <Swiper pagination={true} modules={[Pagination]} className="h-[480px] w-full" style={{ maxWidth: "900px" }}>
                        {[1, 2].map((id) => (
                            <SwiperSlide className="relative" key={id}>
                                <Image
                                    src={`/images/banner-${id}.jpeg`}
                                    alt="slide"
                                    layout="fill"
                                    objectFit="cover"
                                    className='rounded-[10px]'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                {/* News sesction */}
                <section className='flex gap-3 flex-wrap'>
                    {
                        [1, 2, 3, 4].map((id) => (
                            <article className='' style={{ flexBasis: "calc(25% - 12px)" }}>
                                <div className='w-full h-[280px] relative'>
                                    <Image src="/images/banner-2.jpeg" alt="news" layout='fill' objectFit='cover' className='rounded-md' />
                                </div>
                                <section className='mt-[20px]'>
                                    <header>
                                        <h2 className='text-[18px] font-bold '>Диагностика профессорско-преподавательского состава Alikhan Bokeikhan University</h2>
                                        <p className='text-[#A3A3A3] text-[16px] mt-[6px]'>17 апреля, 2024</p>
                                    </header>
                                    <footer className='mt-[12px]'>
                                        <button className='text-[#640000] font-bold'>Подробнее </button>
                                    </footer>
                                </section>
                            </article>
                        ))
                    }
                </section>
            </section>
        </section >
    )
}