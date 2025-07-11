import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserTie } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const TeacherRequest = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth(); 

    const onSubmit = (data) => {
        console.log('Instructor Application:', data);
        reset();
    };

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
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TeacherRequest;