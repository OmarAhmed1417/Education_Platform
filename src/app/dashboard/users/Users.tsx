"use client"
import { poppins } from '@/app/component/Navbar/Nav'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLock } from 'react-icons/fa';

export default function User() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5049/Api/UserApp/List');
                if (response.data && response.data.data) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-8 rounded-lg mb-8">
                <h1 className="text-4xl font-bold">User Management</h1>
                <p className="text-lg mt-2">View the list of users with numbering.</p>
            </div>

            {data.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {data.map((user: { id: number; name: string; email: string; }, index) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg"
                        >
                            <div className="flex items-center">
                                <span className="text-lg font-bold text-gray-700 mr-4">{index + 1}.</span>
                                {/* الاسم على اليسار */}
                                <h3 className={`${poppins.className} text-gray-600`}>{user.name}</h3>
                            </div>
                            {/* البريد الإلكتروني على اليمين */}
                            <p className={`${poppins.className} text-gray-600`}>{user.email}</p>
                                <FaLock className="h-5 w-5 text-gray-500 mr-2" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600">No users available.</div>
            )}
        </div>
    );
}
