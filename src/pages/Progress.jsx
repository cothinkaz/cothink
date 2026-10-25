
   
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {FaStar } from "react-icons/fa"
import {courseBanner, notFoundImage,saveImage,searchImage, playImage} from '../assets/assets';
import Categories from '../components/Categories';
import {Link} from "react-router-dom";
import {CiFilter} from "react-icons/ci"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourseCard from '../components/CourseCard';
import BlogCard from '../components/BlogCard';
import { useNavigate } from "react-router-dom";
import { getCategoryById } from "../data/resourcesData";
import lookIcon from "../assets/look.svg";
import saveIcon from "../assets/save.svg";
import likeIcon from "../assets/like.svg";
import commentsIcon from "../assets/comments.svg";
import {featuredResources} from "../data/resourcesData"
import {blogs} from '../blogData/blogData';

const BookmarkIcon = () => (
  <img src={saveIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" />
);

const Avatar = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-[30px] w-[30px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-[40px] sm:w-[40px]">
        <svg viewBox="0 0 24 24" className="h-[26px] w-[26px] sm:h-[34px] sm:w-[34px]" fill="#8A8A8A">
          <circle cx="12" cy="8" r="4.2" />
          <path d="M3 24c0-5.2 4-8 9-8s9 2.8 9 8z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-[30px] w-[30px] shrink-0 rounded-full object-cover sm:h-[40px] sm:w-[40px]"
    />
  );
};


const categories = [
  "Hamısı",
  "Davam etdiklərim",
  "Tamamladığım"
];
 
const Progress=()=>{
    const CategoryIcon = ({ categoryId, size = 64 }) => {
  return (
    <img
      src={`/svgs/cat_${categoryId}.svg`}
      alt={`${categoryId} icon`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
};


  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Hamısı');
  const [openCategories, setOpenCategories] = useState(false)
 
  useEffect(() => {
    axios.get("/data/courses.json").then((res) => {
      setCourses(res.data);
    });
  }, []);

    return(
        <div >
              <div className="flex items-center justify-between">
                <div className='w-full'>
      <h2 className="text-2xl font-semibold mb-2">İrəliləyişim</h2>
      <p className="text-gray-600">Öyrənmə prosesinizi izləyin və davam edin.</p>
            <div className="mb-2 mt-4">
        <form className="relative flex gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
          <img src={searchImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" alt="search" />
          <input
            type="text"
            placeholder="Axtar..."
            className="border border-gray-300 rounded-full p-2 pl-10 pr-2 outline-none text-sm w-full max-w-lg"
           
          />
          <button
            className="flex gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full cursor-pointer"
            onClick={() => setOpenFilterModal(true)}
          >
            <CiFilter fontSize={24}/>Filtrlə
          </button>
        </form>
          </div>
           </div>
           <div className="w-full items-center justify-center md:flex hidden">
            <img src={courseBanner} className="h-40 object-cover"/>
          </div>
        
             </div>
             <div className="categories flex gap-2 mt-2 mb-4 flex-wrap">
          
          {categories.map((category, index) => (
            <>
          
            <button
              key={index}
              className={`cursor-pointer py-2 px-4 rounded-full ${
                selectedCategory === category
                  ? "bg-indigo-700 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-indigo-700 hover:text-white"
              }`}
              onClick={() => {setSelectedCategory(category)
                setOpenCategories(false)
              }}>
              {category}
            </button>
            </>
          ))}
         
        </div>
   <h2 className="text-2xl font-semibold mb-4">Kurslar</h2>
   <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
  {courses.filter(course=>course['started']).map((course) => (
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
   <h2 className="text-2xl font-semibold mb-4 mt-4">Bloqlar</h2>
        <div className='grid md:grid-cols-3 gird-cols-1 mt-5 mb-5 gap-4'>
          {blogs.filter(blog=>blog.started && !blog.completed).map((blog)=>(
         <article className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
      <div className="relative aspect-[2/1] shrink-0 bg-[#F0F2F8]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <button
          type="button"
          aria-label="Yadda saxla"
          className="absolute right-2 top-2 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-sm sm:h-[44px] sm:w-[44px]"
             
        >
   <BookmarkIcon />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        <h6 className="mb-3 text-[15px] font-medium leading-snug text-[#171717]  sm:text-[18px]">
  <Link to={`/library/blogs/${blog.id}`} className="after:absolute after:inset-0">
    {blog.title}
  </Link>
</h6>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Avatar src={blog.authorAvatar} alt={blog.author} />
          <div className="min-w-0 leading-snug">
            <p className="truncate text-[12px] font-medium text-[#171717] sm:text-[16px]">
              {blog.author}
            </p>
            <p className="text-[11px] text-[#737373] sm:text-[14px]">
              {blog.readTime} · {blog.date}
            </p>
          </div>
        </div>

             <div className="h-2.5 mt-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 bg-indigo-600/50" />
          </div>
          <div className='flex justify-between gap-3'>
          <p className="text-xs text-gray-400 mt-2">Təkrar oxu</p>
           <p className="text-xs text-gray-400 mt-2">Sonuncu 2 gün əvvəl</p>
         </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="flex-1 whitespace-nowrap rounded-full bg-[#E8EDFB] px-3 py-[5px] text-center text-[11px] text-[#2A4EBB] sm:px-4 sm:py-[6px] sm:text-[12px]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-[#404040] sm:gap-x-8 sm:pt-6">
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={lookIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.views}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={likeIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.likes}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={commentsIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.comments}
          </span>
        </div>
      </div>
    </article>
  ))
        }
        </div>
    <h2 className="text-2xl font-semibold mb-4 mt-4">Kitablar</h2>
 <div className='grid md:grid-cols-3 gird-cols-1 mt-5 mb-5 gap-4'>
 {featuredResources.map((blog)=>(
              <article className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-lg space-y-4">
      <div className='flex'>
      <div className="flex aspect-[2/1] shrink-0 bg-[#F0F2F8]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-48 w-full rounded-md object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
          <span className="absolute top-2 right-2 text-black text-xs bg-green-100/50 font-semibold p-2 rounded-full">
              Sərbəst iş
            </span>

      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 mt-5 sm:px-5 sm:pb-5 sm:pt-5">
        <h6 className="mb-3 text-[15px] font-medium leading-snug text-[#171717]  sm:text-[18px]">
  <Link to={`/library/resources/detail/${blog.resourceId}`} className="after:absolute after:inset-0">
    {blog.title}
  </Link>
</h6>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="min-w-0 leading-snug">
            <p className="text-gray-500 text-sm font-medium">
              {blog.author}
            </p>
          </div>
        </div>
         <div className="mt-2 flex items-center gap-3 text-[11px] text-[#737373]">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M6 2h9l5 5v15H6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
           PDF
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2v4M16 2v4M4 10h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {blog.pages} səhifə
          </span>
        </div>
        </div>
 </div>

             <div className="h-2.5 mt-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 bg-indigo-600/50" />
          </div>
          <div className='flex justify-between gap-3'>
          <p className="text-xs text-gray-400 ">Tamamlandı</p>
           <p className="text-xs text-gray-400">Sonuncu 2 gün əvvəl</p>
           </div>
                <div className='flex items-center justify-between'>
        <div className=" flex flex-wrap items-center gap-x-4 gap-y-2 text-[#404040] sm:gap-x-8 ">
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={lookIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> {blog.readers}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[14px]">
            <img src={likeIcon} alt="" className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" /> 777 {blog.likes}
          </span>       
     </div>
     <div>
        <span className="flex  border border-gray-200 bg-white p-2 rounded-full">
              <img src={saveImage} alt="save" />
          </span> 
     </div>
        </div>
   
    </article>

        )
)
    }
   
        </div>
        
           </div>
    )
}
export default Progress;