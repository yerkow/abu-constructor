'use client';
import { backendImageUrl } from '@/shared/lib/constants';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

export const ProfileCard = ({ locale, content }: { locale: string, content: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const contentVariants: Variants = {
        hidden: {
            height: "auto",
            transition: {
                delay: 0.3,

            }
        },
        visible: {
            height: "100%",
            backdropFilter: "blur(2px)",

        }
    };

    const paragraphVariants: Variants = {
        hidden: {
            x: -300,
            height: 0,
            opacity: 0,
            transition: {
                x: { type: "spring", damping: 25, },
                height: { delay: 0.3 },
                opacity: { duration: 0.5 }
            }
        },
        visible: {
            x: 0,
            height: "auto",
            opacity: 1,
            transition: {
                x: { type: "spring", damping: 25 },
                opacity: { delay: 0.2, duration: 0.5 }
            }
        }
    }

    return (
        <li
            className='h-[500px] bg-cover bg-center bg-no-repeat rounded-3xl cursor-pointer flex flex-col justify-end overflow-hidden'
            style={{
                backgroundImage: `url(${backendImageUrl + content?.image})`,
            }}
            onMouseEnter={toggleOpen}
            onMouseLeave={toggleOpen}
        >
            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                className='bg-gradient-to-b to-black from-transparent text-white p-5'
            >
                <motion.div
                    className='h-[100%] flex flex-col justify-end'
                    variants={{
                        hidden: { gap: "0px" },
                        visible: {
                            gap: "10px",
                        }
                    }}
                >
                    <h3>{content?.[locale]?.full_name}</h3>
                    <p>{content?.[locale]?.job_title}</p>
                    <motion.p
                        variants={paragraphVariants}
                        className='quill-content'
                        style={{ overflow: "hidden" }}
                        dangerouslySetInnerHTML={{ __html: content?.[locale]?.description }}
                    />
                </motion.div>
            </motion.div>
        </li>
    );
};
