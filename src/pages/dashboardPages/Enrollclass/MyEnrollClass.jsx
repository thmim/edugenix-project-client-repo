import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/loading/Loading';
import { Link } from 'react-router';

const MyEnrollClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

   const { data: enrolledClasses = [], isPending, error } = useQuery({
    queryKey: ['enrolledClasses', user?.email],
    queryFn: async () => {
            if (!user?.email) {
        return [];
      }
            const res = await axiosSecure.get(`/enrolled-classes/${user.email}`);
      return res.data;
    },
       enabled: !!user?.email,
  });

   if (isPending) {
       return <Loading></Loading>;
  }

    if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error loading enrolled classes: {error.message}
        </p>
      </div>
    );
  }

  //  const handleContinue = (courseTitle) => {
  //   console.log(`Continuing to class: ${courseTitle}`);
  //     };
      // console.log(enrolledClasses)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 lg:p-10">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-sm">
        Your Enrolled Classes
      </h2>

      {enrolledClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg p-8">
          <svg className="w-24 h-24 text-indigo-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-2xl font-semibold text-gray-700">
            You haven't enrolled in any classes yet.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Explore our courses and start your learning journey!
          </p>
                 </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledClasses.map(cls => (
            <div
              key={cls._id}
               
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
            >
             
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={cls.courseImage || `https://placehold.co/600x400/3B82F6/FFFFFF?text=${encodeURIComponent(cls.courseTitle || 'Class Image')}`}
                  alt={cls.courseTitle || 'Class Image'}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/6B7280/FFFFFF?text=Image+Unavailable`; }}
                />
              </div>

              <div className="p-6">
               
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                  {cls.courseTitle || 'Unknown Class'}
                </h3>
                
                <p className="text-lg text-indigo-600 font-medium mb-4">
                  By {cls.instructorName || 'Unknown Instructor'}
                </p>

                                <div className="text-gray-600 text-sm mb-4 space-y-1">
                  <p>
                    <span className="font-semibold">Transaction ID:</span> {cls.transactionId ? cls.transactionId.substring(0, 10) + '...' : 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Amount Paid:</span> ${cls.amount ? cls.amount.toFixed(2) : 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Enrolled On:</span> {cls.paid_at ? new Date(cls.paid_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                 {/* Continue button */}
                 <Link to={`/dashboard/assignments/${cls.courseId}`}>
                 <button
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 shadow-md hover:shadow-lg"
                >
                  Continue Learning
                </button>
                 
                 </Link>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollClass;