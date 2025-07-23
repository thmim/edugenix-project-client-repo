import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBook, FaClipboardList } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/loading/Loading';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure(); 

  const { data: stats = {}, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/total-count'); 
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading dashboard stats: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Total Users Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
          <FaUsers className="text-blue-500 text-5xl mb-4" />
          <p className="text-gray-600 text-xl font-medium">Total Users</p>
          <p className="text-blue-700 text-5xl font-extrabold mt-2">
            {stats.totalUsers !== undefined ? stats.totalUsers : 'N/A'}
          </p>
        </div>

        {/* Total Classes Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 border border-indigo-100">
          <FaBook className="text-indigo-500 text-5xl mb-4" />
          <p className="text-gray-600 text-xl font-medium">Total Classes</p>
          <p className="text-indigo-700 text-5xl font-extrabold mt-2">
            {stats.totalClasses !== undefined ? stats.totalClasses : 'N/A'}
          </p>
        </div>

        {/* Total Enrollments Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 border border-green-100">
          <FaClipboardList className="text-green-500 text-5xl mb-4" />
          <p className="text-gray-600 text-xl font-medium">Total Enrollments</p>
          <p className="text-green-700 text-5xl font-extrabold mt-2">
            {stats.totalEnrollments !== undefined ? stats.totalEnrollments : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;