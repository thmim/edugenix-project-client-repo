import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { FaPlus } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router';

const SeeDetails = () => {
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //   post assignment data here
    const { mutate: createAssignment, isPending, closeModal } = useMutation({
        mutationFn: async (assignmentData) => {
            const res = await axiosSecure.post('/assignments', assignmentData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assignments']); // Optional

            reset();
            closeModal;


            Swal.fire({
                icon: 'success',
                title: 'Assignment Added!',
                text: 'Your assignment has been successfully created.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message || 'Something went wrong!',
            });
        },
    });


    const onSubmit = (data) => {
        console.log('Assignment Data:', data);
        const assignmentData = {
            title: data.title,
            description: data.description,
            deadline: new Date(data.deadline).toISOString(),
            createdAt: new Date().toISOString(),
            // assignment_count: 1,
            submission_count: 0,
            id
        }
        createAssignment(assignmentData);
        // TODO: send to backend
        setIsOpen(false);
        reset();
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Class Details</h2>

            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                <FaPlus /> Create Assignment
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
                        <Dialog.Title className="text-lg font-semibold mb-4">
                            Create Assignment
                        </Dialog.Title>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Assignment Title</label>
                                <input
                                    type="text"
                                    {...register('title', { required: 'Title is required' })}
                                    className="w-full border rounded p-2"
                                    placeholder="Enter title"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Assignment Deadline</label>
                                <input
                                    type="date"
                                    {...register('deadline', { required: 'Deadline is required' })}
                                    className="w-full border rounded p-2"
                                />
                                {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Assignment Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full border rounded p-2"
                                    placeholder="Enter description"
                                    rows={3}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        reset();
                                    }}
                                    className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`bg-blue-600 text-white px-4 py-2 rounded ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                        }`}

                                >
                                    {isPending ? 'Adding...' : 'Add Assignment'}
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default SeeDetails;
