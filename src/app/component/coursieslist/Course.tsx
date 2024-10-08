"use client";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { poppins } from '../Navbar/Nav';
import Image from 'next/image';
import gsap from 'gsap'; // Import GSAP

import imge2 from '../../imges/logo.webp';
import './cource.css';

export default function Course() {
    const [course, setCourse] = useState([]);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const landingRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5049/Api/Course/List');
                console.log("API Response:", response.data);

                if (response.data && response.data.data) {
                    setCourse(response.data.data);
                } else {
                    console.warn('Unexpected response structure:', response.data);
                    setCourse([]); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setCourse([]); 
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 1 } 
            );
        }

        if (course.length > 0) {
            landingRefs.current = landingRefs.current.slice(0, course.length); // Ensure we have the correct length

            console.log('Landing Refs:', landingRefs.current);

            landingRefs.current.forEach((el) => {
                if (el) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                }
            });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const index = landingRefs.current.indexOf(entry.target as HTMLDivElement);
                            if (index !== -1) {
                                gsap.to(entry.target, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.8,
                                    delay: index * 0.3, 
                                    ease: "power2.out",
                                });
                            }
                            observer.unobserve(entry.target); 
                        }
                    });
                },
                { threshold: 0.1 } 
            );

            landingRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            return () => observer.disconnect(); 
        }
    }, [course]); 

    return (
        <>
            <div className='flex justify-center items-center mt-56 flex-col p-6'>
                {/* Title Animation */}
                <div className="font-bold text-3xl mb-4" ref={titleRef} style={{ opacity: 0 }}>
                    <h2>
                        <span className='text-orangecolor'>Courses</span> 
                        <span className='text-secondcolor'> List </span>
                    </h2>
                </div>

                <div className="parent flex gap-36 justify-center items-center">
                    {course.length > 0 ? (
                        course.map((item: { name: string, description: string }, index) => (
                            <div
                                key={index}
                                className='relative'
                                ref={(el: HTMLDivElement | null) => {
                                    if (el) landingRefs.current[index] = el;
                                }}
                                style={{ opacity: 0, transform: "translateY(20px)" }} // Set initial styles
                            >
                                {/* Image */}
                                <div className="pic">
                                    <Image src={imge2} alt="Coding" width={300} loading='lazy' />
                                </div>

                                {/* Title and Description */}
                                <div className={`p-2 ${poppins.className} item`}>
                                    <h3 className='relative title2'>{item.name}</h3>
                                    <p className={`${poppins.className} font-mono p-2`}>{item.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No courses available.</div>
                    )}
                </div>
            </div>
        </>
    );
}
