import React from 'react';
import bannerImage from '../../../assets/banner image.jpg'
import {  FaBookOpen, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';
const Banner = () => {
    return (
         <div className="w-full min-h-[80vh] bg-[#f0fdf4] py-10 px-4 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
                <p className="text-green-700 font-medium text-sm mb-2">Begin your journey with EduGenix</p>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                    Learn anytime, anywhere, <br />
                    and shape your <span className="text-blue-600 relative inline-block">
                        future
                        <span className="block h-1 bg-blue-500 w-full mt-1 rounded-full"></span>
                    </span>
                </h1>
                <p className="text-gray-600 mb-6">
                    Master the skills you need to grow with thousands of expert-led courses and hands-on projects. All in one place.
                </p>

                {/*  Button */}
                <Link to="/allPaidClasses">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-6">
                    Browse Courses
                </button>
                </Link>

                {/* Search Bar */}
                <div className="w-full max-w-xl mx-auto md:mx-0">
                    <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                        <FaSearch className="text-gray-400 text-lg mr-2" />
                        <input
                            type="text"
                            placeholder="Search for courses, topics, skills..."
                            className="flex-grow focus:outline-none text-gray-800"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full ml-2 transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 relative flex justify-center items-center">
                <img src={bannerImage} alt="Banner" className="max-w-[300px] md:max-w-[400px] lg:max-w-[480px] w-full h-auto" />

            </div>
        </div>
    );
};

export default Banner;