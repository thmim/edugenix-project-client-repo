
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Loading from "../shared/loading/Loading";
import { FaClipboardList, FaStar, FaUsers } from "react-icons/fa";

const PaidClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: classInfo = {}, isLoading } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  console.log(classInfo[0].courseInstructor)

  const handlePayment = () => {
    navigate(`/payments/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Course Image */}
        <div>
          <img
            src={classInfo[0].image}
            alt={classInfo[0].title}
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col space-y-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {classInfo[0].title}
          </h1>

          {/* Instructor */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
            <img
              src={classInfo[0].courseInstructor?.image}
              alt={classInfo[0].courseInstructor?.name}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <p className="text-lg font-semibold">
                {classInfo[0].courseInstructor?.name}
              </p>
              <p className="text-sm text-gray-500">
                {classInfo[0].courseInstructor?.email}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-600" />
              <span>{classInfo[0].enrollmentCount} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-green-600" />
              <span>{classInfo[0].assignment_count} Assignments</span>
            </div>
          </div>

          {/* Price & Pay Button */}
          <div className="flex items-center justify-between bg-primary/10 p-5 rounded-2xl shadow-md">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                ${classInfo[0].price}
              </h2>
              <p className="text-sm text-gray-600">One-time payment</p>
            </div>
            <button
              onClick={handlePayment}
              className="btn bg-primary text-white px-8 py-3 text-lg rounded-xl shadow-md hover:scale-105 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-3">About This Course</h2>
        <p className="text-gray-700 leading-relaxed">{classInfo[0].description}</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-5">Student Reviews</h2>

        {/* Average Rating */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center text-yellow-500 text-xl">
            <FaStar />
            <span className="ml-2 font-semibold">
              {classInfo[0].averageRating || 0}
            </span>
          </div>
          <p className="text-gray-600">
            ({classInfo[0].totalReviews || 0} reviews)
          </p>
        </div>

        {/* Reviews List */}
        {classInfo[0].courseReviews?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {classInfo[0].courseReviews?.map((review) => (
              <div
                key={review._id}
                className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                {/* Reviewer Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.image}
                    alt={review.studentName}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{review.studentName}</p>
                    <p className="text-sm text-gray-500">
                      {review.studentEmail}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center text-yellow-500 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700">{review.description}</p>
              </div>
              // console.log(review)
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};

export default PaidClassDetails;