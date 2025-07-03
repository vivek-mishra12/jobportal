import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const OnlyJob = ({job}) => {
  const navigate = useNavigate();
  // const jobId = 'vivek'
   const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }


  return (
    <div className='p-5 rounded-md shadow-2xl bg-[#f2fcfd] border-gray-200 dark:bg-[#000000] dark:shadow-blue-50 dark:shadow-md'>
      
      {/* Top Row: Posted Time and Bookmark */}
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant={"outline"} className={"rounded-full"} size={"icon"}>
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className='my-4 flex flex-col sm:flex-row sm:items-center gap-4'>
        <Button className="p-6 w-fit" variant={"outline"} size={"icon"}>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant={"outline"} className='w-full sm:w-auto'>Details</Button>
        <Button className={"bg-[#7209b7] w-full sm:w-auto"}>Save For Later</Button>
      </div>

    </div>
  )
}

export default OnlyJob
