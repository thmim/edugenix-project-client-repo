import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [classImage, setClassImage] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Upload image to imgbb
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        try {
            const res = await axios.post(imageUrl, formData);
            setClassImage(res.data.data.url);
        } catch (err) {
            console.error('Image upload failed:', err);
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
                text: 'Try again later.',
            });
        }
    };

    // useMutation for submitting class
    const { mutate: addClass, isLoading } = useMutation({
        mutationFn: async (classData) => {
            const res = await axiosSecure.post('/add-class', classData);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Class Added!',
                    text: 'Your class has been submitted for review.',
                });
                reset();
                setClassImage('');
                queryClient.invalidateQueries(['my-classes']);
            }
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Class',
                text: error.message || 'Something went wrong!',
            });
        }
    });

    const onSubmit = (data) => {
        if (!classImage) {
            return Swal.fire({
                icon: 'warning',
                title: 'Image Upload Pending',
                text: 'Please wait for the image upload to finish.',
            });
        }

        const classData = {
            title: data.title,
            name: user?.displayName,
            email: user?.email,
            price: parseFloat(data.price),
            description: data.description,
            image: classImage,
            status: 'pending',
            enrollmentCount: 0,
            createdAt: new Date().toISOString(),
            assignment_count:0,
        };

        addClass(classData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
                    <FaPlusCircle className="text-blue-600" />
                    Add a New Class
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Class Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="e.g., Web Development Basics"
                        />
                        {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                    </div>

                    {/* Instructor Name */}
                    <div>
                        <label className="block mb-1 font-medium">Instructor Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            {...register('name')}
                            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            {...register('email')}
                            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-1 font-medium">Price (USD)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { required: true })}
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="e.g., 49.99"
                        />
                        {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image', { required: true })}
                            className="w-full border px-2 py-2 rounded bg-white focus:outline-none focus:ring focus:border-blue-500"
                            onChange={handleImageUpload}
                        />
                        {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            {...register('description', { required: true })}
                            rows="4"
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Brief class description..."
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Add Class'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
