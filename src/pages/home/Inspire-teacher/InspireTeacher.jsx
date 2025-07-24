import React from 'react';
import { FaChalkboardTeacher, FaMoneyBillWave, FaGlobe } from 'react-icons/fa';
import teacherImage from '../../../assets/teacher.jpg'
import { Link } from 'react-router';
const InspireTeacher = () => {
    return (
        <div className="w-11/12 mx-auto bg-white py-16 px-4 md:px-20 flex flex-col md:flex-row items-center gap-10">
            {/* Left Section - Text */}
            <div className="flex-1 text-center md:text-left">
                <p className="text-green-600 font-medium text-sm mb-2 uppercase">Inspire. Educate. Earn</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    Share your knowledge <br /> and inspire learners worldwide
                </h2>
                <p className="text-gray-600 mb-6">
                    Join EduGenix as an instructor and reach thousands of eager learners. Teach what you love, build your brand, and earn on your own terms.
                </p>

                {/* Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center">
                        <FaChalkboardTeacher className="text-green-600 text-3xl mb-2" />
                        <p className="text-sm font-semibold">Teach From Anywhere</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
                        <p className="text-sm font-semibold">Earn While You Teach</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaGlobe className="text-green-600 text-3xl mb-2" />
                        <p className="text-sm font-semibold">Global Audience</p>
                    </div>
                </div>

                <Link to="/teacherApply">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                    Become a Teacher
                </button>
                </Link>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1">
                <img src={teacherImage} alt="Teach on EduGenix" className="w-full max-w-md mx-auto rounded-2xl md:mx-0" />
            </div>
        </div>
    );
};

export default InspireTeacher;