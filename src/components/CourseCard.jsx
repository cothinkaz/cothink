   
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {FaStar } from "react-icons/fa"
import {courseBanner, notFoundImage,saveImage,searchImage, playImage} from '../assets/assets';
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
          <a className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <img src={saveImage} alt="save" />
            </a>

      <div className="flex justify-between">
        <span className="rounded-full bg-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-800">
          {course.category}
        </span>
        <span>⭐ {course.rating}</span>
      </div>

      <p className="font-semibold">{course.name}</p>

      <div className="flex gap-3">
        <FaRegCircleUser fontSize={24} />
        <h6 className="text-sm font-medium">{course.author}</h6>
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
          <div className="flex justify-between">
            <p className="text-gray-400">20 dərs</p>
            <h2 className="text-xl font-bold">{course.price}</h2>
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