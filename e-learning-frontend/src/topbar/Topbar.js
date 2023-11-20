import { useState } from "react";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";

const Topbar = () => {

  
    const [menu, setMenu] = useState(false);

    const user = useUser();
    const [, setToken] = useToken();

    return (
        <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-800 max-sm:hidden">Your E-Learning Platform</h1>
          <nav>
            <ul className="flex space-x-6">
              <li className="p-1">
                <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li className="p-1">
                <a href="/course/browse/all/" className="text-gray-600 hover:text-gray-800">Courses</a>
              </li>
              <li className="p-1">
                <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li className="p-1">
                <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
              {user == null ? (
                <li className="bg-blue-500 p-1 px-4 rounded-xl max-sm:px-2">
                <a href="/usr/login/" className="text-white hover:text-gray-800">Join Now</a>
                </li>
              ) : (
                <span>
        {menu ? (
        <li
          onClick={() => setMenu(!menu)}
          className="relative inline-block bg-blue-500 rounded-xl">
          <a
            href="#"
            className="text-white px-4 py-2 hover:text-gray-800"
          >
            Hi {user.full_name}
            <span className="pl-1 font-extrabold text-black">^</span>
          </a>
          <div className="absolute bg-white mt-2 py-2 w-36 rounded-md shadow-md overflow-y-auto max-h-40">
            <a className="block px-4 py-2 hover:bg-gray-200" href="#">
              Upload
            </a>
            <a className="block px-4 py-2 hover:bg-gray-200" href="#">
              Watch
            </a>
            <a onClick={() => setToken(null)} className="block px-4 py-2 hover:bg-gray-200" href="#">
              Sign Out
            </a>
          </div>
        </li>
      ) : (
        <li
          onClick={() => setMenu(!menu)}
          className="bg-blue-500 rounded-xl"
        >
          <a
            href="#"
            className="text-white px-4 py-2 hover:text-gray-800"
          >
            Hi {user.full_name} 
            <span className="pl-1 font-extrabold text-black">v</span>
          </a>
          
        </li>
      )}
                </span>

              )}
              </ul>
          </nav>
        </div>
      </header>
    )
}

export default Topbar;