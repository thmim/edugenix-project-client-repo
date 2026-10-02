
import React from 'react';
import { useState } from 'react';
import registerlottie from '../../assets/register.json';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import {
    FaArrowRight,
    FaCheckCircle,
    FaCloudUploadAlt,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaGraduationCap,
    FaLock,
    FaPhoneAlt,
    FaUser,
} from 'react-icons/fa';

const Register = () => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, socialLogin, updateUserProfile } = useAuth();

    const location = useLocation();

    const navigate = useNavigate();
    const from = location.state?.from || "/";

    // UI-only state
    const [showPassword, setShowPassword] = useState(false);
    const selectedFileName = watch('image')?.[0]?.name;

    const onSubmit = async (data) => {

        let uploadedImageUrl = '';

        if (data.image && data.image[0]) {
            const image = data.image[0];
            const formData = new FormData();
            formData.append('image', image);
            const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            try {
                const res = await axios.post(imageUrl, formData);
                uploadedImageUrl = res.data.data.url;
            } catch (imgError) {
                console.error("Image upload failed:", imgError);

                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'Could not upload profile picture. Please try again.',
                    confirmButtonColor: '#10b981',
                });
                return;
            }
        }

        try {

            const result = await createUser(data.email, data.password);

            const userProfile = {
                displayName: data.name,
                photoURL: uploadedImageUrl
            };
            await updateUserProfile(userProfile);

            const userInfo = {
                email: data.email,
                name: data.name,
                image: uploadedImageUrl,
                role: "student",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                phone: data.phone || '',
            };
            const userRes = await axiosInstance.post('/users', userInfo);

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Welcome to our platform!',
                confirmButtonColor: '#10b981',
                confirmButtonText: 'OK'
            });
            navigate('/')


        } catch (error) {
            console.error("Registration or DB update failed:", error);

            let errorMessage = "Registration failed. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: errorMessage,
                confirmButtonColor: '#10b981',
            });
        }
    };

    const handleSocialLogin = async () => {
        try {
            const result = await socialLogin();
            const user = result.user;

            const userSocialInfo = {
                email: user.email,
                name: user.displayName,
                image: user.photoURL,
                role: "student",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                phone: '',
            };
            const res = await axiosInstance.post('/users', userSocialInfo);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                confirmButtonColor: '#10b981',
                confirmButtonText: 'OK'
            });
            navigate(from);

        } catch (error) {
            console.error("Social login failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: error.message || 'Social login failed. Please try again.',
                confirmButtonColor: '#10b981',
            });
        }
    };

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100';
    const iconClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400';
    const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-700';
    const errorClass = 'mt-1.5 text-sm font-medium text-red-500';

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
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-10 text-white md:flex md:w-5/12 md:flex-col md:justify-between">
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
                            <Lottie animationData={registerlottie} className="w-full" loop={true} />
                        </div>
                    </div>

                    <div className="relative">
                        <h3 className="text-2xl font-bold leading-snug">
                            Start your{' '}
                            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">learning journey</span>{' '}
                            today
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            {['Access expert-led classes', 'Practice with real assignments', 'Earn certificates'].map((t) => (
                                <li key={t} className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-400" /> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex flex-col justify-center p-6 sm:p-10 md:w-7/12 md:p-12">
                    {/* Mobile brand */}
                    <Link to="/" className="mb-6 inline-flex items-center justify-center gap-2 md:hidden">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white">
                            <FaGraduationCap />
                        </span>
                        <span className="text-xl font-extrabold text-slate-800">
                            Edu<span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Genix</span>
                        </span>
                    </Link>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Create An Account</h2>
                    <p className="mt-1 text-slate-500">Join EduGenix and start learning today.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                {/* name field */}
                                <label className={labelClass}>Your Name</label>
                                <div className="relative">
                                    <FaUser className={iconClass} />
                                    <input
                                        {...register('name', { required: "Name is required" })}
                                        type="text"
                                        className={inputClass}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className={errorClass} role="alert">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                {/* Phone Number Field */}
                                <label className={labelClass}>
                                    Phone <span className="font-normal text-slate-400">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <FaPhoneAlt className={iconClass} />
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className={inputClass}
                                        placeholder="+8801XXXXXXXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* email field */}
                            <label className={labelClass}>Email Address</label>
                            <div className="relative">
                                <FaEnvelope className={iconClass} />
                                <input
                                    {...register('email', { required: "Email is required" })}
                                    type="email"
                                    className={inputClass}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className={errorClass} role="alert">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            {/* image field */}
                            <label className={labelClass}>
                                Profile Picture <span className="font-normal text-slate-400">(Optional)</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/60">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-xl text-white shadow-md shadow-emerald-500/30">
                                    <FaCloudUploadAlt />
                                </span>
                                <span className="min-w-0 text-sm">
                                    <span className="block truncate font-semibold text-slate-700">
                                        {selectedFileName || 'Click to upload your photo'}
                                    </span>
                                    <span className="text-xs text-slate-400">PNG or JPG</span>
                                </span>
                                <input
                                    {...register('image')}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div>
                            {/* password field */}
                            <label className={labelClass}>Password</label>
                            <div className="relative">
                                <FaLock className={iconClass} />
                                <input
                                    {...register('password', {
                                        required: "Password is required",
                                        pattern: {
                                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                            message: 'Password must be at least 6 characters and include uppercase, lowercase, and a number.'
                                        }
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${inputClass} pr-12`}
                                    placeholder="Create a password"
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
                            {errors.password ? (
                                <p className={errorClass}>{errors.password.message}</p>
                            ) : (
                                <p className="mt-1.5 text-xs text-slate-400">
                                    At least 6 characters with uppercase, lowercase, and a number.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 font-semibold tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:brightness-105"
                        >
                            Register
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
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-emerald-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;