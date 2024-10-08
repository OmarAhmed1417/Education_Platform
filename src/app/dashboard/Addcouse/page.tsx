import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; 

export default function AddCourse() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5049/Api/Course/Create', {
        name: courseName,
        description: courseDescription,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'The course has been created successfully!',
        });

        setCourseName('');
        setCourseDescription('');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="font-bold text-3xl mb-4 text-center">
        <h2>
          <span className="text-orange-500">Add</span>
          <span className="text-blue-600"> Course </span>
        </h2>
      </div>

      <div className="add">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input">
            <label htmlFor="courseName" className="block text-lg font-semibold text-gray-700 mb-2">Course Name</label>
            <input
              type="text"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="input">
            <label htmlFor="courseDescription" className="block text-lg font-semibold text-gray-700 mb-2">Course Description</label>
            <input
              type="text"
              placeholder="Write Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
