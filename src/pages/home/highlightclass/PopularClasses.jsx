
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { FaUsers, FaTag } from 'react-icons/fa';
// import useAxios from '../../../hooks/useAxios';
// import { useNavigate } from 'react-router';
// import Loading from '../../shared/loading/Loading';

// const PopularClasses = () => {
//   const axiosInstance = useAxios();
//   const navigate = useNavigate(); // Initialize useNavigate

//   const { data: popularClasses = [], isLoading, error } = useQuery({
//     queryKey: ['popularClasses'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/classes/popular');
//       return res.data;
//     },
//     // staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
//     // cacheTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
//   });
//   console.log(popularClasses)

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
//     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-lg">
//           Our Most Popular Classes
//         </h2>

//         {/* Grid Layout */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {popularClasses.map((cls) => (
//             <div
//               key={cls._id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out  border border-gray-300 flex flex-col p-3"
//             >
//               {/* Class Image */}
//               <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden rounded-xl">
//                 <img
//                   src={
//                     cls.image ||
//                     `https://placehold.co/400x250/4F46E5/FFFFFF?text=${encodeURIComponent(
//                       cls.title || 'Class Image'
//                     )}`
//                   }
//                   alt={cls.title || 'Class Image'}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = `https://placehold.co/400x250/9CA3AF/FFFFFF?text=Image+Unavailable`;
//                   }}
//                 />
//               </div>

//               <div className="p-4 flex flex-col flex-grow">
//                 {/* Class Title */}
//                 <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
//                   {cls.title || 'Untitled Class'}
//                 </h3>

//                 {/* Instructor Name */}
//                 <p className="text-sm text-indigo-600 font-medium mb-3">
//                   By {cls.name || 'Unknown Instructor'}
//                 </p>

//                 {/* Price and Enrollment Count */}
//                 <div className="flex justify-between items-center mb-4 text-gray-700 text-sm">
//                   <div className="flex items-center gap-1">
//                     <FaTag className="text-green-500 text-base" />
//                     <span className="font-semibold">${cls.price || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <FaUsers className="text-blue-500 text-base" />
//                     <span className="font-medium">{cls.enrollmentCount || 0} Students</span>
//                   </div>
//                 </div>

//                 {/* Class Description */}
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
//                   {cls.description || 'No description available.'}
//                 </p>

//                 {/* View Details Button */}
//                 <button
//                   onClick={() => navigate(`classes-details/${cls._id}`)}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 shadow-sm hover:shadow-md mt-auto"
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
import { FaArrowRight, FaFire, FaUser } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router';
import Loading from '../../shared/loading/Loading';

const SectionHeader = () => (
  <div className="mb-12 text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
      <FaFire className="text-orange-500" /> Trending Now
    </span>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
      Our Most{' '}
      <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Popular Classes
      </span>
    </h2>
    <p className="mx-auto mt-3 max-w-xl text-slate-600">
      Join thousands of learners in the classes everyone is talking about.
    </p>
  </div>
);

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return null;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const PopularClasses = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: popularClasses = [], isLoading, error } = useQuery({
    queryKey: ['popularClasses'],
    queryFn: async () => {
      const res = await axiosInstance.get('/classes/popular');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <SectionHeader />
        <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-6">
          <p className="font-semibold text-red-600">Error loading classes: {error.message}</p>
          <p className="mt-2 text-sm text-slate-500">Please try again later.</p>
        </div>
      </section>
    );
  }

  if (popularClasses.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <SectionHeader />
        <p className="text-lg text-slate-600">
          No popular classes available yet. Check back later!
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader />

        {/* Compact fixed-width cards, centered */}
        <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,300px))]">
          {popularClasses.map((cls) => {
            const assignments = cls.assignment_count || 0;
            const date = formatDate(cls.createdAt);

            return (
              <article
                key={cls._id}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/15"
              >
                {/* Image with glass chips */}
                <div className="relative h-44 overflow-hidden rounded-2xl">
                  <img
                    src={
                      cls.image ||
                      `https://placehold.co/400x250/10B981/FFFFFF?text=${encodeURIComponent(
                        cls.title || 'Class Image'
                      )}`
                    }
                    alt={cls.title || 'Class Image'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x250/9CA3AF/FFFFFF?text=Image+Unavailable`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                  <div className="absolute inset-x-2.5 bottom-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/30 backdrop-blur-md">
                      {assignments} {assignments === 1 ? 'Assignment' : 'Assignments'}
                    </span>
                    <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/30 backdrop-blur-md">
                      {cls.enrollmentCount || 0} Students
                    </span>
                    {date && (
                      <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/30 backdrop-blur-md">
                        {date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="px-1.5 pb-1.5 pt-3.5">
                  <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-600">
                    {cls.title || 'Untitled Class'}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    by{' '}
                    <span className="font-semibold text-teal-600">
                      {cls.name || 'Unknown Instructor'}
                    </span>
                  </p>

                  {/* Pill + avatar stack */}
                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      <FaFire className="text-orange-500" /> Popular
                    </span>

                    <div className="flex items-center -space-x-2" title="Enrolled students">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] text-white ring-2 ring-white">
                        <FaUser />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-[10px] text-white ring-2 ring-white">
                        <FaUser />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[10px] text-white ring-2 ring-white">
                        <FaUser />
                      </span>
                      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-lime-300 px-1.5 text-[11px] font-bold text-slate-900 ring-2 ring-white">
                        {cls.enrollmentCount || 0}
                      </span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-emerald-600">
                      ${cls.price || 'N/A'}
                      <span className="text-xs font-medium text-slate-400">/course</span>
                    </p>
                    <button
                      onClick={() => navigate(`classes-details/${cls._id}`)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    >
                      View Details
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;