import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loading from '../../shared/loading/Loading';

const AllAssignment = () => {
  const axiosSecure = useAxiosSecure();
  const {courseId} = useParams();

  // Fetch all assignments for the given class ID
  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ['assignments', courseId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${courseId}`);
      return res.data;
    }
  });

  const { register, handleSubmit, reset } = useForm();

  // Mutation to submit assignment
  const { mutate: submitAssignment, isPending } = useMutation({
    mutationFn: async ({ assignmentId, submission }) => {
      const res = await axiosSecure.post('/submissions', {
        assignmentId,
        submission
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Assignment submitted!', 'success');
      reset();
    },
    onError: (err) => {
      Swal.fire('Error', err.message, 'error');
    }
  });

  const onSubmit = (data, assignmentId) => {
    submitAssignment({ assignmentId, submission: data[`submission_${assignmentId}`] });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-sm">All Assignments of this course</h2>
      {assignments.length === 0 ? (
        <p className="text-center text-gray-500">No assignments found for this course.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Deadline</th>
              <th className="p-3 border">Submit</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border font-medium">{assignment.title}</td>
                <td className="p-3 border">{assignment.description}</td>
                <td className="p-3 border text-sm">{assignment.deadline}</td>
                <td className="p-3 border">
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data, assignment._id))}
                    className="flex gap-2"
                  >
                    <input
                      {...register(`submission_${assignment._id}`, { required: true })}
                      type="text"
                      placeholder="Submission URL or Answer"
                      className="border px-2 py-1 rounded w-full md:w-64"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className={`px-3 py-1 rounded text-white ${
                        isPending
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isPending ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAssignment;
