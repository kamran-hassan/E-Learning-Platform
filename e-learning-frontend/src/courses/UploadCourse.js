import { useState } from 'react';
import Topbar from '../topbar/Topbar';

const UploadCourse = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    modules: [
      { name: '', shortDescription: '', video: null }
    ]
  });

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      const newModules = [...courseData.modules];
      newModules[index][name] = files[0];
      setCourseData({ ...courseData, modules: newModules });
    } else {
      const newModules = [...courseData.modules];
      newModules[index][name] = value;
      setCourseData({ ...courseData, modules: newModules });
    }
  };

  const handleAddModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, { name: '', shortDescription: '', video: null }]
    });
  };

  const handleRemoveModule = (index) => {
    const newModules = [...courseData.modules];
    newModules.splice(index, 1);
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the courseData (e.g., send to server, handle video uploads, etc.)
    console.log(courseData);
  };

  return (
    <div>
        <Topbar />
        <div className="mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Upload Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='bg-blue-300 rounded-sm p-4 shadow-lg'>
                    <div>
                    <label htmlFor="courseName" className="block mb-1">Course Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        name="name"
                        value={courseData.name}
                        onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    </div>
                    <div>
                    <label htmlFor="courseDescription" className="block mb-1">Course Description:</label>
                    <textarea
                        id="courseDescription"
                        name="description"
                        value={courseData.description}
                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
                    ></textarea>
                    </div>
                </div>
                {courseData.modules.map((module, index) => (
                <div className='bg-blue-100 p-4 shadow-md' key={index}>
                    <hr className="my-4" />
                    <h2 className="text-lg font-semibold mb-2">Module {index + 1}</h2>
                    <div>
                    <label htmlFor={`moduleName${index}`} className="block mb-1">Module Name:</label>
                    <input
                        type="text"
                        id={`moduleName${index}`}
                        name="name"
                        value={module.name}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    </div>
                    <div>
                    <label htmlFor={`moduleShortDesc${index}`} className="block mb-1">Short Description:</label>
                    <textarea
                        id={`moduleShortDesc${index}`}
                        name="shortDescription"
                        value={module.shortDescription}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full border border-gray-300 rounded-md p-2 h-20 resize-none"
                    ></textarea>
                    </div>
                    <div>
                    <label htmlFor={`moduleVideo${index}`} className="block mb-1">Upload Video:</label>
                    <input
                        type="file"
                        id={`moduleVideo${index}`}
                        name="video"
                        onChange={(e) => handleChange(e, index)}
                        accept="video/*"
                        className="border border-gray-300 rounded-md p-2"
                    />
                    </div>
                    {index > 0 && (
                    <button
                        type="button"
                        onClick={() => handleRemoveModule(index)}
                        className="text-red-500 font-semibold mt-2 hover:underline"
                    >
                        Remove Module
                    </button>
                    )}
                </div>
                ))}
                <button
                type="button"
                onClick={handleAddModule}
                className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                >
                Add Module
                </button>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                >
                Upload Course
                </button>
            </form>
            </div>
    </div>
  );
};

export default UploadCourse;
