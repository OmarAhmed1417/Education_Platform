"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import logo from '../../imges/Logo.webp'; // Ensure the path is correct
import Link from "next/link";
import './Nav.css';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
    subsets: ['latin'], 
    weight: ['400', '600', '700'], 
    style: ['normal', 'italic'], 
});

export { poppins };

export default function Nav() {
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const storedUserData = localStorage.getItem('userData');
        if (accessToken && storedUserData) {
            setIsLoggedIn(true);
            const userData = JSON.parse(storedUserData);
            setUserName(userData.userName); // Set the user's name from localStorage
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUserName(null);
        window.location.href = '/'; 
    };

    return (
        <nav className="p-5 flex items-center gap-44 ml-16">
            <div>
                <Link href={'/'}>
                    <Image src={logo} width={150} height={150} loading="lazy" alt="logo" />
                </Link>
            </div>

            <div className="links">
                <ul className={`list-none flex gap-24 ${poppins.className}`}>
                    <li><Link href={'/'} className="text-orangecolor">Home</Link></li>
                    <li><Link href={'/course-selector'} className="link text-links">Course Selector</Link></li>
                    <li><Link href={'/courses'} className="link text-links">Courses</Link></li>
                    <li><Link href={'/pricing'} className="link text-links">Pricing</Link></li>
                    <li><Link href={'/faq'} className="link text-links">FAQ</Link></li>
                    <li><Link href={'/contact'} className="link text-links">Contact Us</Link></li>
                </ul>
            </div>

            <div className="btns flex gap-20 items-center">
                {isLoggedIn ? (
                    <>
                        <span className="text-orangecolor font-bold text-xs">Welcome, {userName}!</span>
                        <button className="bg-orangecolor p-2 w-btns btn text-white " onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href={'/login'}>
                            <button className="text-orangecolor p-2 w-btns btn">Log in</button>
                        </Link>
                        <Link href={'/Register'}>
                            <button className="bg-orangecolor text-white btn2 p-2 w-btns">Create Account</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
