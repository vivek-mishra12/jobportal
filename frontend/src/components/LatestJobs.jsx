import React from 'react'
import LatesJobCardss from './LatesJobCardss'
import { useSelector } from 'react-redux'

//const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
        <span className="text-[#6A36C2]">Latest & TOP </span>
        Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs.length<=0 ? <span>No jobs available</span> :allJobs?.slice(0, 6).map((job) => (
          <LatesJobCardss key={job._id} job= {job} />
        ))}
      </div>
    </div>
  )
}

export default LatestJobs
