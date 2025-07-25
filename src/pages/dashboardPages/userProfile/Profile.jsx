import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';
import { FaEnvelope, FaUser, FaUserTag } from 'react-icons/fa';
import { FaPhoneVolume } from 'react-icons/fa6';

const Profile = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 sm:p-8 lg:p-10 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 transform transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
          My Profile
        </h2>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-8">
          <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl border-4 border-indigo-500 bg-gray-200 flex items-center justify-center">
            <img
              src={userData.image || 'https://placehold.co/144x144/A78BFA/FFFFFF?text=User'}
              alt={userData.name || 'User Profile'}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/144x144/9CA3AF/FFFFFF?text=User'; }} 
            />
          </div>
        </div>

        {/* User Info Details */}
        <div className="space-y-5 text-gray-700">
          <p className="flex items-center gap-4 text-xl md:text-2xl font-semibold">
            <FaUser className="text-indigo-500 text-2xl" />
            <span className="text-gray-800">{userData.name || 'N/A'}</span>
          </p>

          <p className="flex items-center gap-4 text-lg md:text-xl">
            <FaEnvelope className="text-blue-500 text-2xl" />
            <span className="text-gray-700">{userData.email || 'N/A'}</span>
          </p>

          <p className="flex items-center gap-4 text-lg md:text-xl">
            <FaUserTag className="text-green-500 text-2xl" />
            <span className="text-gray-700 capitalize">{userData.role || 'N/A'}</span>
          </p>
          <p className="flex items-center gap-4 text-lg md:text-xl">
            <FaPhoneVolume className="text-green-500 text-2xl" />
            <span className="text-gray-700 capitalize">{userData.phone || 'N/A'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;