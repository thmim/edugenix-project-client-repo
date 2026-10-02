import React, { useState } from 'react';
import { Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import {
    FaArrowRight,
    FaBookOpen,
    FaChalkboardTeacher,
    FaClipboardCheck,
    FaHeadset,
    FaPlus,
    FaQuestionCircle,
} from 'react-icons/fa';

const faqData = [
    {
        id: 'general',
        label: 'General',
        icon: FaQuestionCircle,
        questions: [
            {
                q: 'What is EduGenix?',
                a: 'EduGenix is an online learning platform where students enroll in expert-led classes and teachers create and share their knowledge with learners.',
            },
            {
                q: 'Do I need an account to use EduGenix?',
                a: 'You can browse classes freely, but you need to sign in to enroll in a class, access your learning dashboard, and submit assignments.',
            },
            {
                q: 'Can I learn at my own pace?',
                a: 'Yes. Once you are enrolled, you can learn anytime and anywhere, and move through the class at the speed that suits you.',
            },
            {
                q: 'Does EduGenix work on mobile devices?',
                a: 'Yes. The website is fully responsive, so you can learn from your phone, tablet, or computer.',
            },
        ],
    },
    {
        id: 'courses',
        label: 'Courses',
        icon: FaBookOpen,
        questions: [
            {
                q: 'How do I find the right course for me?',
                a: 'Open the All Classes page to browse every available class. Each class shows its instructor, price, and number of enrolled students to help you decide.',
            },
            {
                q: 'What is included in a class?',
                a: 'Each class includes expert-led learning content from the instructor, along with hands-on assignments so you can practice what you learn.',
            },
            {
                q: 'Are there assignments in the classes?',
                a: 'Yes. Classes include assignments created by the instructor, designed to help you apply your skills through real practice.',
            },
            {
                q: 'Will I get a certificate?',
                a: 'After you complete a class, you can earn a certificate to showcase your achievement and strengthen your resume.',
            },
        ],
    },
    {
        id: 'enrollment',
        label: 'Enrollment & Payment',
        icon: FaClipboardCheck,
        questions: [
            {
                q: 'How do I enroll in a class?',
                a: 'Open the class you like from the All Classes page, view its details, and complete the enrollment. Your seat is reserved as soon as it is confirmed.',
            },
            {
                q: 'Which payment methods are available?',
                a: 'Payments are made securely online during enrollment. The available payment options are shown to you at checkout.',
            },
            {
                q: 'Where can I find the classes I enrolled in?',
                a: 'After enrolling, your classes appear in your dashboard, where you can continue learning at any time.',
            },
            {
                q: 'What if I have a problem with my payment or enrollment?',
                a: 'Please reach out through our Contact page with the details and we will look into it and help you as quickly as we can.',
            },
        ],
    },
    {
        id: 'teaching',
        label: 'Teach on EduGenix',
        icon: FaChalkboardTeacher,
        questions: [
            {
                q: 'How can I become a teacher on EduGenix?',
                a: 'Open the Teach on EduGenix page, fill in the application form, and submit it. Once your application is reviewed and approved, you can start sharing your knowledge.',
            },
            {
                q: 'Is my teacher application reviewed?',
                a: 'Yes. Applications are reviewed before approval so that learners can trust the quality of the instructors on the platform.',
            },
            {
                q: 'What do I need to provide to create a class?',
                a: 'You add the essentials of your class, such as its title, description, price, and a cover image, so learners know exactly what to expect.',
            },
            {
                q: 'Can I reach learners from different places?',
                a: 'Yes. EduGenix is online, so your classes can reach eager learners from anywhere in the world.',
            },
        ],
    },
];

const FAQ = () => {
    const [activeId, setActiveId] = useState(faqData[0].id);
    const [openIndex, setOpenIndex] = useState(0);

    const activeCategory = faqData.find((c) => c.id === activeId);

    const handleCategory = (id) => {
        setActiveId(id);
        setOpenIndex(0);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white px-4 py-16 md:px-8">
            {/* Background decoration */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#10b98126 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />
            <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <Fade direction="up" triggerOnce>
                    <div className="mb-14 text-center">
                        <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            Got Questions?
                        </span>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                            Frequently Asked{' '}
                            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Pick a topic and find quick answers about learning, enrolling, and teaching on EduGenix.
                        </p>
                    </div>
                </Fade>

                <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
                    {/* Left: categories + help card */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                            {faqData.map(({ id, label, icon: Icon, questions }) => {
                                const isActive = id === activeId;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => handleCategory(id)}
                                        className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                                            isActive
                                                ? 'border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:shadow-md'
                                        }`}
                                    >
                                        <span
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-colors duration-300 ${
                                                isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                                            }`}
                                        >
                                            <Icon />
                                        </span>
                                        <span className="whitespace-nowrap font-semibold lg:whitespace-normal">{label}</span>
                                        <span
                                            className={`ml-auto hidden rounded-full px-2 py-0.5 text-xs font-bold lg:inline ${
                                                isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {questions.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Help card */}
                        <div className="relative mt-6 hidden overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 text-white lg:block">
                            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/30 blur-2xl" />
                            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-xl shadow-lg shadow-emerald-500/30">
                                <FaHeadset />
                            </span>
                            <h3 className="relative mt-4 text-lg font-bold">Still have questions?</h3>
                            <p className="relative mt-1 text-sm text-slate-300">
                                Can't find what you are looking for? Our team is happy to help.
                            </p>
                            <Link
                                to="/contact"
                                className="group relative mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-105"
                            >
                                Contact Us
                                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: accordion */}
                    <div className="space-y-4">
                        {activeCategory.questions.map(({ q, a }, i) => {
                            const isOpen = openIndex === i;
                            const panelId = `faq-${activeId}-${i}`;
                            return (
                                <div
                                    key={`${activeId}-${i}`}
                                    className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                                        isOpen
                                            ? 'border-emerald-200 shadow-xl shadow-emerald-500/10'
                                            : 'border-slate-100 shadow-sm hover:border-emerald-200'
                                    }`}
                                >
                                    {/* Accent bar */}
                                    <span
                                        className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-emerald-400 to-cyan-500 transition-opacity duration-300 ${
                                            isOpen ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />

                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="flex w-full items-center gap-4 px-6 py-5 text-left"
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-colors duration-300 ${
                                                isOpen
                                                    ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-white'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span
                                            className={`flex-1 text-base font-bold transition-colors duration-300 md:text-lg ${
                                                isOpen ? 'text-emerald-600' : 'text-slate-800'
                                            }`}
                                        >
                                            {q}
                                        </span>
                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs transition-all duration-300 ${
                                                isOpen
                                                    ? 'rotate-45 bg-emerald-500 text-white'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            <FaPlus />
                                        </span>
                                    </button>

                                    {/* Smooth expand */}
                                    <div
                                        id={panelId}
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 pl-[4.75rem] leading-relaxed text-slate-600">{a}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Help link for mobile (sidebar card is desktop-only) */}
                        <div className="pt-2 text-center lg:hidden">
                            <p className="text-slate-600">Still have questions?</p>
                            <Link
                                to="/contact"
                                className="mt-2 inline-flex items-center gap-2 font-semibold text-emerald-600"
                            >
                                Contact Us <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;