
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; 
import { FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import useAxios from '../../../hooks/useAxios';

const FeedBack = () => {
  const axiosInstance = useAxios();

  const { data: allreviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosInstance.get('/all-feedback');
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000,
  });

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 text-center text-red-500">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">What Our Students Say</h2>
        <p>Error loading reviews: {error.message}</p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  // Handle no reviews available
  if (allreviews.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">What Our Students Say</h2>
        <p className="text-lg">No reviews available yet. Be the first to share your feedback!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700 drop-shadow-md">
        What Our Students Say
      </h2>

      <Swiper
        
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30} 
        slidesPerView={1} 
        loop={true} 
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }} 
        navigation={true}
        className="mySwiper p-4 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100" 
      >
        {allreviews.map((review) => (
          <SwiperSlide key={review._id} className="py-8 px-4"> 
            <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 h-full"> 
              <img
                src={review.image || 'https://placehold.co/100x100/A78BFA/FFFFFF?text=User'} 
                alt={review.studentName || 'Student Avatar'}
                className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-blue-500 mb-6 transform hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/9CA3AF/FFFFFF?text=User'; }} 
              />

              {/* Student Name */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                {review.studentName || 'Anonymous User'}
              </h3>

              {/* Review Description */}
              <p className="text-gray-700 text-base md:text-lg italic mb-6 max-w-2xl">
                "{review.description || 'No feedback provided.'}"
              </p>

              {/* Rating Stars */}
              <div className="flex justify-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? 'text-yellow-500 text-2xl' : 'text-gray-300 text-2xl'
                    }
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedBack;
