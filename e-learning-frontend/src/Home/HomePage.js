import Topbar from "../topbar/Topbar";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
 
      <Topbar />

      <section className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Empower Yourself Through Learning</h2>
          <p className="text-lg mb-8">Explore our vast library of courses to enhance your skills.</p>
          <a href="#" className="bg-white text-blue-500 px-8 py-4 rounded-full inline-block hover:bg-blue-400 hover:text-white transition duration-300">Start Learning</a>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Quality Content</h3>
              <p className="text-gray-600">Access high-quality courses created by industry experts.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
              <p className="text-gray-600">Learn at your own pace, anytime and anywhere.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Experience</h3>
              <p className="text-gray-600">Engage with interactive content and quizzes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Explore Our Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Course" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Course Title 1</h3>
                <p className="text-gray-600 mb-4">Description of the course goes here.</p>
                <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition duration-300">View Course</a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Course" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Course Title 2</h3>
                <p className="text-gray-600 mb-4">Description of the course goes here.</p>
                <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition duration-300">View Course</a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Course" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Course Title 3</h3>
                <p className="text-gray-600 mb-4">Description of the course goes here.</p>
                <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition duration-300">View Course</a>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg text-gray-800 mb-4">"I absolutely love the courses on this platform. They helped me gain valuable skills that I use in my job every day."</p>

            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg text-gray-800 mb-4">"The instructors are knowledgeable, and the interactive learning experience makes it easier to grasp complex concepts."</p>

            </div>

          </div>
        </div>
      </section>


      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Your E-Learning Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
  
  export default HomePage;