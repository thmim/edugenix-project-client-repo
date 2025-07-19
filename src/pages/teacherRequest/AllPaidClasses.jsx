import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../shared/loading/Loading';

const AllPaidClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approvedclasses');
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-5xl text-blue-400 font-bold mb-8 text-center">Explore Our Paid Courses</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div key={cls._id} className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <figure>
              <img src={cls.image} alt={cls.title} className="w-full h-52 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.title}</h2>
              <p className="text-sm text-gray-600 mb-1">By: <span className="font-bold">{cls.name}</span></p>
              <p className="text-gray-700 text-sm">{cls.description.slice(0, 100)}...</p>
              <div className="mt-2">
                <p className="font-bold text-xl">Price: <span className="text-blue-600 font-bold text-xl">${cls.price}</span></p>
                <p className="font-bold text-xl text-gray-600">Enrolled: {cls.enrollmentCount}</p>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to={`/enroll/${cls._id}`}>
                  <button className="btn btn-primary">Enroll Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPaidClasses;
