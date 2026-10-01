// import React from 'react';
// import { FaChalkboardTeacher, FaMoneyBillWave, FaGlobe } from 'react-icons/fa';
// import teacherImage from '../../../assets/teacher.jpg'
// import { Link } from 'react-router';
// const InspireTeacher = () => {
//     return (
//         <div className="max-w-7xl mx-auto bg-white py-16 flex flex-col md:flex-row items-center justify-between gap-10">
//             {/* Left Section - Text */}
//             <div className="flex-1 text-center md:text-left">
//                 <p className="text-green-600 font-medium text-sm mb-2 uppercase">Inspire. Educate. Earn</p>
//                 <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
//                     Share your knowledge <br /> and inspire learners worldwide
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                     Join EduGenix as an instructor and reach thousands of eager learners. Teach what you love, build your brand, and earn on your own terms.
//                 </p>

//                 {/* Benefits List */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                     <div className="flex flex-col items-center">
//                         <FaChalkboardTeacher className="text-green-600 text-3xl mb-2" />
//                         <p className="text-sm font-semibold">Teach From Anywhere</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
//                         <p className="text-sm font-semibold">Earn While You Teach</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <FaGlobe className="text-green-600 text-3xl mb-2" />
//                         <p className="text-sm font-semibold">Global Audience</p>
//                     </div>
//                 </div>

//                 <Link to="/teacherApply">
//                 <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
//                     Become a Teacher
//                 </button>
//                 </Link>
//             </div>

//             {/* Right Section - Image */}
//             <div className="flex-1">
//                 <img src={teacherImage} alt="Teach on EduGenix" className="w-full max-w-md mx-auto rounded-2xl md:mx-0" />
//             </div>
//         </div>
//     );
// };

// export default InspireTeacher;


import React from 'react';
import { FaArrowRight, FaChalkboardTeacher, FaGlobe, FaMoneyBillWave } from 'react-icons/fa';
import teacherImage from '../../../assets/teacher.jpg'
import { Link } from 'react-router';

const benefits = [
    {
        icon: FaChalkboardTeacher,
        title: 'Teach From Anywhere',
        text: 'Create and run your classes on your own schedule.',
    },
    {
        icon: FaMoneyBillWave,
        title: 'Earn While You Teach',
        text: 'Turn your expertise into a steady income.',
    },
    {
        icon: FaGlobe,
        title: 'Global Audience',
        text: 'Reach eager learners from every corner of the world.',
    },
];

const InspireTeacher = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 py-20 lg:py-28">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff14 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />

            <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 md:px-8 lg:flex-row lg:gap-20">
                {/* Image side */}
                <div className="relative w-full flex-1">
                    {/* Offset gradient frame */}
                    <div className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-80 sm:-bottom-5 sm:-left-5" />
                    <img
                        src={teacherImage}
                        alt="Teach on EduGenix"
                        className="relative mx-auto h-[360px] w-full max-w-md rounded-[2rem] object-cover shadow-2xl sm:h-[440px]"
                    />

                    {/* Floating badge */}
                    <div className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:right-4 lg:-right-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <FaChalkboardTeacher />
                        </span>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Become an Instructor</p>
                            <p className="text-xs text-slate-500">Apply in minutes</p>
                        </div>
                    </div>
                </div>

                {/* Text side */}
                <div className="flex-1 text-center lg:text-left">
                    <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-300">
                        Inspire. Educate. Earn
                    </span>

                    <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                        Share your knowledge and{' '}
                        <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                            inspire learners worldwide
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300 lg:mx-0">
                        Join EduGenix as an instructor and reach eager learners. Teach what you
                        love, build your brand, and earn on your own terms.
                    </p>

                    {/* Benefit cards */}
                    <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
                        {benefits.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-500/20">
                                    <Icon />
                                </span>
                                <p className="mt-3 text-sm font-bold text-white">{title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-400">{text}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/teacherApply"
                        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3.5 font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
                    >
                        Become a Teacher
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InspireTeacher;