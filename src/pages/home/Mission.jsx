import React, { useState } from 'react';
import missionimg from '../../assets/graduates.jpg';
import { Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import {
  FaArrowRight,
  FaBullseye,
  FaEye,
  FaAward,
  FaUsers,
  FaBookOpen,
  FaGlobe,
  FaCheckCircle,
} from 'react-icons/fa';

const tabData = {
  mission: {
    label: 'Our Mission',
    icon: FaBullseye,
    badge: 'PURPOSE DRIVEN',
    title: 'Empowering Minds, Shaping Tomorrow',
    description:
      'At EduGenix, our core mission is to democratize high-quality education. We build accessible pathways for learners worldwide to gain practical skills, build confidence, and transform career trajectories.',
    highlights: [
      'Industry-aligned curriculum created by expert educators',
      'Flexible, self-paced learning pathways',
      'Inclusive community-driven support ecosystem',
    ],
  },
  vision: {
    label: 'Our Vision',
    icon: FaEye,
    badge: 'FUTURE FORWARD',
    title: 'A World of Boundless Learning',
    description:
      'We envision a global network where quality education knows no geographical or financial borders. A continuous ecosystem where curiosity sparks opportunity for everyone, everywhere.',
    highlights: [
      'Global access to world-class learning tools',
      'Real-world skill validation and certification',
      'Lifelong mentorship and career growth',
    ],
  },
};

const metrics = [
  { icon: FaUsers, count: '10K+', label: 'Active Learners', gradient: 'from-emerald-400 to-teal-500' },
  { icon: FaBookOpen, count: '250+', label: 'Expert Courses', gradient: 'from-teal-400 to-cyan-500' },
  { icon: FaAward, count: '98%', label: 'Satisfaction Rate', gradient: 'from-emerald-500 to-cyan-500' },
];

const Mission = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const current = tabData[activeTab];

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-24 lg:py-32">
      {/* Dynamic Background Blurs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-emerald-200/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <Fade direction="up" triggerOnce>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-sm">
              <FaGlobe className="text-emerald-500" /> Discover EduGenix
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Architecting the Future of{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Digital Education
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              We bridge the gap between ambitious learners and transformative knowledge through next-generation online learning.
            </p>
          </div>
        </Fade>

        {/* Content Layout */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Interactive Tab Content */}
          <Fade direction="left" triggerOnce className="lg:col-span-7">
            <div className="flex flex-col items-start">
              {/* Tab Selector */}
              <div className="inline-flex rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-md">
                {Object.entries(tabData).map(([key, item]) => {
                  const Icon = item.icon;
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`relative flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={isActive ? 'text-white' : 'text-slate-400'} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Animated Tab Panel */}
              <div key={activeTab} className="edu-tab-in mt-8 w-full">
                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  {current.badge}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {current.description}
                </p>

                {/* Highlights List */}
                <ul className="mt-6 space-y-3">
                  {current.highlights.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="mt-1 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700 sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Metrics Grid */}
              <div className="mt-10 grid w-full grid-cols-3 gap-3 sm:gap-4">
                {metrics.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-slate-200/60 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5"
                    >
                      <div className={`mb-2 inline-flex rounded-xl bg-gradient-to-r ${item.gradient} p-2.5 text-white shadow-md`}>
                        <Icon className="text-sm sm:text-base" />
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {item.count}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to Action */}
              <div className="mt-10">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
                >
                  Start Your Journey
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Fade>

          {/* Right Column: Visual Showcase */}
          <Fade direction="right" triggerOnce className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Accent Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 opacity-30 blur-lg transition duration-1000 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white p-3 shadow-2xl backdrop-blur-sm">
                <div className="relative h-[420px] overflow-hidden rounded-2xl sm:h-[480px]">
                  <img
                    src={missionimg}
                    alt="EduGenix Mission & Learning"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Image Overlay Label */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="rounded-md bg-emerald-500/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                      EduGenix Campus
                    </span>
                    <h4 className="mt-2 text-lg font-bold">
                      Empowering next-generation global talent
                    </h4>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <FaAward className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Certified Excellence</p>
                  <p className="text-xs text-slate-500">Accredited Learning Paths</p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Mission;