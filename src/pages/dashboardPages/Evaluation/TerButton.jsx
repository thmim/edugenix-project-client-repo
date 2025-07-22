import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const TerButton = ({courseId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    const rating = watch("rating");
    const { mutate, } = useMutation({
        mutationFn: async (formData) => {
            const evaluationData = {
                rating: formData.rating,
                description: formData.description,
                studentEmail: user.email,
                studentName: user.displayName,
                createdAt: new Date().toISOString(),
                courseId:courseId
            };
            console.log(evaluationData)
            const res = await axiosSecure.post('/teacherEvaluation', evaluationData);
            return res.data;
        },
        onSuccess: (data) => {
            console.log('Success:', data);
            Swal.fire({
                title: "Review Submitted Successfully",
                icon: "success",
                draggable: true
            });
            reset();
        },
        onError: (error) => {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
            });
        },

    });


    const handleTERSubmit = (data) => {
        mutate(data);
    };
    return (
        <div>
            {/* TER Button */}
            <div className="text-center mt-6">
                <button
                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    Teaching Evaluation Report (TER)
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Teaching Evaluation Report</h2>
                        <form onSubmit={handleSubmit(handleTERSubmit)} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-gray-700">Rating</label>
                                <div className="flex justify-center">
                                    <Rating
                                        style={{ maxWidth: 250 }}
                                        value={rating}
                                        onChange={(selectedValue) => setValue("rating", selectedValue)}
                                    />
                                </div>
                                {errors.rating && <p className="text-red-500 text-sm">Rating is required</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700">Description</label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    rows={4}
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Write your feedback..."
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Submit Evaluation
                            </button>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

export default TerButton;