// import React from 'react';

// import bannerImage from '../../../assets/banner image.jpg'
// import {  FaBookOpen, FaSearch } from 'react-icons/fa';
// import { Link } from 'react-router';
// const Banner = () => {
//     return (
//          <div className="w-full min-h-[80vh] py-10 px-4 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
//             {/* Left Content */}
//             <div className="flex-1 text-center md:text-left">
//                 <p className="text-green-600 font-medium text-sm mb-2">Begin your journey with EduGenix</p>
//                 <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
//                     Learn anytime, anywhere, <br />
//                     and shape your <span className="text-blue-600 relative inline-block">
//                         future
//                         <span className="block h-1 bg-blue-500 w-full mt-1 rounded-full"></span>
//                     </span>
//                 </h1>
//                 <p className="text-gray-600 mb-6">
//                     Master the skills you need to grow with thousands of expert-led courses and hands-on projects. All in one place.
//                 </p>

//                 {/*  Button */}
//                 <Link to="/allPaidClasses">
//                 <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-6">
//                     Browse Courses
//                 </button>
//                 </Link>

//                 {/* Search Bar */}
//                 <div className="w-full max-w-xl mx-auto md:mx-0">
//                     <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
//                         <FaSearch className="text-gray-400 text-lg mr-2" />
//                         <input
//                             type="text"
//                             placeholder="Search for courses, topics, skills..."
//                             className="flex-grow focus:outline-none text-gray-800"
//                         />
//                         <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full ml-2 transition">
//                             Search
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Content */}
//             <div className="flex-1 relative flex justify-center items-center">
//                 <img src={bannerImage} alt="Banner" className="max-w-[300px] md:max-w-[400px] lg:max-w-[480px] w-full h-auto" />

//             </div>
//         </div>
//     );
// };

// export default Banner;

import React from 'react';
import { Link } from 'react-router';
import {
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
  FaLaptopCode,
  FaPlay,
  FaStar,
  FaUsers,
} from 'react-icons/fa';

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      {/* Local animation styles */}
      <style>{`
        @keyframes eduFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .edu-float { animation: eduFloat 5s ease-in-out infinite; }
        .edu-float-delay { animation: eduFloat 6s ease-in-out 1s infinite; }
      `}</style>

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#10b98133 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-14 px-4 py-14 md:px-8 lg:flex-row lg:py-20">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Begin your journey with EduGenix
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Learn anytime, anywhere, and{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              shape your future
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 lg:mx-0">
            Master the skills you need to grow with expert-led courses and hands-on
            projects. All in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              to="/allPaidClasses"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
            >
              Browse Courses
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-3.5 font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaPlay className="ml-0.5 text-[10px]" />
              </span>
              Learn at your own pace
            </span>
          </div>

          {/* Highlights */}
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 lg:justify-start">
            {['Expert instructors', 'Hands-on projects', 'Lifetime access'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right visual (pure CSS, no image needed) */}
        <div className="relative flex w-full flex-1 items-center justify-center">
          {/* Main gradient card */}
          <div className="relative h-[340px] w-[300px] rounded-[2.5rem] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6 shadow-2xl shadow-emerald-600/30 sm:h-[400px] sm:w-[360px]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            <div className="relative flex h-full flex-col items-center justify-center text-white">
              <FaGraduationCap className="text-7xl drop-shadow-lg sm:text-8xl" />
              <p className="mt-4 text-2xl font-extrabold">EduGenix</p>
              <p className="text-sm text-white/80">Learn. Build. Grow.</p>
            </div>
          </div>

          {/* Floating: course progress */}
          <div className="edu-float absolute left-0 top-6 w-52 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur sm:-left-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <FaLaptopCode />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">Web Development</p>
                <p className="text-xs text-slate-500">72% completed</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" />
            </div>
          </div>

          {/* Floating: learners */}
          <div className="edu-float-delay absolute bottom-10 right-0 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur sm:-right-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
              <FaUsers />
            </span>
            <div>
              <p className="text-lg font-extrabold leading-none text-slate-800">10K+</p>
              <p className="text-xs text-slate-500">Active learners</p>
            </div>
          </div>

          {/* Floating: rating */}
          <div className="edu-float absolute -bottom-2 left-6 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-xl backdrop-blur">
            <FaStar className="text-amber-400" />
            <span className="text-sm font-bold text-slate-800">4.9</span>
            <span className="text-xs text-slate-500">course rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;