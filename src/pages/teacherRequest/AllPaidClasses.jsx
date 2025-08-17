import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router';
import Loading from '../shared/loading/Loading';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaStar } from 'react-icons/fa';

const AllPaidClasses = () => {
 
  const axiosSecure = useAxiosSecure();
  // pagination
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


  // const { data: classes = [], isLoading } = useQuery({
  //   queryKey: ['approvedClasses',currentPage, itemsPerPage],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/approvedclasses?page=${currentPage}&size=${itemsPerPage}`);
  //     return res.data;
  //   }
  // });
const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approved-courses',currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-courses?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  });

console.log(classes)

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-12 text-center">Explore Our Paid Courses</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          // console.log(cls.courseInstructor.image)
          <div key={cls._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out  border border-gray-300 flex flex-col p-3">
            <figure>
              <img src={cls.image} alt={cls.title} className="w-full h-52 object-cover rounded-xl" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.title}</h2>
              <div className='flex items-center justify-between'>
                <div className="text-sm text-gray-600 mb-1 flex gap-2 items-center">
                <img className='w-10 h-10 rounded-full border-2 border-blue-500' src={cls.courseInstructor.image || 'N/A'} alt="" />
                <p className="font-bold text-2xl">{cls.name}</p>
              </div>
              {/* show ratings */}
              <div className='flex items-center gap-1.5'>
                 {[...Array(5)].map((_, i) => (
                                   <FaStar
                                     key={i}
                                     className={
                                       i < cls.averageRating ? 'text-yellow-500 text-2xl' : 'text-gray-300 text-2xl'
                                     }
                                   />
                                 ))}
              </div>
              {/* {cls.averageRating || "N/A"} */}
              </div>
              <p className="text-gray-700 text-sm">{cls.description.slice(0, 100)}...</p>
              <div className="mt-2">
                <p className="font-bold text-xl">Price: <span className="text-blue-600 font-bold text-xl">${cls.price}</span></p>
                <p className="font-bold text-xl text-gray-600">Enrolled: {cls.enrollmentCount}</p>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to={`/classes-details/${cls._id}`}>
                  <button className="btn btn-primary">Enroll Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* pagination */}
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

export default AllPaidClasses;
