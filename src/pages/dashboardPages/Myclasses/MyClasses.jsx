import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyClasses = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['my-classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-classes?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This class will be deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/classes/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'The class has been removed.', 'success');
                    refetch();
                }
            } catch (err) {
                Swal.fire('Error', 'Something went wrong!', 'error');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">My Added Classes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div key={cls._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                        <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{cls.title}</h3>
                            <p className="text-sm text-gray-600 mt-1"><strong>Instructor:</strong> {cls.name}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {cls.email}</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Price:</strong> ${cls.price}</p>
                            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{cls.description}</p>
                            <p className="text-sm font-medium mt-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-white ${cls.status === 'approved' ? 'bg-green-500' : cls.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                    {cls.status}
                                </span>
                            </p>

                            <div className="mt-4 flex flex-wrap justify-between gap-2">
                                <button
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                                // onClick={() => handleUpdate(cls._id)} // to be implemented
                                >
                                    <FaEdit /> Update
                                </button>

                                <button
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                                    onClick={() => handleDelete(cls._id)}
                                >
                                    <FaTrashAlt /> Delete
                                </button>

                                <button
                                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition 
        ${cls.status === 'approved'
                                            ? 'bg-gray-700 text-white hover:bg-gray-800'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    disabled={cls.status !== 'approved'}
                                // onClick={() => handleSeeDetails(cls)} // Implement this later
                                >
                                    <FaEye /> See Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {classes.length === 0 && (
                <p className="text-center text-gray-600 mt-12">You haven't added any classes yet.</p>
            )}
        </div>
    );
};

export default MyClasses;
