import React from 'react';
import missionimg from '../../assets/graduates.jpg'
const Mission = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 drop-shadow-lg">
          On a mission to teach Millions
        </h2>

        {/* Main Card containing both Image and Description */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            {/* Left Side: Mission Description */}
            <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-12"> {/* Increased padding for better spacing */}
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Empowering Minds, Shaping Futures
              </h3>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                At EduGenix, our mission is to provide accessible, high-quality education that empowers individuals to achieve their full potential. We believe in fostering a vibrant learning community where knowledge is shared, skills are honed, and dreams are realized.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We are committed to bridging the gap between aspiring learners and expert educators, offering a diverse range of courses designed to meet the evolving demands of the modern world. Our goal is to inspire lifelong learning and create a positive impact on society through education.
              </p>
              
            </div>

            {/* Right Side: Relevant Image */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-0">
              <img
                src={missionimg}
                alt="Our Mission - Empowering Education"
                className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[400px] lg:max-h-[500px]" // Adjusted max-heights and removed border/rotation
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;