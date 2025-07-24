import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, useLoaderData } from 'react-router';

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const {count} = useLoaderData();
    const [currentPage,setCurrentPage] = useState(0)
    const [itemsPerPage,setItemsPerPage] = useState(3)
    const numberofPages = Math.ceil(count/itemsPerPage)
    const pages = [];
    for(let i=0; i<numberofPages;i++){
      pages.push(i)
    }

    const handleItemsPerPage = e=>{
        const val = parseInt(e.target.value)
        console.log(val)
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handlePreviousPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () =>{
        if(currentPage < pages.length -1){
            setCurrentPage(currentPage + 1)
        }
    }

    // Fetch all classes
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['all-classes',currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        try {
            const res = await axiosSecure.patch(`/classes/status/${id}`, { status: 'approved' });
            if (res.data.modifiedCount > 0) {
                Swal.fire('Approved!', 'Class has been approved.', 'success');
                refetch();
            }
        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Could not approve.', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/classes/status/${id}`, { status: 'rejected' });
            if (res.data.modifiedCount > 0) {
                Swal.fire('Rejected!', 'Class has been rejected.', 'info');
                refetch();
            }
        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Could not reject.', 'error');
        }
    };

    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">All Classes</h2>

            <table className="min-w-full border divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Image</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Short Description</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {classes.map(cls => (
                        <tr key={cls._id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{cls.title}</td>
                            <td className="px-4 py-3">
                                <img src={cls.image} alt="class" className="w-16 h-12 object-cover rounded" />
                            </td>
                            <td className="px-4 py-3">{cls.email}</td>
                            <td className="px-4 py-3">{cls.description ? cls.description.slice(0, 50) + '...' : 'No description'}...</td>
                            <td className="px-4 py-3 flex items-center space-x-2 text-center">
                                <button
                                    onClick={() => handleApprove(cls._id)}
                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                    disabled={cls.status === 'approved' || cls.status === 'rejected'}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(cls._id)}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                    disabled={cls.status === 'approved' || cls.status === 'rejected'}
                                >
                                    Reject
                                </button>
                                <Link to={`/dashboard/seeDetails/${cls._id}`}>
                                <button
                                    disabled={cls.status !== 'approved'}
                                    className={`px-3 py-1 text-sm rounded transition ${
                                        cls.status === 'approved'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Progress
                                </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination flex items-center justify-center mt-4 gap-2">
                <button onClick={handlePreviousPage}>previous</button>
                {
                    pages.map(page =>
                         <button
                        key={page}
                        onClick={()=>setCurrentPage(page)} 
                        className={currentPage === page ? 'selected':''}>
                        {page}
                        </button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                
            </div>
        </div>
    );
};

export default AllClasses;
