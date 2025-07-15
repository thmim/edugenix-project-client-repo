import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlusCircle } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateAddClass = () => {
    const { title, name, email, price, description,image,_id } = useLoaderData();
    const [classImage, setClassImage] = useState('');
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        

    } = useForm();
    // for upload image
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

    const onSubmit = async (updatedData) => {
    const updatedClassData = {
        ...updatedData,
        image: classImage || image, 
    };

    try {
        const res = await axiosSecure.patch(`/classes/${_id}`, updatedClassData);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Class info updated successfully.',
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'No Changes Made',
                text: 'You didn’t update anything.',
            });
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: err.message || 'Something went wrong!',
        });
    }
};


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
                    <FaPlusCircle className="text-blue-600" />
                    Update Your Add Class
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Class Title</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="e.g., Web Development Basics"
                            defaultValue={title}
                        />

                    </div>

                    {/* Instructor Name */}
                    <div>
                        <label className="block mb-1 font-medium">Instructor Name</label>
                        <input
                            type="text"
                            value={name}
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
                            value={email}
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
                            {...register('price')}
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="e.g., 49.99"
                            defaultValue={price}
                        />

                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"

                            {...register('image')}
                            className="w-full border px-2 py-2 rounded bg-white focus:outline-none focus:ring focus:border-blue-500"
                            onChange={handleImageUpload}
                        />

                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            rows="4"
                            defaultValue={description}
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Brief class description..."
                        ></textarea>

                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 text-center">
                        <button
                            
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"

                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default UpdateAddClass;