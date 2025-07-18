
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loading from '../shared/loading/Loading';


const PaidClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: classInfo = {}, isLoading } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const { title, name, email, price, description, image, enrollmentCount,createdAt } = classInfo;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-base-100 shadow-xl rounded-xl lg:flex">
        <div className="lg:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
        <div className="lg:w-1/2 p-6 space-y-4">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="text-base-content">{description}</p>

          <div className="space-y-1">
            <p className="font-semibold text-xl">Teacher:<span className='font-semibold text-2xl'> {name}</span></p>
            <p className="font-semibold text-xl">Email:<span className='font-semibold text-2xl'> {email}</span></p>
            <p className="font-semibold text-xl">Price:<span className='text-3xl font-bold text-blue-700'> ${price}</span></p>
            <p className="font-semibold text-xl">Total Enrollment:<span className='text-3xl font-bold text-blue-700'> {enrollmentCount}</span></p>
            {/* <p><span className="font-semibold">Total Enrollment:</span> {enrollmentCount}</p> */}
            <p className="font-semibold text-xl">Published:<span className='font-semibold text-2xl'> {new Date(createdAt).toLocaleDateString()}</span></p>
            {/* <p><span className="font-semibold">Published:</span> {new Date(createdAt).toLocaleDateString()}</p> */}
          </div>

          <button className="btn btn-primary w-full mt-4">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaidClassDetails;
