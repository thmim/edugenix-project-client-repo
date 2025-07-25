import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserTie } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../shared/loading/Loading';

const TeacherRequest = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const {role,roleLoading} = useUserRole();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const application = {
            name: data.name,
            email: data.email,
            image: data.image,
            experience: data.experience,
            category:data.category,
            title: data.title,
            bio: data.bio || '',
            phone: data.phone || '',
            status:"pending",
            submittedAt: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/teacher-application', application);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: 'Thank you for applying.Wait for Approve.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate('/')
                reset();
            }
        } catch (error) {
            console.error('Instructor application failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };
    if (roleLoading) {
        return <Loading />;
    }

    // if user is teacher or admin
    if (role === 'teacher' || role === 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
                    <FaUserTie className="text-blue-600 text-6xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">You're Already an Instructor!</h2>
                    <p className="text-gray-600 text-lg mb-6">
                        Thank you for your interest. You are already registered as an {role} on our platform.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300 transform hover:scale-105"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <div className="text-center mb-6">
                    <FaUserTie className="text-blue-600 text-4xl mx-auto mb-2" />
                    <h2 className="text-2xl font-bold">Apply as an Instructor</h2>
                    <p className="text-gray-600 text-sm">Join EduGenix and start sharing your knowledge with the world.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ''}
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email (readonly) */}
                    <div>
                        <label className="block mb-1 font-medium">Email Address</label>
                        <input
                            type="email"
                            defaultValue={user?.email || ''}
                            readOnly
                            {...register("email")}
                            className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none"
                        />
                    </div>

                    {/* Image URL (readonly) */}
                    <div>
                        <label className="block mb-1 font-medium">Profile Image URL</label>
                        <input
                            type="text"
                            defaultValue={user?.photoURL || ''}
                            readOnly
                            {...register("image")}
                            className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title / Subject Expertise</label>
                        <input
                            type="text"
                            placeholder="e.g. Web Developer, Data Scientist"
                            {...register("title", { required: true })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block mb-1 font-medium">Experience Level</label>
                        <select
                            {...register("experience", { required: true })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select --</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-Level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                    </div>
                    {/* category */}
                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select --</option>
                            <option value="webDevelopment">Web Development</option>
                            <option value="digitalMarketing">Digital Marketing</option>
                            <option value="logoDesign">Logo Design</option>
                            <option value="seo">Seo Optimization</option>
                            <option value="blog">Blog Writing</option>
                        </select>
                    </div>

                    {/* Bio/Description */}
                    <div>
                        <label className="block mb-1 font-medium">Short Bio</label>
                        <textarea
                            {...register("bio")}
                            placeholder="Tell us a bit about your teaching style or background..."
                            rows={3}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/*  Phone Number */}
                    <div>
                        <label className="block mb-1 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="e.g. +8801XXXXXXXXX"
                            {...register("phone")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
                        >
                            Submit For Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TeacherRequest;