
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import loginlottie from '../../assets/Login.json';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import {
    FaArrowRight,
    FaCheckCircle,
    FaChalkboardTeacher,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaGraduationCap,
    FaLock,
    FaUserGraduate,
    FaUserShield,
} from 'react-icons/fa';

// Demo credentials 
const demoAccounts = [
    { role: 'Admin', icon: FaUserShield, email: 'dotcom@gmail.com', password: 'Dd12345' },
    { role: 'Teacher', icon: FaChalkboardTeacher, email: 'malek@gmail.com', password: 'Mm12345' },
    { role: 'Student', icon: FaUserGraduate, email: 'ali@gmail.com', password: 'Ab12345' },
];

const Login = () => {
    const { signInUser, socialLogin } = useAuth();
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/"
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // UI-only state
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const onSubmit = data => {

        signInUser(data.email, data.password)
            .then(result => {
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSocialLogin = () => {
        socialLogin()
            .then(async (result) => {
                const user = result.user
                const userSocialInfo = {
                    email: user.email,
                    name: user.displayName,
                    image: user.photoURL,
                    role: "student",
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                }
                const res = await axiosInstance.post('/users', userSocialInfo)
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Fills the form with a demo account (recruiter convenience)
    const fillDemo = (account) => {
        setSelectedRole(account.role);
        setValue('email', account.email, { shouldValidate: true });
        setValue('password', account.password, { shouldValidate: true });
    };

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100';

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4 py-10">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#10b98126 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />

            <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 md:flex-row">

                {/* Left side - Brand + animation */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-10 text-white md:flex md:w-1/2 md:flex-col md:justify-between">
                    <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />

                    <Link to="/" className="group relative inline-flex w-fit items-center gap-2.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-xl text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:rotate-6">
                            <FaGraduationCap />
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight">
                            Edu<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Genix</span>
                        </span>
                    </Link>

                    <div className="relative my-6">
                        <div className="mx-auto max-w-sm rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                            <Lottie animationData={loginlottie} className="w-full" loop={true} />
                        </div>
                    </div>

                    <div className="relative">
                        <h3 className="text-2xl font-bold leading-snug">
                            Learn anytime, anywhere, and{' '}
                            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">shape your future</span>
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            {['Expert-led classes', 'Hands-on assignments', 'Learn at your own pace'].map((t) => (
                                <li key={t} className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-400" /> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex flex-col justify-center p-6 sm:p-10 md:w-1/2 md:p-12">
                    {/* Mobile brand */}
                    <Link to="/" className="mb-6 inline-flex items-center justify-center gap-2 md:hidden">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white">
                            <FaGraduationCap />
                        </span>
                        <span className="text-xl font-extrabold text-slate-800">
                            Edu<span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Genix</span>
                        </span>
                    </Link>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome Back!</h2>
                    <p className="mt-1 text-slate-500">Sign in to continue your learning journey.</p>

                    {/* Recruiter quick access */}
                    <div className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/70 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                            Recruiter quick access
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">Pick a role to fill in demo credentials, then press Login.</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {demoAccounts.map((account) => {
                                const Icon = account.icon;
                                const isSelected = selectedRole === account.role;
                                return (
                                    <button
                                        key={account.role}
                                        type="button"
                                        onClick={() => fillDemo(account)}
                                        className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-bold transition-all duration-300 ${
                                            isSelected
                                                ? 'border-transparent bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600'
                                        }`}
                                    >
                                        <Icon className="text-lg" />
                                        {account.role}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                        <div>
                            {/* email field */}
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    {...register('email', { required: true })}
                                    type="email"
                                    className={inputClass}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email?.type === "required" && (
                                <p className="mt-1.5 text-sm font-medium text-red-500" role="alert">Email is required</p>
                            )}
                        </div>

                        <div>
                            {/* password field */}
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    {...register('password', {
                                        required: true,
                                        pattern: {
                                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                            message: 'Must include uppercase, lowercase, and number'
                                        }
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${inputClass} pr-12`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-emerald-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.password.message}</p>}
                            {errors.password?.type === "required" && (
                                <p className="mt-1.5 text-sm font-medium text-red-500" role="alert">Password is required</p>
                            )}
                        </div>

                        <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 font-semibold tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:brightness-105">
                            Login
                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        or
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <button
                        onClick={handleSocialLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="font-bold text-emerald-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;