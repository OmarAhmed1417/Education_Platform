import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { poppins } from '@/app/component/Navbar/Nav';
import Swal from 'sweetalert2'; 
import './Update.css';

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({ id: 0, name: '', description: '' });

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

    const handleEditClick = (course: { id: number; name: string; description: string }) => {
        setSelectedCourse(course);
        setModalVisible(true); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSelectedCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = async () => {
        try {
            const data = {
                id: selectedCourse.id,
                name: selectedCourse.name,
                description: selectedCourse.description
            };

            await axios.put('http://localhost:5049/Api/Course/Edit', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                title: 'Success!',
                text: 'Course updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setModalVisible(false); 
            const response = await axios.get('http://localhost:5049/Api/Course/List'); // Fetch updated courses
            setCourses(response.data.data); 
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the course. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error updating course:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCourse({ id: 0, name: '', description: '' }); // Reset course data
    };

    return (
        <>
            <div className='flex justify-center items-center mt-4 flex-col flex-wrap'>
                <div className="font-bold text-3xl mb-4">
                    <h2>
                        <span className='text-orangecolor'>Update</span> 
                        <span className='text-secondcolor'> Course</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {courses.length > 0 ? (
                        courses.map((course: { courseId: number; name: string; description: string }, index) => (
                            <div 
                                key={index}
                                className="relative p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow course"
                            >
                                <h3 className='text-xl font-semibold text-orangecolor'>{course.name}</h3>
                                <p className={`${poppins.className} font-mono text-gray-700 mt-2`}>{course.description}</p>
                                <button 
                                    onClick={() => handleEditClick({ id: course.courseId, name: course.name, description: course.description })}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Update Course
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">No courses available.</div>
                    )}
                </div>
            </div>

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="font-bold text-3xl mb-4">
                    <h2>
                        <span className='text-orangecolor'>Update</span> 
                        <span className='text-secondcolor'> Course</span>
                    </h2>
                </div>
                        <label htmlFor="id" className='text-secondcolor font-bold text-xl '>Course ID:</label>
                        <input
                            id="id"
                            type="number"
                            name="id"
                            value={selectedCourse.id} 
                            onChange={handleInputChange} 
                            className="block w-full border p-2 mb-4"
                            readOnly
                        />
                        <label htmlFor="name" className='text-orangecolor font-bold text-xl'>Course Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={selectedCourse.name}
                            onChange={handleInputChange}
                            className="block w-full border p-2 mb-4"
                            placeholder="Enter course name"
                        />
                        <label htmlFor="description" className='text-secondcolor font-bold text-xl'>Course Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={selectedCourse.description}
                            onChange={handleInputChange}
                            className="block w-full border p-2 mb-4"
                            placeholder="Enter course description"
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleUpdateSubmit} 
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                                Save
                            </button>
                            <button 
                                onClick={closeModal} 
                                className="ml-2 mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
