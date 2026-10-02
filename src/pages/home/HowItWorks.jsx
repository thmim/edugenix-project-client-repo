
import React from 'react';
import { Link } from 'react-router';
import {
    FaArrowRight,
    FaCertificate,
    FaClipboardCheck,
    FaLaptopCode,
    FaSearch,
    FaStar,
} from 'react-icons/fa';
import { Fade, Zoom } from 'react-awesome-reveal';

const steps = [
    {
        icon: FaSearch,
        title: 'Find Your Course',
        text: 'Browse our extensive library and choose the course that matches your passion, career goals, or curiosity.',
        gradient: 'from-emerald-400 to-teal-500',
        glow: 'shadow-emerald-500/40',
    },
    {
        icon: FaClipboardCheck,
        title: 'Book a Seat',
        text: 'Enroll with ease and reserve your spot in the course. Learn at your own pace, anytime, anywhere.',
        gradient: 'from-teal-400 to-cyan-500',
        glow: 'shadow-teal-500/40',
    },
    {
        icon: FaLaptopCode,
        title: 'Learn & Complete Assignments',
        text: 'Follow expert-led lessons and put your skills into practice with hands-on assignments from your instructor.',
        gradient: 'from-cyan-400 to-blue-500',
        glow: 'shadow-cyan-500/40',
    },
    {
        icon: FaCertificate,
        title: 'Get Certified',
        text: 'Complete the course and earn a recognized certificate to showcase your achievement and boost your resume.',
        gradient: 'from-amber-300 to-orange-500',
        glow: 'shadow-amber-500/40',
    },
    {
        icon: FaStar,
        title: 'Share Your Feedback',
        text: 'Rate your experience and help other learners choose the right course with confidence.',
        gradient: 'from-lime-300 to-emerald-500',
        glow: 'shadow-lime-500/40',
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white px-4 py-20 md:px-8">
            {/* Background decoration */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#10b98126 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />
            <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative mx-auto max-w-5xl">
                {/* Title Section */}
                <Fade direction="up" triggerOnce>
                    <div className="mb-16 text-center">
                        <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            Simple Process
                        </span>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                            How{' '}
                            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                EduGenix
                            </span>{' '}
                            Works
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Learning with EduGenix is simple, seamless, and structured for success.
                            Follow these easy steps and begin your journey today.
                        </p>
                    </div>
                </Fade>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute bottom-0 left-6 top-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-300 via-cyan-300 to-lime-300 md:left-1/2" />

                    <div className="space-y-12 md:space-y-16">
                        {steps.map(({ icon: Icon, title, text, gradient, glow }, i) => {
                            const isRight = i % 2 === 1;
                            return (
                                <div
                                    key={title}
                                    className="relative pl-16 md:grid md:grid-cols-2 md:gap-24 md:pl-0"
                                >
                                    {/* Node on the line */}
                                    <Zoom triggerOnce delay={100}>
                                        <span
                                            className={`absolute left-6 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xl text-white shadow-xl ${glow} ring-4 ring-white md:left-1/2`}
                                        >
                                            <Icon />
                                        </span>
                                    </Zoom>

                                    {/* Card */}
                                    <Fade
                                        direction={isRight ? 'right' : 'left'}
                                        triggerOnce
                                        className={isRight ? 'md:col-start-2' : ''}
                                    >
                                        <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/15">
                                            {/* Big faded number */}
                                            <span className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-black text-slate-100 transition-colors duration-500 group-hover:text-emerald-100">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>

                                            <span
                                                className={`relative inline-block rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white`}
                                            >
                                                Step {i + 1}
                                            </span>
                                            <h3 className="relative mt-4 text-xl font-bold text-slate-900">{title}</h3>
                                            <p className="relative mt-2 leading-relaxed text-slate-600">{text}</p>
                                        </div>
                                    </Fade>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <Fade direction="up" triggerOnce>
                    <div className="mt-16 text-center">
                        <Link
                            to="/allPaidClasses"
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
                        >
                            Start Learning Today
                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default HowItWorks;
