import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import OnlyJob from './OnlyJob'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const JobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const [visibleCount, setVisibleCount] = useState(1); // Mobile: start with 1
  const {allJobs} = useSelector(store=>store.job)

  // Increase count on scroll for mobile only
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) { // Only on mobile
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          setVisibleCount((prev) => Math.min(prev + 1, JobsArray.length));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='pt-16'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4'>
        <div className='flex flex-col md:flex-row gap-5'>

          {/* Sidebar */}
          <div className='md:w-[20%] w-full'>
            <FilterCard />
          </div>

          {/* Job Cards */}
          {
            allJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className='flex-1 h-auto pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {allJobs.map((job, index) => (
                    <div
                      key={job?._id}
                      className={`
                        ${index < visibleCount ? 'block' : 'hidden'}
                        md:block
                      `}
                    >
                      <OnlyJob job = {job} />
                    </div>
                  ))}
                </div>
              </div>
            )
          }

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Jobs
