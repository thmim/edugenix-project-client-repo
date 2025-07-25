
import React from 'react';
import registerlottie from '../../assets/register.json';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Logo from '../shared/logo/Logo';

const Register = () => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, socialLogin, updateUserProfile } = useAuth();
    
    const location = useLocation();
    console.log(location)
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    const onSubmit = async (data) => { 
        console.log('Form Data:', data);

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
                });
                return;
            }
        }

        try {
            
            const result = await createUser(data.email, data.password);
            console.log('Firebase User Created:', result.user);

            const userProfile = {
                displayName: data.name,
                photoURL: uploadedImageUrl 
            };
            await updateUserProfile(userProfile);
            console.log('Firebase Profile Updated');

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
            console.log('User Info Posted to DB:', userRes.data);

           
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Welcome to our platform!',
                confirmButtonColor: '#3085d6',
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
            });
        }
    };

    const handleSocialLogin = async () => { 
        try {
            const result = await socialLogin();
            const user = result.user;
            console.log('Social Login User:', user);

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
            console.log('Social User Info Posted to DB:', res.data);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
            navigate(from);

        } catch (error) {
            console.error("Social login failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: error.message || 'Social login failed. Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">

                {/* Left side - Animation */}
                <div className="md:w-1/2 bg-gradient-to-tr from-indigo-200 to-purple-300 flex justify-center items-center p-6">
                    <Lottie animationData={registerlottie} className="w-full max-w-md" loop={true} />
                </div>

                {/* Right side - Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6 flex justify-center">
                        <Link to="/"><Logo></Logo></Link>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create An Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            {/* name field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                {...register('name', { required: "Name is required" })}
                                type="text"
                                className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter your Name"
                            />
                            {errors.name && (
                                <p className='text-red-500 text-sm mt-1' role="alert">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            {/* image field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Profile picture</label>
                            <input
                                {...register('image')} 
                                type="file"
                                className="input input-bordered w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Upload your Image"
                            />
                            
                        </div>

                        <div>
                            {/* email field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                {...register('email', { required: "Email is required" })}
                                type="email"
                                className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm mt-1' role="alert">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., +8801XXXXXXXXX"
                            />
                            
                        </div>

                        <div>
                            {/* password field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                {...register('password', {
                                    required: "Password is required",
                                    pattern: {
                                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                        message: 'Password must be at least 6 characters and include uppercase, lowercase, and a number.'
                                    }
                                })}
                                type="password"
                                className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </form>

                    <div className="divider my-6 text-gray-500">OR</div>

                    <button
                        onClick={handleSocialLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white border border-gray-300 rounded-md shadow hover:shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        <FcGoogle size={24} />
                        <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>

                    <p className="text-center text-sm mt-6 text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;