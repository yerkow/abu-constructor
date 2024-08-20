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
            {/*  relative -top-10 z-10 */}
            <section className="max-w-[1200px] mx-auto mt-5">
                {/* Sidebar & education section */}
                <section className="flex gap-6">
                    <ul className="grid grid-cols-2 gap-3 w-[50%]">
                        {
                            edList.map((item, index) => (
                                <li key={index} className="shadow-[0px_4px_23.3px_rgba(0,0,0,0.18)] p-3 rounded-[10px] relative z-10">
                                    <h3 className='text-[#500002] text-2xl font-bold'>{item.title}</h3>
                                    <p>{item.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                    <Swiper pagination={true} modules={[Pagination]} className="h-[280px] w-[50%]">
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
            </section>
            {/* News sesction */}
            <section>
               
            </section>
        </section >
    )
}