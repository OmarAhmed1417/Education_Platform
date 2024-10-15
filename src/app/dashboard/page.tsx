"use client";

import React, { useState } from 'react';
import logo from '../imges/logo.webp'; // Ensure the path is correct
import Image from 'next/image';
import { FaBook, FaPlus, FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import './dash.css';

import CourseList from './courselist/page'; 
import Addcouse from './Addcouse/page';
import Update from './updatecourse/Update'; 
import Delete from './deletecourse/Delete';
import Link from 'next/link';
import User from './users/Users';
import QA from './Question and answer/Q&A';

export default function Dashboard() {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const renderContent = () => {
        switch (activeComponent) {
            case 'courses':
                return <CourseList />;
            case 'addCourse':
                return <Addcouse />;
            case 'updateCourse':
                return <Update />;
            case 'deleteCourse':
                return <Delete />;
            case 'View Users':
                return <User/>
            case 'Q&A':
                return <QA/>
        
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-2">Courses Overview</h3>
                            <p className="text-gray-600">Manage and view your courses here.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-2">User Management</h3>
                            <p className="text-gray-600">Add, remove, or edit users easily.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-2">Exam Settings</h3>
                            <p className="text-gray-600">Setup and manage exams for your courses.</p>
                        </div>
                    </div>
                );
        }
    };
    return (
        <>
            <div className="min-h-screen flex">
                <nav className="bg-blue-900 w-1/5 h-screen p-6 fixed top-0 left-0">
                    <div className="text-center mb-10">
                        <Link href={'/'}>
                            <Image src={logo} width={140} height={140} loading="lazy" alt="logo" className="mx-auto mb-4" />
                        </Link>
                        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                    </div>
                    <ul className="space-y-16 text-white text-lg">
                        <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('courses')}
                            >
                                <FaBook className="mr-3" /> Courses
                            </button>
                        </li>
                        <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('addCourse')}
                            >
                                <FaPlus className="mr-3" /> Add Course
                            </button>
                        </li>
                        <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('updateCourse')}
                            >
                                <FaEdit className="mr-3" /> Update Course
                            </button>
                        </li>
                        <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('deleteCourse')}
                            >
                                <FaTrash className="mr-3" /> Delete Course
                            </button>
                        </li>
                        <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('View Users')}
                            >
                                <FaUser className="mr-3" /> View Users
                            </button>

                        </li>
                            <li className="hover:bg-orangecolor p-4 rounded-lg transition-colors">
                            <button
                                className="flex items-center w-full text-left"
                                onClick={() => setActiveComponent('Q&A')}
                            >
                                <FaBook className="mr-3" /> Q&A
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <div className="flex-1 p-10 ml-[20%]"> {/* Adjusted margin-left for content */}
                    <header className="bg-blue-900 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
                    </header>

                    <section className="mt-8">
                        {/* Conditionally render the content based on the activeComponent */}
                        {renderContent()}
                    </section>
                </div>
            </div>
        </>
    );
}
