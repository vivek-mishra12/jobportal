import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

//const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth)

  return (
    <div className='pt-16'>
      <Navbar />

      {/* Profile Card */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl my-5 p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row justify-between gap-4'>
          {/* Profile Info */}
          <div className='flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://media.istockphoto.com/id/1138960572/vector/cloud-computing-icon.jpg?s=612x612&w=0&k=20&c=-9mrz0vlvmFeoN_VfMeA8hR92NpLFOImsXQpy4-1fXw=" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-semibold text-lg sm:text-xl'>{user?.fullname}</h1>
              <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className='flex justify-center sm:justify-end'>
            <Button onClick={() => setOpen(true)} className="w-fit" variant="outline">
              <Pen className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className='my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base'>
          <div className='flex items-center gap-3'>
            <Mail className='h-5 w-5' />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact className='h-5 w-5' />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className='my-4'>
          <h2 className='font-semibold text-base sm:text-lg mb-2'>Skills</h2>
          <div className='flex flex-wrap gap-2'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              )) : <span>NA</span>
            }
          </div>
        </div>

        {/* Resume */}
        <div className='mt-6 grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume
              ? <a target='_blank' href={user?.profile?.resume} className='text-blue-500 hover:underline break-all'>{user?.profile?.resumeOriginalName}</a>
              : <span>NA</span>
          }
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-transparent rounded-2xl px-4 sm:px-0'>
        <h1 className='font-bold text-base sm:text-lg mb-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
