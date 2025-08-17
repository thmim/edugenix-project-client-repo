import React from 'react';
import { Link } from 'react-router';
import errorimg from '../assets/error.png'

const Error = () => {
    return (
         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <div className=" p-4 rounded-full">
            <img src={errorimg} alt="" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
    );
};

export default Error;