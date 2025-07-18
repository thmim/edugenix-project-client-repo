import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const MakeAdmin = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();
    const [triggerSearch, setTriggerSearch] = useState(false);

    // Fetch users by search query
    const { data: users = [], refetch, isFetching } = useQuery({
        queryKey: ['users', searchQuery, triggerSearch],
        queryFn: async () => {
            if (!searchQuery) return [];
            const res = await axiosSecure.get(`/users/search?email=${searchQuery}`);
            return res.data;
        },
        enabled: !!searchQuery && triggerSearch, // only run when triggerSearch is true
    });

    // Make Admin Mutation
    const makeAdminMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/${id}/make-admin`),
        onSuccess: () => {
            Swal.fire('Success', 'Admin selected!', 'success');
            refetch()
        }
    });

    // Remove Admin Mutation
    const removeAdminMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/${id}/remove-admin`),
        onSuccess: () => {
            Swal.fire('Success', 'Admin removed!', 'success');
            refetch()
        }
    });

    const handleSearch = () => {
        setTriggerSearch(true);
        refetch();
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Make Admin Panel</h2>

            <div className="flex max-w-3xl items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setTriggerSearch(false); // prevent query auto-firing until button clicked
                    }}
                    className="border px-4 py-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isFetching ? 'Searching...' : 'Search'}
                </button>
            </div>

            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Created At</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t">
                                    <td className="px-4 py-2">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt="profile"
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{user.role || 'student'}</td>
                                    <td className="px-4 py-2">
                                        {user.role === 'admin' ? (
                                            <button
                                                onClick={() => removeAdminMutation.mutate(user._id)}
                                                disabled={removeAdminMutation.isPending}
                                                className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-60"
                                            >
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => makeAdminMutation.mutate(user._id)}
                                                disabled={makeAdminMutation.isPending}
                                                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default MakeAdmin;
