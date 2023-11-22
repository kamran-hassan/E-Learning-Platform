import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import Login from './user/Login';
import UploadCourse from './courses/UploadCourse';
import AllCourses  from './courses/AllCourses';
import CourseModulesPage from './courses/CourseModulesPage';
import Player from './courses/Player';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/usr/login/' element={<Login />} />
        <Route path='/course/upload/' element={<UploadCourse />} />
        <Route path='/course/browse/all/' element={<AllCourses />} />
        <Route path='/course/watch/:_id' element={<Player />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
