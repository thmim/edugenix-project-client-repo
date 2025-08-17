import React from 'react';
import { FaUser, FaEnvelope, FaImage } from 'react-icons/fa'; // Added FaImage

const ContactUs = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row w-full max-w-5xl">
                {/* Left Section: Information & Visuals */}
                <div 
                    className="lg:w-1/2 p-10 text-white relative flex flex-col justify-center items-center bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://i.ibb.co.com/3Yr085HX/medium-shot-kid-taking-notes.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900 opacity-80 z-0"></div>
                    <h2 className="text-4xl font-bold mb-4 z-10">Get in Touch 👋</h2>
                    <p className="text-center mb-6 z-10 opacity-90">
                        We'd love to hear from you! Send us a message and we'll get back to you as soon as we can.
                    </p>
                    <div className="space-y-4 text-center z-10">
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.893 5.262a2 2 0 002.214 0L21 8m-17 4v8a2 2 0 002 2h12a2 2 0 002-2v-8m-14 0h16" />
                            </svg>
                            <span>contact@edugenix.com</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                            </svg>
                            <span>123 Edugenix Avenue, Dhaka</span>
                        </div>
                    </div>
                </div>

                {/* Right Section: The Form */}
                <div className="lg:w-1/2 p-10">
                    <form className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500 transition duration-300"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500 transition duration-300"
                                placeholder="Email Address"
                            />
                        </div>
                        {/* <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaImage className="text-gray-400" />
                            </div>
                            <input
                                type="file"
                                id="image"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500 transition duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                accept="image/*"
                            />
                        </div> */}
                        <div className="relative">
                            <textarea
                                id="message"
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500 transition duration-300"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;