import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../topbar/Topbar';
import axios from 'axios';
import { requestUrls } from '../utility/utility';
import { useParams } from 'react-router';
import { useToken } from '../auth/useToken';





const Player = () => {

  const {_id} = useParams();

  const [videos, setVideos] = useState([]);

  const [currentUrl, setCurrentUrl] = useState("");

  const [courseName, setCoursename] = useState("Loading....");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [token, setToken] = useToken();

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    //console.log(selectedVideo)
  };


  const VideoList = ({ CourseName, videos, onSelectVideo }) => {
    return (
      <div className="w-1/4 h-screen p-4">
        <div className="bg-gray-200 p-4 h-full rounded-lg">
        <h2 className="text-lg font-semibold mb-4">{CourseName}</h2>
        <ul>
          { videos.map((video, index) => (
            <li
              key={index}
              className="bg-blue-500 px-3 cursor-pointer mb-2 text-white p-2 rounded-lg"
              onClick={() => onSelectVideo(video)}
            >
              {video.name}
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  };
  
  const VideoPlayer = ({ selectedVideo }) => {
    console.log(selectedVideo)
    if(selectedVideo){
      axios.post(requestUrls.getWatchKeydetails, {
        jwt: token,
        _id: _id,
        keys: [selectedVideo.moduleNumber]
      }).then((r) => {
        // console.log(r.data[selectedVideo.moduleNumber]);
        setCurrentUrl("http://localhost:9999/quickBucket/watch/?token="+r.data[selectedVideo.moduleNumber])
      }).catch((e) => {
        //console.log(e);
      })
    }
    return (<div className="w-3/4 p-4">
      {
        selectedVideo && (
          <div>
          <div className="aspect-w-16 aspect-h-9">
          <video className='rounded-lg' width="100%" controls >
              <source src={currentUrl} type="video/mp4"/>
          </video>
          </div>
          <h2 className="text-lg font-semibold mb-4">{selectedVideo.name}</h2>
          <p className="mb-4">{selectedVideo.description}</p>
      </div>
        )
      }
    </div>);
  };



  useEffect(() => {
    axios.post(requestUrls.getCoursespecificdetails, {
      "course_details" : {
          "_id": _id
      },
      "jwt": token
  }).then(r => {
    console.log(r.data.course_content);
    console.log(videos)
    setCoursename(r.data.course_name)
    var module = [];
    Object.keys(r.data.course_content).forEach(e => {
      r.data.course_content[e].moduleNumber = e;
      r.data.course_content[e].url = "";
      module.push(r.data.course_content[e]);
    })
  console.log(module)
  setVideos(module);

  
  }).catch(e => {
    if(e.response.status == 401){
      setToken(null);
      window.location.href = '/usr/login/'
    }
  })
  }, [_id])


  return (
    <div>
      <Topbar />
      <div className="flex">
      <VideoList CourseName={courseName} videos={videos} onSelectVideo={handleSelectVideo} />
      <VideoPlayer selectedVideo={selectedVideo} />
    </div>
    </div>
  );
};

export default Player;
