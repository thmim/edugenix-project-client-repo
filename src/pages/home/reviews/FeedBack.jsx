
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay, Navigation } from 'swiper/modules'; 
// import { FaStar } from 'react-icons/fa';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../shared/loading/Loading';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; 
// import useAxios from '../../../hooks/useAxios';

// const FeedBack = () => {
//   const axiosInstance = useAxios();

//   const { data: allreviews = [], isLoading, error } = useQuery({
//     queryKey: ['reviews'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/all-feedback');
//       return res.data;
//     },
//     staleTime: 5 * 60 * 1000, 
//     cacheTime: 30 * 60 * 1000,
//   });

//   // Handle loading state
//   if (isLoading) {
//     return <Loading />;
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="max-w-5xl mx-auto py-10 px-4 text-center text-red-500">
//         <h2 className="text-3xl font-bold mb-8 text-blue-700">What Our Students Say</h2>
//         <p>Error loading reviews: {error.message}</p>
//         <p className="text-gray-500 mt-2">Please try again later.</p>
//       </div>
//     );
//   }

//   // Handle no reviews available
//   if (allreviews.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto py-10 px-4 text-center text-gray-600">
//         <h2 className="text-3xl font-bold mb-8 text-blue-700">What Our Students Say</h2>
//         <p className="text-lg">No reviews available yet. Be the first to share your feedback!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-md">
//         What Our Students Say
//       </h2>

//       <Swiper
        
//         modules={[Pagination, Autoplay, Navigation]}
//         spaceBetween={30} 
//         slidesPerView={1} 
//         loop={true} 
//         autoplay={{
//           delay: 4000, 
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }} 
//         navigation={true}
//         className="mySwiper p-4 rounded-3xl shadow-2xl border-blue-100" 
//       >
//         {allreviews.map((review) => (
//           <SwiperSlide key={review._id} className="py-8 px-4"> 
//             <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 h-full"> 
//               <img
//                 src={review.image || 'https://placehold.co/100x100/A78BFA/FFFFFF?text=User'} 
//                 alt={review.studentName || 'Student Avatar'}
//                 className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-blue-500 mb-6 transform hover:scale-105 transition-transform duration-300"
//                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/9CA3AF/FFFFFF?text=User'; }} 
//               />

//               {/* Student Name */}
//               <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
//                 {review.studentName || 'Anonymous User'}
//               </h3>

//               {/* Review Description */}
//               <p className="text-gray-700 text-base md:text-lg italic mb-6 max-w-2xl">
//                 "{review.description || 'No feedback provided.'}"
//               </p>

//               {/* Rating Stars */}
//               <div className="flex justify-center gap-1.5">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={
//                       i < review.rating ? 'text-yellow-500 text-2xl' : 'text-gray-300 text-2xl'
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default FeedBack;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../../hooks/useAxios';

const SectionHeader = () => (
  <div className="mb-12 text-center">
    <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
      Testimonials
    </span>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
      What Our{' '}
      <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Students Say
      </span>
    </h2>
    <p className="mx-auto mt-3 max-w-xl text-slate-600">
      Real feedback from learners who are growing their skills with EduGenix.
    </p>
  </div>
);

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
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <SectionHeader />
        <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-6">
          <p className="font-semibold text-red-600">Error loading reviews: {error.message}</p>
          <p className="mt-2 text-sm text-slate-500">Please try again later.</p>
        </div>
      </section>
    );
  }

  // Handle no reviews available
  if (allreviews.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <SectionHeader />
        <p className="text-lg text-slate-600">
          No reviews available yet. Be the first to share your feedback!
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/60 to-white px-4 py-16">
      {/* Swiper theme overrides */}
      <style>{`
        .edu-feedback {
          --swiper-theme-color: #10b981;
          --swiper-navigation-size: 16px;
          padding: 8px 8px 56px;
        }
        .edu-feedback .swiper-pagination-bullet {
          width: 10px; height: 10px; background: #a7f3d0; opacity: 1;
          transition: all 0.3s;
        }
        .edu-feedback .swiper-pagination-bullet-active {
          width: 28px; border-radius: 9999px;
          background: linear-gradient(90deg, #10b981, #06b6d4);
        }
        .edu-feedback .swiper-button-prev,
        .edu-feedback .swiper-button-next {
          width: 44px; height: 44px; border-radius: 9999px;
          background: #fff; box-shadow: 0 8px 24px rgba(16,185,129,0.25);
          top: auto; bottom: 0; margin-top: 0;
          transition: transform 0.3s;
        }
        .edu-feedback .swiper-button-prev { left: auto; right: 64px; }
        .edu-feedback .swiper-button-next { right: 8px; }
        .edu-feedback .swiper-button-prev:hover,
        .edu-feedback .swiper-button-next:hover { transform: scale(1.1); }
        @media (max-width: 640px) {
          .edu-feedback .swiper-button-prev,
          .edu-feedback .swiper-button-next { display: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader />

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={allreviews.length > 3}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="edu-feedback"
        >
          {allreviews.map((review) => (
            <SwiperSlide key={review._id} style={{ height: 'auto' }}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/15">
                {/* Quote icon */}
                <span className="absolute -top-4 right-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg text-white shadow-lg shadow-emerald-500/30 transition-transform duration-500 group-hover:rotate-12">
                  <FaQuoteLeft />
                </span>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-amber-400' : 'text-slate-200'}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="mt-4 flex-grow leading-relaxed text-slate-600">
                  {review.description || 'No feedback provided.'}
                </p>

                {/* Student */}
                <div className="mt-6 flex items-center gap-4 border-t border-dashed border-slate-200 pt-5">
                  <span className="rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-[3px]">
                    <img
                      src={review.image || 'https://placehold.co/100x100/A78BFA/FFFFFF?text=User'}
                      alt={review.studentName || 'Student Avatar'}
                      className="h-14 w-14 rounded-full border-2 border-white object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x100/9CA3AF/FFFFFF?text=User';
                      }}
                    />
                  </span>
                  <div>
                    <h3 className="font-bold leading-tight text-slate-900">
                      {review.studentName || 'Anonymous User'}
                    </h3>
                    <p className="text-sm text-emerald-600">EduGenix Student</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedBack;