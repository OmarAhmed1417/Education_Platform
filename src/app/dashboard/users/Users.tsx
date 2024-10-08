"use client"
import { poppins } from '@/app/component/Navbar/Nav'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function User(){
    const [data,setData] = useState([])
useEffect(()=>{
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
    fetchData()
},[])

    return(
        <>
        {data.length>0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {data.map((user: { id: number; name: string; email: string; phone: string; }, index) => (
                    <div
                        key={index}
                        className="relative p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow course"
                    >
                        <h3 className='text-xl font-semibold text-orangecolor'>{user.name}</h3>
                        <p className={`${poppins.className} font-mono text-gray-700 mt-2`}>{user.email}</p>
                        <p className={`${poppins.className} font-mono text-gray-700 mt-2`}>{user.phone}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-600">No users available.</div>
        )}
        
        </>
    )
}