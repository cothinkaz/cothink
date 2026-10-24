
   
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

export const featuredResources = [
  {
    id: "featured-1",
    resourceId: "bedii-1",
    title: "İkigai",
    author: "Hektor Qarsiya & Fransesik Mirales",
    description:
      "Həyatın mənasını tapmaq və gündəlik xoşbəxtliyi kəşf etmək",
    quote:
      "İkigai – hər səhər oyanmağınıza səbəb olan şeydir.",
    quoteAuthor: "Hektor Qarsiya & Fransesik Mirales",
    pages: 192,
    format:'PDF',
    downloads:777,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_0.svg",
  },
  {
    id: "featured-2",
    resourceId: "bedii-2",
    title: "Atomik Vərdişlər",
    author: "Ceyms Klir",
    description:
      "Həyatın mənasını tapmaq və gündəlik xoşbəxtliyi kəşf etmək",
    quote:
      "Hər gün 1% daha yaxşı olmaq zamanla böyük dəyişikliklər yaradır.",
    quoteAuthor: "Ceyms Klir",
    pages: 192,
    format:'PDF',
      downloads:777,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_1.svg",
  },
  {
    id: "featured-3",
    resourceId: "bedii-3",
    title: "İtmiş Kitab Dükanı",
    author: "Evi Vudz",
    description:
      "Kitabların sehrli, sirli keçmiş və yeni başlanğıclar haqqında təsirli roman. Oxucunu macəraya aparır.",
    quote:
      "Bəzən insanın axtardığı həyat, bir kitabın səhifələri arasında gizlənir.",
    quoteAuthor: "Evi Vudz",
    pages: 192,
    format:'PDF',
      downloads:777,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_2.svg",
  },
];


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
    <h2 className="text-2xl font-semibold mb-4 mt-4">Kitablar</h2>
 <div className='grid md:grid-cols-3 gird-cols-1 mt-5 mb-5 gap-4'>
 {featuredResources.map((resource)=>(
            <article
      className="flex overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="relative flex w-[110px] shrink-0 items-center justify-center bg-[#F9FAFB] p-3">
        {resource.image ? (
          <img
            src={resource.image}
            alt={resource.title}
            className="h-[130px] w-[90px] rounded-[6px] object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-[130px] w-[90px] items-center justify-center rounded-[6px] bg-[#F0F0F0]">
            <CategoryIcon categoryId={resource.categoryId} size={48} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-3">
        {/* Category badge */}
        <div className="flex justify-end">
          <span
            className="rounded-full px-3 py-0.5 text-[11px] font-medium"

          >
            {resource.categoryName}
          </span>
        </div>
        <h6 className="mt-1 text-[13px] font-medium leading-snug text-[#171717] line-clamp-2">
          {resource.title}
        </h6>
        <p className="mt-1 text-[12px] text-[#737373]">{resource.author}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-[#737373]">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M6 2h9l5 5v15H6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {resource.format}
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2v4M16 2v4M4 10h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {resource.pages} səhifə
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 text-[12px] text-[#737373]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <img src={lookIcon} alt="" className="h-[16px] w-[16px]" />
              {resource.readers}
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {resource.downloads}
            </span>
          </div>
          <button
            type="button"
            aria-label="Yadda saxla"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-md"
          >
            <img src={saveIcon} alt="" className="h-[16px] w-[16px]" />
          </button>
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