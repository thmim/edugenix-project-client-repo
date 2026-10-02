import React from 'react';
import { Fade } from 'react-awesome-reveal';
import {
    FaCertificate,
    FaChalkboardTeacher,
    FaCheckCircle,
    FaClock,
    FaGlobe,
    FaLaptop,
    FaMobileAlt,
    FaTabletAlt,
    FaTasks,
} from 'react-icons/fa';

const IconBadge = ({ icon: Icon, gradient, shadow }) => (
    <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl text-white shadow-lg ${shadow} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
    >
        <Icon />
    </span>
);

const cardBase =
    'group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1.5';

const WhyChooseUs = () => {
    return (
        <section className="relative overflow-hidden bg-white px-4 py-20 md:px-8">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <Fade direction="up" triggerOnce>
                    <div className="mb-14 text-center">
                        <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            Why Choose Us
                        </span>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                            Why Choose{' '}
                            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                EduGenix
                            </span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Everything you need to learn new skills, practice them, and show them off, in one place.
                        </p>
                    </div>
                </Fade>

                {/* Bento grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* 1. Flexible learning (large) */}
                    <Fade direction="up" triggerOnce delay={0} className="h-full md:col-span-2">
                        <div className={`${cardBase} border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/15`}>
                            <div className="flex flex-col gap-8 md:flex-row md:items-center">
                                <div className="flex-1">
                                    <IconBadge icon={FaClock} gradient="from-emerald-400 to-teal-500" shadow="shadow-emerald-500/30" />
                                    <h3 className="mt-5 text-2xl font-bold text-slate-900">Learn at Your Own Pace</h3>
                                    <p className="mt-2 leading-relaxed text-slate-600">
                                        No rigid schedules. Enroll once, then learn anytime and anywhere, and move through each class at the speed that suits your life.
                                    </p>
                                </div>

                                {/* Decorative progress visual */}
                                <div className="w-full space-y-4 rounded-2xl border border-white bg-white/80 p-5 shadow-lg backdrop-blur md:w-64">
                                    {[
                                        { label: 'Lesson progress', w: 'w-[78%]' },
                                        { label: 'Assignments', w: 'w-[55%]' },
                                        { label: 'Course goal', w: 'w-[90%]' },
                                    ].map(({ label, w }) => (
                                        <div key={label}>
                                            <p className="mb-1.5 text-xs font-semibold text-slate-500">{label}</p>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                                <div className={`h-full ${w} rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-700 group-hover:brightness-110`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Fade>

                    {/* 2. Expert instructors */}
                    <Fade direction="up" triggerOnce delay={100} className="h-full">
                        <div className={`${cardBase} border-slate-100 bg-white shadow-lg shadow-slate-900/5 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/15`}>
                            <IconBadge icon={FaChalkboardTeacher} gradient="from-cyan-400 to-blue-500" shadow="shadow-cyan-500/30" />
                            <h3 className="mt-5 text-xl font-bold text-slate-900">Expert Instructors</h3>
                            <p className="mt-2 leading-relaxed text-slate-600">
                                Learn from teachers who are passionate about what they do and ready to share real knowledge.
                            </p>
                        </div>
                    </Fade>

                    {/* 3. Hands-on assignments */}
                    <Fade direction="up" triggerOnce delay={200} className="h-full">
                        <div className={`${cardBase} border-slate-100 bg-white shadow-lg shadow-slate-900/5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/15`}>
                            <IconBadge icon={FaTasks} gradient="from-lime-300 to-emerald-500" shadow="shadow-lime-500/30" />
                            <h3 className="mt-5 text-xl font-bold text-slate-900">Hands-on Assignments</h3>
                            <ul className="mt-3 space-y-2 text-slate-600">
                                {['Practice what you learn', 'Build real skills', 'Track your progress'].map((t) => (
                                    <li key={t} className="flex items-center gap-2 text-sm">
                                        <FaCheckCircle className="shrink-0 text-emerald-500" /> {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Fade>

                    {/* 4. Certificates (dark accent) */}
                    <Fade direction="up" triggerOnce delay={300} className="h-full">
                        <div className={`${cardBase} border-transparent bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20`}>
                            <FaCertificate className="pointer-events-none absolute -bottom-6 -right-6 text-[9rem] text-white/5 transition-transform duration-700 group-hover:rotate-12" />
                            <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/30 blur-2xl" />
                            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-2xl text-white shadow-lg shadow-amber-500/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                                <FaCertificate />
                            </span>
                            <h3 className="relative mt-5 text-xl font-bold">Earn a Certificate</h3>
                            <p className="relative mt-2 leading-relaxed text-slate-300">
                                Finish a class and get a certificate to showcase your achievement and boost your resume.
                            </p>
                        </div>
                    </Fade>

                    {/* 5. Any device */}
                    <Fade direction="up" triggerOnce delay={400} className="h-full">
                        <div className={`${cardBase} border-slate-100 bg-white shadow-lg shadow-slate-900/5 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-500/15`}>
                            <div className="flex gap-3">
                                {[FaMobileAlt, FaTabletAlt, FaLaptop].map((Icon, i) => (
                                    <span
                                        key={i}
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-2xl text-white shadow-lg shadow-teal-500/30 transition-transform duration-500 group-hover:-translate-y-1"
                                        style={{ transitionDelay: `${i * 80}ms` }}
                                    >
                                        <Icon />
                                    </span>
                                ))}
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-slate-900">Learn on Any Device</h3>
                            <p className="mt-2 leading-relaxed text-slate-600">
                                Phone, tablet, or computer. Your classes are always within reach.
                            </p>
                        </div>
                    </Fade>

                    {/* 6. Global community (wide) */}
                    <Fade direction="up" triggerOnce delay={500} className="h-full md:col-span-3">
                        <div className={`${cardBase} border-emerald-100 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30`}>
                            <FaGlobe className="pointer-events-none absolute -right-8 -top-10 text-[12rem] text-white/10 transition-transform duration-700 group-hover:rotate-12" />
                            <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur">
                                    <FaGlobe />
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold md:text-2xl">A Global Learning Community</h3>
                                    <p className="mt-1 max-w-3xl text-emerald-50">
                                        Learners and teachers from different places come together on EduGenix to share knowledge, grow skills, and inspire each other.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;