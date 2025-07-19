import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router';
import Loading from '../shared/loading/Loading';


const PaidClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const handlePayment = () => {
    navigate(`/payments/${id}`); // Redirect to payment page
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
  {/* Main Card */}
  <div className="card bg-base-100 shadow-2xl">
    <figure>
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-t-xl"
      />
    </figure>
    <div className="card-body space-y-3">
      <h2 className="card-title text-3xl text-primary">{title}</h2>
      <p className="text-base-content">{description}</p>
      <div className="space-y-1 text-lg">
        <p><span className="font-semibold">Teacher:</span> {name}</p>
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Total Enrollment:</span> {enrollmentCount}</p>
        <p><span className="font-semibold">Published:</span> {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  </div>

  {/* Price & Pay Button */}
  <div className="bg-base-100 shadow-xl border-t-2 border-gray-200 rounded-xl p-6 text-center space-y-3">
    <div className="text-xl font-semibold">
      Price: <span className="text-3xl text-blue-700 font-bold">${price}</span>
    </div>
    <button onClick={handlePayment} className="btn btn-primary w-full text-lg">Pay Now</button>
  </div>
</div>

  );
};

export default PaidClassDetails;
