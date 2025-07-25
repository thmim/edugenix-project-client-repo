import React from 'react';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBook, FaClipboardList } from 'react-icons/fa';
import image from '../../../assets/learning.jpg'
import useAxios from '../../../hooks/useAxios';
import Loading from '../../shared/loading/Loading';
const HomePageStats = () => {
  const axiosInstance = useAxios();

  const { data: stats = {}, isLoading, error } = useQuery({
    queryKey: ['homepageStats'],
    queryFn: async () => {
      const res = await axiosInstance.get('/total-count');
      return res.data;
    },
    // staleTime: 10 * 60 * 1000,
    // cacheTime: 60 * 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Our Achievements</h2>
          <p>Error loading statistics: {error.message}</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!stats || (stats.totalUsers === undefined && stats.totalClasses === undefined && stats.totalEnrollments === undefined)) {
    return (
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Our Achievements</h2>
          <p className="text-lg">Statistics are not available yet. Please check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 drop-shadow-lg">
          Our Achievements in Numbers
        </h2>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Statistics Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {/* Total Users Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <FaUsers className="text-blue-600 text-6xl mx-auto mb-5" />
              <p className="text-gray-700 text-2xl font-semibold mb-2">Total Users</p>
              <CountUp
                end={stats.totalUsers || 0}
                duration={2.5}
                className="text-blue-800 text-6xl font-extrabold"
              />
            </div>

            {/* Total Classes Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 border border-indigo-100">
              <FaBook className="text-indigo-600 text-6xl mx-auto mb-5" />
              <p className="text-gray-700 text-2xl font-semibold mb-2">Total Classes</p>
              <CountUp
                end={stats.totalClasses || 0}
                duration={2.5}
                className="text-indigo-800 text-6xl font-extrabold"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center sm:col-span-2 lg:col-span-1 mx-auto w-full sm:max-w-md lg:max-w-none transform hover:scale-105 transition-transform duration-300 border border-green-100">
              <FaClipboardList className="text-green-600 text-6xl mx-auto mb-5" />
              <p className="text-gray-700 text-2xl font-semibold mb-2">Total Enrollments</p>
              <CountUp
                end={stats.totalEnrollments || 0}
                duration={2.5}
                className="text-green-800 text-6xl font-extrabold"
              />
            </div>
          </div>

          {/* Right Side: Website Relevant Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-0">
            <img
              src={image}
              alt="Website Showcase"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[500px] border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageStats;