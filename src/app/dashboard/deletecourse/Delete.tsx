import { poppins } from '@/app/component/Navbar/Nav';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // استخدام SweetAlert لتأكيد الحذف
import './delete.css'; 

export default function Delete() {
    const [courses, setCourses] = useState<Array<{ courseId: number; name: string; description: string }>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5049/Api/Course/List');
                
                if (response.data && response.data.data) {
                    setCourses(response.data.data);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = async (courseId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5049/Api/Course/Delete/${courseId}`);
                    
                    const updatedCourses = courses.filter((course) => course.courseId !== courseId);
                    setCourses(updatedCourses);

                    Swal.fire('Deleted!', 'The course has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting course:', error);
                    Swal.fire('Error!', 'Failed to delete the course. Please try again.', 'error');
                }
            }
        });
    };
    return (
        <div className='flex justify-center items-center mt-4 flex-col flex-wrap'>
            <div className="font-bold text-3xl mb-4">
                <h2>
                    <span className='text-orangecolor'>Delete</span> 
                    <span className='text-secondcolor'> Course</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div 
                            key={course.courseId}
                            className="relative p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow course"
                        >
                            <h3 className='text-xl font-semibold text-orangecolor'>{course.name}</h3>
                            <p className={`${poppins.className} font-mono text-gray-700 mt-2`}>{course.description}</p>


                            <button 
                                onClick={() => handleDeleteClick(course.courseId)}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Delete Course
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-600">No courses available.</div>
                )}
            </div>
        </div>
    );
}
