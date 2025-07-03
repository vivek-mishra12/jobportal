import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Funnel } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className='w-full p-3 rounded-md bg-white dark:bg-[#111] shadow-md'>
      <h1 className='text-lg font-bold mb-4 flex items-center justify-between'>
  As per my preferences
  <Funnel className='w-5 h-5 text-gray-600' />
</h1>

      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index} className='mb-4'>
            <h2 className='font-bold text-base mb-2'>{data.filterType}</h2>
            {data.array.map((item, idx) => (
              <div key={idx} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={item} id={`${data.filterType}-${idx}`} />
                <Label htmlFor={`${data.filterType}-${idx}`} className='text-sm md:text-base'>
                  {item}
                </Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
