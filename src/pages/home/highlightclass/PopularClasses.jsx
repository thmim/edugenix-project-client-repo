// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { FaUsers, FaTag } from 'react-icons/fa';
// import useAxios from '../../../hooks/useAxios';
// import Loading from '../../shared/loading/Loading';
// import { useNavigate } from 'react-router';

// const PopularClasses = () => {
//   const axiosInstance = useAxios();
// const navigate = useNavigate();
//   const { data: popularClasses = [], isLoading, error } = useQuery({
//     queryKey: ['popularClasses'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/classes/popular');
//       return res.data;
//     },
    
//   });

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto py-10 px-4 text-center text-red-500">
//         <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">Popular Classes</h2>
//         <p>Error loading classes: {error.message}</p>
//         <p className="text-gray-500 mt-2">Please try again later.</p>
//       </div>
//     );
//   }

//   if (popularClasses.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto py-10 px-4 text-center text-gray-600">
//         <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">Popular Classes</h2>
//         <p className="text-lg">No popular classes available yet. Check back later!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-5xl font-extrabold text-center mb-16 text-blue-800 drop-shadow-lg">
//           Our Most Popular Classes
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {popularClasses.map((cls) => (
//             <div
//               key={cls._id}
//               className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200"
//             >
//               {/* Class Image */}
//               <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={cls.image || `https://placehold.co/600x400/4F46E5/FFFFFF?text=${encodeURIComponent(cls.title || 'Class Image')}`}
//                   alt={cls.title || 'Class Image'}
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/9CA3AF/FFFFFF?text=Image+Unavailable`; }}
//                 />
//               </div>

//               <div className="p-7">
//                 {/* Class Title */}
//                 <h3 className="text-3xl font-bold text-gray-800 mb-3 leading-tight">
//                   {cls.title || 'Untitled Class'}
//                 </h3>

//                 {/* Instructor Name */}
//                 <p className="text-lg text-indigo-600 font-semibold mb-4">
//                   By {cls.name || 'Unknown Instructor'}
//                 </p>

//                 {/* Price and Enrollment Count */}
//                 <div className="flex justify-between items-center mb-6 text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <FaTag className="text-green-500 text-xl" />
//                     <span className="text-2xl font-bold">${cls.price || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaUsers className="text-blue-500 text-xl" />
//                     <span className="text-xl font-semibold">{cls.enrollmentCount || 0} Students</span>
//                   </div>
//                 </div>

//                 {/* Class Description (truncated) */}
//                 <p className="text-gray-600 text-base mb-6 line-clamp-3">
//                   {cls.description || 'No description available.'}
//                 </p>

//                 {/* View Details Button */}
//                 <button
//                   onClick={() => navigate(`enroll/${cls._id}`)} // 
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 shadow-md hover:shadow-lg"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularClasses;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaTag } from 'react-icons/fa';
// import useAxios from '../../../hooks/useAxios';
// import Loading from '../../shared/loading/Loading';
// import { useNavigate } from 'react-router-dom'; // useNavigate from react-router-dom

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
  });

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-blue-800 drop-shadow-lg">
          Our Most Popular Classes
        </h2>

        {/* Swiper Slider Component */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30} // Space between slides
          slidesPerView={1} // Default: show 1 slide
          loop={true} // Enable infinite loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true} // Enable navigation arrows
          className="myPopularClassesSwiper p-4 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200"
          breakpoints={{
            // when window width is >= 640px (sm breakpoint)
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 1024px (lg breakpoint)
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {popularClasses.map((cls) => (
            <SwiperSlide key={cls._id} className="py-4"> {/* Add vertical padding for slide */}
              <div
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200 h-full flex flex-col" // h-full and flex-col for consistent card height
              >
                {/* Class Image */}
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={cls.image || `https://placehold.co/600x400/4F46E5/FFFFFF?text=${encodeURIComponent(cls.title || 'Class Image')}`}
                    alt={cls.title || 'Class Image'}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/9CA3AF/FFFFFF?text=Image+Unavailable`; }}
                  />
                </div>

                <div className="p-7 flex flex-col flex-grow"> {/* flex-grow to push button to bottom */}
                  {/* Class Title */}
                  <h3 className="text-3xl font-bold text-gray-800 mb-3 leading-tight">
                    {cls.title || 'Untitled Class'}
                  </h3>

                  {/* Instructor Name */}
                  <p className="text-lg text-indigo-600 font-semibold mb-4">
                    By {cls.name || 'Unknown Instructor'}
                  </p>

                  {/* Price and Enrollment Count */}
                  <div className="flex justify-between items-center mb-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-green-500 text-xl" />
                      <span className="text-2xl font-bold">${cls.price || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-500 text-xl" />
                      <span className="text-xl font-semibold">{cls.enrollmentCount || 0} Students</span>
                    </div>
                  </div>

                  {/* Class Description (truncated) */}
                  <p className="text-gray-600 text-base mb-6 line-clamp-3 flex-grow"> {/* flex-grow to fill space */}
                    {cls.description || 'No description available.'}
                  </p>

                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`enroll/${cls._id}`)} // Use navigate for routing
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 shadow-md hover:shadow-lg mt-auto" // mt-auto to push button to bottom
                  >
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularClasses;