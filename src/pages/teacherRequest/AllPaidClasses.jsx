
import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router';
import Loading from '../shared/loading/Loading';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaStar, FaUsers } from 'react-icons/fa';

const AllPaidClasses = () => {

  const axiosSecure = useAxiosSecure();
  // pagination
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const numberofPages = Math.ceil(count / itemsPerPage)
  const pages = [];
  for (let i = 0; i < numberofPages; i++) {
    pages.push(i)
  }

  const handleItemsPerPage = e => {
    const val = parseInt(e.target.value)
    setItemsPerPage(val)
    setCurrentPage(0)
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approved-courses', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-courses?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/50 to-white pb-20">
      {/* Page banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-4 pb-28 pt-16 text-center">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#ffffff14 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
            {count} {count === 1 ? 'Course' : 'Courses'} Available
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Paid Courses
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Choose from expert-led classes and start building skills that matter.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4">
        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <article
              key={cls._id}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/15"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden rounded-2xl">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />

                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur-md">
                  <FaUsers /> {cls.enrollmentCount} Enrolled
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/30">
                  ${cls.price}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-grow flex-col px-2 pb-2 pt-4">
                <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-600">
                  {cls.title}
                </h3>

                {/* Instructor + rating */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <img
                      className="h-10 w-10 shrink-0 rounded-full border-2 border-emerald-400 object-cover"
                      src={cls.courseInstructor?.image || 'N/A'}
                      alt={cls.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x100/10B981/FFFFFF?text=T';
                      }}
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="text-xs text-slate-400">Instructor</p>
                      <p className="truncate text-sm font-bold text-slate-800">{cls.name}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < cls.averageRating ? 'text-sm text-amber-400' : 'text-sm text-slate-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {cls.averageRating || 'N/A'}
                    </span>
                  </div>
                </div>

                <p className="mt-4 flex-grow text-sm leading-relaxed text-slate-600">
                  {cls.description.slice(0, 100)}...
                </p>

                {/* CTA */}
                <Link to={`/classes-details/${cls._id}`} className="mt-5 block">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/30">
                    Enroll Now
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap">
          <div className="pagination flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-md">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-700"
            >
              <FaChevronLeft className="text-xs" /> Previous
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === page
                    ? 'selected bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage >= pages.length - 1}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-700"
            >
              Next <FaChevronRight className="text-xs" />
            </button>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            Per page
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="h-10 cursor-pointer rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllPaidClasses;