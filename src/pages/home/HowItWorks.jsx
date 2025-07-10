import React from 'react';
import { FaSearch, FaClipboardCheck, FaCertificate } from 'react-icons/fa';
import { Fade, Zoom } from 'react-awesome-reveal';

const HowItWorks = () => {
    return (
        <div className="w-full bg-[#f9fafb] py-16 px-4 md:px-20">
            <div className="max-w-6xl mx-auto text-center">
                {/* Title Section */}
                <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        How EduGenix Works
                    </h2>
                    <p className="text-gray-600 text-md md:text-lg mb-12">
                        Learning with EduGenix is simple, seamless, and structured for success.
                        Follow these 3 easy steps and begin your journey today.
                    </p>
                </Fade>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {/* Step 1 */}
                    <Zoom triggerOnce delay={100}>
                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                            <div className="bg-green-100 text-green-600 p-4 rounded-full inline-block mb-4">
                                <FaSearch className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Find Your Course</h3>
                            <p className="text-gray-600">
                                Browse our extensive library and choose the course that matches your passion, career goals, or curiosity.
                            </p>
                        </div>
                    </Zoom>

                    {/* Step 2 */}
                    <Zoom triggerOnce delay={200}>
                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                            <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                                <FaClipboardCheck className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Book a Seat</h3>
                            <p className="text-gray-600">
                                Enroll with ease and reserve your spot in the course. Learn at your own pace, anytime, anywhere.
                            </p>
                        </div>
                    </Zoom>

                    {/* Step 3 */}
                    <Zoom triggerOnce delay={300}>
                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full inline-block mb-4">
                                <FaCertificate className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Get Certified</h3>
                            <p className="text-gray-600">
                                Complete the course and earn a recognized certificate to showcase your achievement and boost your resume.
                            </p>
                        </div>
                    </Zoom>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
