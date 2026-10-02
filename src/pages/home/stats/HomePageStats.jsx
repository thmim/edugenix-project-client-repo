// import React from 'react';
// import CountUp from 'react-countup';
// import { useQuery } from '@tanstack/react-query';
// import { FaUsers, FaBook, FaClipboardList } from 'react-icons/fa';
// import image from '../../../assets/learning.jpg'
// import useAxios from '../../../hooks/useAxios';
// import Loading from '../../shared/loading/Loading';
// const HomePageStats = () => {
//   const axiosInstance = useAxios();

//   const { data: stats = {}, isLoading, error } = useQuery({
//     queryKey: ['homepageStats'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/total-count');
//       return res.data;
//     },
//     // staleTime: 10 * 60 * 1000,
//     // cacheTime: 60 * 60 * 1000,
//   });

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center text-red-500">
//           <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Achievements</h2>
//           <p>Error loading statistics: {error.message}</p>
//           <p className="text-gray-500 mt-2">Please try again later.</p>
//         </div>
//       </section>
//     );
//   }

//   if (!stats || (stats.totalUsers === undefined && stats.totalClasses === undefined && stats.totalEnrollments === undefined)) {
//     return (
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center text-gray-600">
//           <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Achievements</h2>
//           <p className="text-lg">Statistics are not available yet. Please check back later!</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-5xl font-bold text-center mb-16 text-gray-800 drop-shadow-lg">
//           Our Achievements in Numbers
//         </h2>

//         <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
//           {/* Left Side: Statistics Cards */}
//           <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
//             {/* Total Users Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
//               <FaUsers className="text-blue-600 text-6xl mx-auto mb-5" />
//               <p className="text-gray-700 text-2xl font-semibold mb-2">Total Users</p>
//               <CountUp
//                 end={stats.totalUsers || 0}
//                 duration={2.5}
//                 className="text-blue-800 text-6xl font-extrabold"
//               />
//             </div>

//             {/* Total Classes Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 border border-indigo-100">
//               <FaBook className="text-indigo-600 text-6xl mx-auto mb-5" />
//               <p className="text-gray-700 text-2xl font-semibold mb-2">Total Classes</p>
//               <CountUp
//                 end={stats.totalClasses || 0}
//                 duration={2.5}
//                 className="text-indigo-800 text-6xl font-extrabold"
//               />
//             </div>

//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center sm:col-span-2 lg:col-span-1 mx-auto w-full sm:max-w-md lg:max-w-none transform hover:scale-105 transition-transform duration-300 border border-green-100">
//               <FaClipboardList className="text-green-600 text-6xl mx-auto mb-5" />
//               <p className="text-gray-700 text-2xl font-semibold mb-2">Total Enrollments</p>
//               <CountUp
//                 end={stats.totalEnrollments || 0}
//                 duration={2.5}
//                 className="text-green-800 text-6xl font-extrabold"
//               />
//             </div>
//           </div>

//           {/* Right Side: Website Relevant Image */}
//           <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-0">
//             <img
//               src={image}
//               alt="Website Showcase"
//               className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[500px] border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomePageStats;



import React from 'react';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBook, FaClipboardList } from 'react-icons/fa';
import image from '../../../assets/learning.jpg'
import useAxios from '../../../hooks/useAxios';
import Loading from '../../shared/loading/Loading';

const SectionHeader = ({ dark = false }) => (
  <div className="mb-14 text-center">
    <span
      className={`inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${
        dark
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      Our Impact
    </span>
    <h2 className={`mt-4 text-3xl font-extrabold tracking-tight md:text-5xl ${dark ? 'text-white' : 'text-slate-900'}`}>
      Our Achievements{' '}
      <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
        in Numbers
      </span>
    </h2>
    <p className={`mx-auto mt-3 max-w-xl ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
      A growing community of learners and teachers building skills together.
    </p>
  </div>
);

const HomePageStats = () => {
  const axiosInstance = useAxios();

  const { data: stats = {}, isLoading, error } = useQuery({
    queryKey: ['homepageStats'],
    queryFn: async () => {
      const res = await axiosInstance.get('/total-count');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <SectionHeader />
          <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-6">
            <p className="font-semibold text-red-600">Error loading statistics: {error.message}</p>
            <p className="mt-2 text-sm text-slate-500">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!stats || (stats.totalUsers === undefined && stats.totalClasses === undefined && stats.totalEnrollments === undefined)) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <SectionHeader />
          <p className="text-lg text-slate-600">
            Statistics are not available yet. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  const items = [
    {
      icon: FaUsers,
      label: 'Total Users',
      value: stats.totalUsers || 0,
      gradient: 'from-emerald-400 to-teal-500',
      glow: 'shadow-emerald-500/40',
    },
    {
      icon: FaBook,
      label: 'Total Classes',
      value: stats.totalClasses || 0,
      gradient: 'from-cyan-400 to-blue-500',
      glow: 'shadow-cyan-500/40',
    },
    {
      icon: FaClipboardList,
      label: 'Total Enrollments',
      value: stats.totalEnrollments || 0,
      gradient: 'from-lime-300 to-emerald-500',
      glow: 'shadow-lime-400/40',
    },
  ];

  return (
    <section
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Local animation styles */}
      <style>{`
        @keyframes eduPulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .edu-ring { animation: eduPulseRing 2.4s ease-out infinite; }
        @keyframes eduDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -25px); }
        }
        .edu-drift { animation: eduDrift 9s ease-in-out infinite; }
      `}</style>

      {/* Dark overlay + glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-emerald-950/90" />
      <div className="edu-drift pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="edu-drift pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl [animation-delay:3s]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader dark />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map(({ icon: Icon, label, value, gradient, glow }, i) => (
            <div
              key={label}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 ${
                i === 2 ? 'sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-1 lg:max-w-none' : ''
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`} />

              {/* Icon with pulsing ring */}
              <div className="relative mx-auto mb-6 h-20 w-20">
                <span className={`edu-ring absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient}`} />
                <span
                  className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-3xl text-white shadow-xl ${glow} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon />
                </span>
              </div>

              <p className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                <CountUp
                  end={value}
                  duration={2.5}
                  separator=","
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageStats;