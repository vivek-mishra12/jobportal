import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  return (
    <div className=" pt-16 text-center px-4">
      <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full text-[#1077aa] font-medium bg-[#e0f4ff] text-sm sm:text-base">
          Find your dream job!
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A36C2]">Dream Job!</span>
        </h1>

        <p className="text-sm sm:text-base">
          "Kickstart your career with the right opportunity tailored for fresh graduates. Discover your dream job and take the first step toward a future full of growth and success."
        </p>

        <div className="flex w-full sm:w-4/5 md:w-2/3 lg:w-1/2 shadow-lg border border-gray-950 pl-3 pr-1 py-1 rounded-full items-center gap-2 mx-auto">
          <input
            type="text"
            placeholder="Search here!"
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full h-10 text-sm sm:text-base bg-transparent"
          />
          <Button onClick={searchJobHandler} className="rounded-full h-10 px-4 bg-[#6A36C2] hover:bg-[#5a2bb1]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
