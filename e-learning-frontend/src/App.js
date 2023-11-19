import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import Login from './user/Login';
import UploadCourse from './courses/UploadCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/usr/login/' element={<Login />} />
        <Route path='/course/upload/' element={<UploadCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
