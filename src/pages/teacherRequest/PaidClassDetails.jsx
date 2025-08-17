// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useNavigate, useParams } from 'react-router';
// import Loading from '../shared/loading/Loading';
// import { FaClipboardList, FaStar, FaUsers } from 'react-icons/fa';


// const PaidClassDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const { data: classInfo = {}, isLoading } = useQuery({
//     queryKey: ['classDetails', id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/classes/${id}`);
//       return res.data;
//     },
//   });
// console.log(classInfo)
//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   // const { title, name, email, price, description, image, enrollmentCount,createdAt } = classInfo;
//   const handlePayment = () => {
//     navigate(`/payments/${id}`); // Redirect to payment page
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
//   {/* Main Card */}
//   <div className="card bg-base-100 shadow-2xl">
//     <figure>
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-80 object-cover rounded-t-xl"
//       />
//     </figure>
//     <div className="card-body space-y-3">
//       <h2 className="card-title text-3xl text-primary">{title}</h2>
//       <p className="text-base-content">{description}</p>
//       <div className="space-y-1 text-lg">
//         <p><span className="font-semibold">Teacher:</span> {name}</p>
//         <p><span className="font-semibold">Email:</span> {email}</p>
//         <p><span className="font-semibold">Total Enrollment:</span> {enrollmentCount}</p>
//         <p><span className="font-semibold">Published:</span> {new Date(createdAt).toLocaleDateString()}</p>
//       </div>
//     </div>
//   </div>

//   {/* Price & Pay Button */}
//   <div className="bg-base-100 shadow-xl border-t-2 border-gray-200 rounded-xl p-6 text-center space-y-3">
//     <div className="text-xl font-semibold">
//       Price: <span className="text-3xl text-blue-700 font-bold">${price}</span>
//     </div>
//     <button onClick={handlePayment} className="btn btn-primary w-full text-lg">Pay Now</button>
//   </div>
// </div>

// <div className="max-w-7xl mx-auto p-6">
//       {/* Hero Section */}
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Left: Image */}
//         <div className="w-full">
//           <img
//             src={classInfo.image}
//             alt={classInfo.title}
//             className="rounded-2xl shadow-lg w-full object-cover"
//           />
//         </div>

//         {/* Right: Title, Instructor, Price */}
//         <div className="flex flex-col justify-between space-y-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//             {classInfo.title}
//           </h1>
//           <div className="flex items-center gap-3">
//             <img
//               src={classInfo.courseInstructor?.image}
//               alt={classInfo.courseInstructor?.name}
//               className="w-12 h-12 rounded-full border"
//             />
//             <div>
//               <p className="text-lg font-semibold">
//                 {classInfo.courseInstructor?.name}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {classInfo.courseInstructor?.email}
//               </p>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 text-gray-600 mt-4">
//             <div className="flex items-center gap-2">
//               <FaUsers /> <span>{classInfo.enrollmentCount} Students</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaClipboardList /> <span>{classInfo.assignment_count} Assignments</span>
//             </div>
//           </div>

//           {/* Price + Button */}
//           <div className="mt-6">
//             <p className="text-2xl font-bold text-sky-600 mb-4">
//               ${classInfo.price}
//             </p>
//             <button onClick={handlePayment} className="btn w-full bg-primary rounded-xl shadow-md">
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-3">About This Course</h2>
//         <p className="text-gray-700 leading-relaxed">{classInfo.description}</p>
//       </div>

//       {/* Rating & Reviews */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="flex items-center text-yellow-500 text-xl">
//             <FaStar /> <span className="ml-2">{classInfo.averageRating || 0}</span>
//           </div>
//           <p className="text-gray-600">({classInfo.totalReviews} reviews)</p>
//         </div>

//         {/* Reviews List */}
//         <div className="space-y-6">
//           {classInfo.courseReviews?.length > 0 ? (
//             classInfo.courseReviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="p-4 bg-white rounded-xl shadow-sm border"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   <img
//                     src={review.image}
//                     alt={review.studentName}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">{review.studentName}</p>
//                     <p className="text-sm text-gray-500">{review.studentEmail}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-yellow-500">
//                   {Array.from({ length: review.rating }).map((_, i) => (
//                     <FaStar key={i} />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mt-2">{review.description}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 italic">No reviews yet.</p>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// };

// export default PaidClassDetails;
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