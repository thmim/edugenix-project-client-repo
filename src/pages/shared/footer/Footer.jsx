import React from 'react';
import { Link } from 'react-router';
import {
    FaArrowRight,
    FaArrowUp,
    FaCheckCircle,
    FaFacebookF,
    FaGithub,
    FaGraduationCap,
    FaLinkedinIn,
    FaTwitter,
} from 'react-icons/fa';

const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'All Classes', to: '/allPaidClasses' },
    { label: 'Contact Us', to: '/contact' },
];

const joinLinks = [
    { label: 'Teach on EduGenix', to: '/teacherApply' },
    { label: 'Sign In', to: '/login' },
];

const highlights = [
    'Expert-led classes',
    'Hands-on assignments',
    'Certificate on completion',
    'Learn at your own pace',
];

// Replace these with your real profile links
const socials = [
    { label: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
    { label: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com' },
    { label: 'GitHub', icon: FaGithub, href: 'https://github.com' },
];

const FooterLink = ({ to, children }) => (
    <li>
        <Link
            to={to}
            className="group inline-flex items-center gap-2 text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-emerald-300"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 transition-colors duration-300 group-hover:bg-emerald-300" />
            {children}
        </Link>
    </li>
);

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative overflow-hidden bg-slate-950 px-4 pb-8 pt-20 text-slate-300 md:px-8">
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff10 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />

            <div className="relative mx-auto max-w-7xl">
                {/* CTA banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-10 shadow-2xl shadow-emerald-500/20 md:px-12">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                        <div>
                            <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                                Ready to start your learning journey?
                            </h3>
                            <p className="mt-2 text-emerald-50">
                                Explore our classes and take the first step toward your goals today.
                            </p>
                        </div>
                        <Link
                            to="/allPaidClasses"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Browse Courses
                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Main grid */}
                <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="group inline-flex items-center gap-2.5">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-xl text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:rotate-6">
                                <FaGraduationCap />
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Edu
                                <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                                    Genix
                                </span>
                            </span>
                        </Link>
                        <p className="mt-5 max-w-sm leading-relaxed text-slate-400">
                            Learn anytime, anywhere, and shape your future with expert-led classes
                            and hands-on projects, all in one place.
                        </p>

                        <div className="mt-6 flex gap-3">
                            {socials.map(({ label, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-emerald-400 hover:to-cyan-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/30"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="mb-5 text-lg font-bold text-white">Explore</h4>
                        <ul className="space-y-3">
                            {exploreLinks.map(({ label, to }) => (
                                <FooterLink key={label} to={to}>{label}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Join us */}
                    <div>
                        <h4 className="mb-5 text-lg font-bold text-white">Join Us</h4>
                        <ul className="space-y-3">
                            {joinLinks.map(({ label, to }) => (
                                <FooterLink key={label} to={to}>{label}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Why EduGenix */}
                    <div>
                        <h4 className="mb-5 text-lg font-bold text-white">Why EduGenix?</h4>
                        <ul className="space-y-3">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-center gap-2.5 text-slate-400">
                                    <FaCheckCircle className="shrink-0 text-emerald-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} EduGenix. All rights reserved.
                    </p>
                    <p>
                        Designed & built by{' '}
                        <span className="font-semibold text-emerald-400">Taharim Hasan Mim</span>
                    </p>
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;