import React from 'react'
import { Badge } from './ui/badge'

const LatesJobCardss = ({job}) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-md shadow-xl border dark:border-gray-700 cursor-pointer w-full max-w-md mx-auto">
      {/* Company Info */}
      <div className="mb-2">
        <h1 className="font-medium text-lg sm:text-xl">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-200">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-2">
        <h1 className="font-bold text-lg sm:text-xl mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatesJobCardss
