import { useState } from 'react';
import Topbar from '../topbar/Topbar';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { requestUrls } from '../utility/utility';

const UploadCourse = () => {
  const [token, setToken] = useToken();
  const [saveModule, setSaveModule] = useState(false);
  const [uploadKey, setUploadKey] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    modules: [
    ],
    created: false
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
      modules: [...courseData.modules, { name: '', shortDescription: '', video: null, uploadProgress : '0%' }]
    });
    console.log(courseData)
  };

  const handleRemoveModule = (index) => {
    const newModules = [...courseData.modules];
    newModules.splice(index, 1);
    setCourseData({ ...courseData, modules: newModules });
  };

  const saveMouleStructure = (e) => {
    e.preventDefault();
    //console.log(courseData);
    e.preventDefault();
    var payload = {
      course_details: {
        _id: courseData._id
      },
      course_content: {

      },
      jwt: token

    }
    for(var i=0; i < courseData.modules.length; i++){
      payload.course_content['m'+(i+1)] = {
        name: courseData.modules[i].name,
        description: courseData.modules[i].shortDescription
      }
    }
    // console.log(courseData,payload)
    axios.post(requestUrls.updateContent, payload).then(r => {
      if(r.status == 200){
        //console.log(r.data);
        const module = {...r.data.course_content}
        Object.keys(module).forEach(m =>{
          courseData.modules[m.charAt(1) - 1].upKey = r.data[m]
        })
        //console.log(courseData);
        setCourseData({...courseData})
        console.log(courseData)
        setSaveModule(false);
        
      }
    }).catch(e => {
      // console.log(e.response.status)
      if(e.response && e.response.status == 401){
        setToken(null);
        window.location.href = '/'
      }
      else{
        console.log(e);
        window.alert("Some Error Occure");
      }
    })
  }

  const uploadVideo = (e, i) => {
    e.preventDefault();
    console.log(courseData)
    if(courseData.modules[i].video != null){
      console.log(courseData.modules[i])
      var formdata = new FormData();
      formdata.append("file", courseData.modules[i].video)
      axios.post(requestUrls.quickBucketUpload, formdata, {
        headers: {
          // Add your JWT token in the Authorization header
          Authorization: 'Bearer '+courseData.modules[i].upKey,
          'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // Handle the upload progress here
            console.log(`Upload Progress: ${percentCompleted}%`);
            courseData.modules[i].uploadProgress = `${percentCompleted}%`;
            setCourseData({...courseData})
            // Update your state or do something with the progress value
            // setProgress(percentCompleted);
          }
        },
      }).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      })
    }
    else{
      window.alert("Please Select a Video File")
    }
  }

  const handleSubmitCreateCourse = (e) => {
    e.preventDefault();
    if(courseData.name != '' && courseData.description != ''){
      const postData = {
        "course_details": {
          "course_name": courseData.name,
          "description": courseData.description,
          "course_content": {}
        },
        "jwt": token
      };
    axios.post(requestUrls.createCourse, postData).then((r) => {
      // console.log(r);
      if(r.status == 200){
        courseData._id = r.data._id;
        setSaveModule(true)
        courseData.created = true;
        handleAddModule();
      }
    }).catch(e => {
      // console.log(e.response.status)
      if(e.response && e.response.status == 401){
        setToken(null);
        window.location.href = '/'
      }
      else{
        console.log(e);
        window.alert("Some Error Occure");
      }
    })
    }
  };

  return (
    <div>
        <Topbar />
        <div className="mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Upload Course</h1>
            <form onSubmit={handleSubmitCreateCourse} className="space-y-4">
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
                    {module.upKey && (
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
                      <p className='p-2 inline-block'> {module.uploadProgress} </p>
                      <button onClick={(e) => uploadVideo(e,index)} className="bg-blue-500 text-white rounded-md mx-2 py-2 px-4 hover:bg-blue-600" > Upload </button>
                      
                      
                      
                      </div>
                    )}
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
                {courseData.created && (
                  <button
                  type="button"
                  onClick={handleAddModule}
                  className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                >
                  Add Module
                </button>
                )}

                {saveModule && (
                  <button
                  onClick={saveMouleStructure} className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                  >
                    Save Modules to Upload Video
                  </button>
                )

                }

                {!courseData.created && (
                  <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                  >
                  Create Course
                  </button>
                )}
            </form>
            </div>
    </div>
  );
};

export default UploadCourse;
