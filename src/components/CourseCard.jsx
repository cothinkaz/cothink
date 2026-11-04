   
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {FaStar } from "react-icons/fa"
import {courseBanner, durationImage, starImage, usersImage, notFoundImage,saveImage,searchImage, playImage} from '../assets/assets';
import Categories from '../components/Categories';
import {Link} from "react-router-dom";
import {CiFilter} from "react-icons/ci"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

 const CourseCard = ({courses = []})=>{

  return (
 <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
  {courses.map((course) => (
    <div
      key={course.id}
      className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-lg space-y-4"
    >
      <img
        src={course.image}
        alt={course.name}
        className="h-48 w-full rounded-md object-cover"
      />
          <a className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-lg">
              <img src={saveImage} alt="save"  />
            </a>

      <div className="flex items-center justify-between">
        <div className="rounded-full bg-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-800">
          {course.category}
        </div>
              <div className='flex gap-3'>
        <div className='flex items-center gap-2'><img src ={starImage}/> {course.rating}</div>
         <div className='flex items-center gap-2'><img src ={usersImage}/> <span>110</span></div>
       </div>
      </div>

      <p className="font-semibold">{course.name}</p>

      <div className="flex items-center gap-3">
        <FaRegCircleUser fontSize={24} className='text-gray-500'/>
        <h6 className="text-sm font-medium text-gray-700">{course.author}</h6>
      </div>

      {course.started === true ? (
        <>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 bg-indigo-600/50" />
          </div>
          <p className="text-xs text-gray-400">19/20 dərs tamamlandı</p>
          <Link
            to={`/courses/${course.id}`}
            className="block w-full rounded-full bg-indigo-600 px-4 py-2 text-center font-semibold text-white"
          >
            Davam et
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className='flex gap-3 items-center'>
              <img src={durationImage} className='h-6 w-6'/>
            <p className="text-gray-400">20 dərs</p>
          </div>

            <h2 className="text-xl font-bold">{course.price} AZN</h2>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="block w-full rounded-full bg-indigo-600 px-4 py-2 text-center font-semibold text-white"
          >
            Kursa başla
          </Link>
        </>
      )}
    </div>
  ))
}

</div>
)
}
export default CourseCard;