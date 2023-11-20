import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const CourseModulesPage = () => {
  const [courseContent, setCourseContent] = useState({});
  const [watchKey, setWatchKey] = useState({});
  const [selectedModule, setSelectedModule] = useState('');
  const { _id } = useParams()
  console.log(_id)

  // Fetch course content data
  useEffect(() => {
    axios.get('YOUR_BACKEND_API_ENDPOINT')
      .then(response => {
        setCourseContent(response.data.course_content); // Update course content state
      })
      .catch(error => {
        console.error('Error fetching course content:', error);
      });
  }, []);

  // Function to fetch watch key for a specific module
  const fetchWatchKey = (moduleId) => {
    const payload = {
      jwt: 'YOUR_JWT_TOKEN', // Replace with actual JWT token
      _id: 'COURSE_ID', // Replace with actual course ID
      keys: [moduleId],
    };

    axios.post('http://localhost:8080/backend/api/v1/course/getWatchKey/', payload)
      .then(response => {
        setWatchKey(response.data);
        setSelectedModule(moduleId);
      })
      .catch(error => {
        console.error('Error fetching watch key:', error);
      });
  };

  // Function to watch a module video
  const watchModuleVideo = () => {
    // Fetch module video stream using watchKey[selectedModule]
    axios.get('http://localhost:9999/quickBucket/watch/', {
      headers: {
        Authorization: `Bearer ${watchKey[selectedModule]}`, // Add watch key as Bearer token
      },
    })
      .then(response => {
        // Handle video playback/streaming
        console.log('Video stream:', response);
        // You may integrate a video player library here for playback
      })
      .catch(error => {
        console.error('Error fetching module video:', error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Course Modules</h1>
      <div className="grid grid-cols-1 gap-6">
        {Object.keys(courseContent).map(moduleId => (
          <div key={moduleId} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{courseContent[moduleId].name}</h2>
            <p className="text-gray-600">{courseContent[moduleId].description}</p>
            <button
              onClick={() => fetchWatchKey(moduleId)}
              className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                selectedModule === moduleId ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={selectedModule === moduleId}
            >
              {selectedModule === moduleId ? 'Module Watched' : 'Watch Module'}
            </button>
          </div>
        ))}
        <div className="mt-6">
          <button
            onClick={watchModuleVideo}
            className={`px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
              !watchKey[selectedModule] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!watchKey[selectedModule]}
          >
            Watch Module Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModulesPage;
