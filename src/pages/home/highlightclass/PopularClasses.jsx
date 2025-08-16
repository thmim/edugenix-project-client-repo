
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaTag } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router';
import Loading from '../../shared/loading/Loading';

const PopularClasses = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate(); // Initialize useNavigate

  const { data: popularClasses = [], isLoading, error } = useQuery({
    queryKey: ['popularClasses'],
    queryFn: async () => {
      const res = await axiosInstance.get('/classes/popular');
      return res.data;
    },
    // staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    // cacheTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
  });
  console.log(popularClasses)

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 text-center text-red-500">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">Popular Classes</h2>
        <p>Error loading classes: {error.message}</p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  if (popularClasses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 text-center text-gray-600">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">Popular Classes</h2>
        <p className="text-lg">No popular classes available yet. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-lg">
          Our Most Popular Classes
        </h2>

        {/* Grid Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out  border border-gray-300 flex flex-col p-3"
            >
              {/* Class Image */}
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={
                    cls.image ||
                    `https://placehold.co/400x250/4F46E5/FFFFFF?text=${encodeURIComponent(
                      cls.title || 'Class Image'
                    )}`
                  }
                  alt={cls.title || 'Class Image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x250/9CA3AF/FFFFFF?text=Image+Unavailable`;
                  }}
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                {/* Class Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
                  {cls.title || 'Untitled Class'}
                </h3>

                {/* Instructor Name */}
                <p className="text-sm text-indigo-600 font-medium mb-3">
                  By {cls.name || 'Unknown Instructor'}
                </p>

                {/* Price and Enrollment Count */}
                <div className="flex justify-between items-center mb-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-1">
                    <FaTag className="text-green-500 text-base" />
                    <span className="font-semibold">${cls.price || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-blue-500 text-base" />
                    <span className="font-medium">{cls.enrollmentCount || 0} Students</span>
                  </div>
                </div>

                {/* Class Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {cls.description || 'No description available.'}
                </p>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`enroll/${cls._id}`)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 shadow-sm hover:shadow-md mt-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularClasses;