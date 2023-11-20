import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { requestUrls } from '../utility/utility';
import { useToken } from '../auth/useToken';
import Topbar from '../topbar/Topbar';

const AllCourses = () => {
  const [token, setToken] = useToken();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend API
    axios.post(requestUrls.allcourses, {
        jwt: token
    })
      .then(response => {
        setCourses(response.data); // Assuming response.data contains the courses array
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleClick = (courseId) => {
    // Handle click event for a course tile
    console.log('Clicked course ID:', courseId);
    window.location.href = `/course/watch/${courseId}`
    // Add your logic for handling the click event here
  };

  return (
    <div className='bg-slate-100'>
    <Topbar />
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
            <p className="text-gray-600">{course.description}</p>
            <button
              onClick={() => handleClick(course._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Watch Now
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllCourses;
