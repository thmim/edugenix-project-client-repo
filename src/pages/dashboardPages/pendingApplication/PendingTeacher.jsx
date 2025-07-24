
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../shared/loading/Loading';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

const PendingTeacher = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const {count} = useLoaderData();
    console.log(count)
    const [currentPage,setCurrentPage] = useState(0)
    const [itemsPerPage,setItemsPerPage] = useState(5)
    const numberofPages = Math.ceil(count/itemsPerPage)
    const pages = [];
    for(let i=0; i<numberofPages;i++){
      pages.push(i)
    }
 // pagination
    
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

    
    // get all teacher data
      const {data: allTeachers = [], isPending } = useQuery({
        queryKey:['allteacher',currentPage, itemsPerPage],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/allteachers?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
      })
      

    // Approve mutation
    const approveMutation = useMutation({
        mutationFn: async ({id,email}) => {
            return await axiosSecure.patch(`/teachers/status/${id}`, { status: 'approved',email:email, });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allteacher']);
            Swal.fire('Approved!', 'The teacher has been approved.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Something went wrong during approval.', 'error');
        }
    });

    // Reject mutation
    const rejectMutation = useMutation({
        mutationFn: async ({id,email}) => {
            return await axiosSecure.patch(`/teachers/status/${id}`, { status: 'rejected',email:email, });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pending-teachers']);
            Swal.fire('Rejected!', 'The teacher has been rejected.', 'info');
        },
        onError: () => {
            Swal.fire('Error', 'Something went wrong during rejection.', 'error');
        }
    });

    // Confirmation handlers
    const handleApprove = (id,email) => {
        Swal.fire({
            title: 'Approve this teacher?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate({id,email});
            }
        });
    };

    const handleReject = (id,email) => {
        Swal.fire({
            title: 'Reject this teacher?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate({id,email});
            }
        });
    };
    if(isPending){
        return <Loading></Loading>;
      }


    return (
        <div className="px-4 py-10 min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 overflow-x-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Pending Teacher Applications</h2>

                {allTeachers.length === 0 ? (
                    <p className="text-center text-gray-500">No pending applications found.</p>
                ) : (
                    <table className="table-auto w-full border-collapse text-left">
                        <thead className="bg-blue-200 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Experience</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTeachers.map((teacher, index) => (
                                
                                <tr key={teacher._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 font-medium">{index + 1}</td>
                                    <td className="p-3">
                                        <img
                                            src={teacher.image}
                                            alt={teacher.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-3">{teacher.name}</td>
                                    <td className="p-3">{teacher.title}</td>
                                    <td className="p-3 capitalize">{teacher.experience}</td>
                                    <td className="p-3">{teacher.category || 'N/A'}</td>
                                    <td className="p-3">
                                        <span className="text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full text-xs">
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="p-3 flex text-center space-x-2">
                                        <button
                                            onClick={() => handleApprove(teacher._id,teacher.email)}
                                            disabled={teacher.status !== 'pending'}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 disabled:cursor-not-allowed disabled:hover:brightness-95"
                                        >
                                            <FaCheckCircle />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(teacher._id,teacher.email)}
                                            disabled={teacher.status !== 'pending'}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 disabled:cursor-not-allowed disabled:hover:brightness-95"
                                        >
                                            <FaTimesCircle />
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
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
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
                
            </div>
        </div>
    );
};

export default PendingTeacher;
