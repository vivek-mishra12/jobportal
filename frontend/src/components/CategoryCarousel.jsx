import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Product Manager',
]

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const searchJobHandler = (query)=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  return (
    <div className="w-full max-w-xl mx-auto my-20 px-4">
      <Carousel >
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/2 flex justify-center"
            >
              <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full text-sm">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons with padding */}
        <CarouselPrevious className="ml-6 sm:ml-4" />
        <CarouselNext className="mr-7 sm:mr-4" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
