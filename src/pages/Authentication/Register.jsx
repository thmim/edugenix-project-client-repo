import React, { useState } from 'react';
import registerlottie from '../../assets/register.json'
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router';
import Logo from '../shared/logo/Logo';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
const Register = () => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, socialLogin, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from || "/"
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                navigate(from)
                // post and update user info
                const userInfo = {
                    email:data.email,
                    name:data.name,
                    image: profilePic,
                    role:"student",
                    created_at:new Date().toISOString(),
                    last_login:new Date().toISOString(),
                }
                const userRes = await axiosInstance.post('/users',userInfo)
                console.log(userRes.data)

                // update profile info in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                       console.log('profile Updated')
                    }).catch((error) => {
                        console.log(error)
                    });
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
                    email:user.email,
                    name:user.displayName,
                    image:user.photoURL,
                    role:"student",
                    created_at:new Date().toISOString(),
                    last_login:new Date().toISOString(),
                }
                const res = await axiosInstance.post('/users',userSocialInfo)
                navigate(from)
                console.log('updated user info',res.data)

            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)
        const formData = new FormData();
        formData.append('image', image)
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUrl, formData)
        setProfilePic(res.data.data.url);
    }
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
                                {...register('name', { required: true })}
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter your Name"

                            />
                            {errors.name?.type === "required" && (
                                <p className='text-red-500' role="alert">Name is required</p>
                            )}
                        </div>
                        <div>
                            {/* image field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Profile picture</label>
                            <input
                                type="file"
                                className="input input-bordered w-full"
                                placeholder="Enter your Image"
                                onChange={handleImageUpload}
                            />
                            {/* {errors.image?.type === "required" && (
                                <p className='text-red-500' role="alert">Image is required</p>
                            )} */}
                        </div>

                        <div>
                            {/* email field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter your email"

                            />
                            {errors.email?.type === "required" && (
                                <p className='text-red-500' role="alert">Email is required</p>
                            )}
                        </div>

                        <div>
                            {/* password field */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                {...register('password', {
                                    required: true,
                                    pattern: {
                                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                        message: 'Must include uppercase, lowercase, and number'
                                    }
                                })}
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Enter your password"

                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            {errors.password?.type === "required" && (
                                <p className='text-red-500' role="alert">Password is required</p>
                            )}
                        </div>
                            
                        <button className="btn btn-primary w-full text-white tracking-wide">
                            Register
                        </button>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={handleSocialLogin} className="btn w-full flex items-center justify-center gap-3 bg-white border shadow hover:shadow-md transition">
                        <FcGoogle size={24} />
                        <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>

                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="/login" className="text-green-400 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;