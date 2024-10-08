"use client";
import landing from '../../imges/Frame (1).webp';
import Image from 'next/image';
import './landing.css';
import { poppins } from '../Navbar/Nav';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Landing() {
    const titleRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const landingRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (titleRef.current && descriptionRef.current && landingRef.current) {
            const tl = gsap.timeline({ delay: 0.0 });

            tl.from(titleRef.current, {
                opacity: 0,
                y: 100,
                duration: 1,
                onComplete: () => {
                    if (titleRef.current) 
                    {
                        titleRef.current.style.opacity = '1';
                        titleRef.current.style.transition = '0.5s';

                    }
                }
            })
            .from(descriptionRef.current, {
                opacity: 0,
                y: 100,
                duration: 1,
                onComplete: () => {
                    if (descriptionRef.current) {
                        descriptionRef.current.style.opacity = '1';
                        descriptionRef.current.style.transition = '0.5s';

                    }
                }
            }, "-=0.5") // Starts the description animation 0.5 seconds earlier
            .from(landingRef.current, {
                opacity: 0,
                y: 100,
                duration: 1,
                onComplete: () => {
                    if (landingRef.current)
                        { landingRef.current.style.opacity = '1';
                        landingRef.current.style.transition = '0.5s';

                        }
                }
            }, "-=0.5"); // Starts the landing animation 0.5 seconds earlier
        }
    }, []);

    return (
        <div className='flex justify-center gap-52 items-center p-2 mt-6'>
            <div className={`flex flex-col gap-5 ${poppins.className}`}>
                <div className="w-2/5" ref={titleRef} style={{ opacity: 0 }}>
                    <h1 className='text-5xl font-bold text-secondcolor'>
                        Skill your way up to success with us
                    </h1>
                </div>
                <div className="w-2/5 text-2xl text-links" ref={descriptionRef} style={{ opacity: 0 }}>
                    <p>Get the skills you need for the future of work.</p>
                </div>
            </div>

            <div ref={landingRef} style={{ opacity: 0 }}>
                <Image src={landing} width={573} height={400} alt="Landing image" loading='lazy' />
            </div>
        </div>
    );
}
