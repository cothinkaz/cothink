
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {courseBanner, notFoundImage,saveImage,searchImage, playImage} from '../assets/assets';
import Categories from '../components/Categories';
import {Link} from "react-router-dom";
import {CiFilter} from "react-icons/ci";
import CourseCard from "../components/CourseCard"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourseFilterModal from "../components/CourseFilterModal"
const categories = [
  "Hamısı",
  "Riyaziyyat",
  "Proqramlaşdırma",
  "Frontend",
  "Dil",
  "Dizayn",
];


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filters,setFilters] = useState({
    priceType:'hamısı',
    level:'hamısı',
    minimum:'hamısı',
    maximum:'hamısı',
    price:100,
    rating:0,
  })
  const [selectedCategory, setSelectedCategory] = useState('Hamısı');
  const [openCategories, setOpenCategories] = useState(false)
  const filteredCourses = courses.filter((course) => {
  const searchedQuery = query.trim().toLowerCase();
  const matchedSearch =
      course.name.toLowerCase().includes(searchedQuery) ||
      course.description.toLowerCase().includes(searchedQuery);
  const matchedCategory =
      selectedCategory === "Hamısı" || course.category === selectedCategory;
    
  const courseRating = Number(course.rating) || 0;
  const coursePrice = Number(course.price) || 0;

  const matchedLevel = filters.level === 'hamısı' || course.level === filters.level
  const matchedRating = filters.rating === 0 || courseRating >= filters.rating
  const matchedPrice = coursePrice<=filters.price
  const matchedPriceType = filters.priceType === 'hamısı' || 
    (filters.priceType === 'pulsuz' && coursePrice === 0) ||
    (filters.priceType === 'ödənişli' && coursePrice > 0 )
    
    return (
      matchedSearch &&
      matchedCategory &&
      matchedPriceType &&
      matchedPrice && 
      matchedLevel && 
      matchedRating
    )     
  });
  useEffect(() => {
    axios.get("/data/courses.json").then((res) => {
      setCourses(res.data);
    });
  }, []);

  function handleSearch(event) {
    setQuery(event.target.value);
  }
  const recommendedCourses = filteredCourses.slice(0,3)
  const latestCourses = [...filteredCourses].filter(course=>course.addedDate).sort((a,b)=>new Date(b.addedDate) - new Date(a.addedDate)).slice(0,3)
  const popularCourses = [...filteredCourses].filter(course=>course.rating).sort((a,b)=>b.rating - a.rating).slice(0,3)
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className='w-full'>
      <h2 className="text-2xl font-semibold mb-2">Kurslar</h2>
      <p className="text-gray-600">Bacarıqlarını inkişaf etdir yeni biliklər qazan!</p>
      <div className="mb-4 mt-4">
        <form className="relative flex gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
          <img src={searchImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" alt="search" />
          <input
            type="text"
            value={query}
            placeholder="Kursları axtar..."
            className="border border-gray-300 rounded-full p-2 pl-10 pr-2 outline-none text-sm w-full max-w-lg"
            onChange={handleSearch}
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
                
        <div className="categories flex flex-nowrap whitespace-nowrap overflow-x-auto pb-2 gap-2 mt-4 mb-4 ">
          
          {categories.map((category, index) => (
            <>
            <button
              key={index}
              className={`shrink-0 cursor-pointer py-2 px-4 rounded-full ${
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
          <button

              className='hidden md:flex cursor-pointer py-2 px-4 rounded-full border border-gray-200 text-gray-700'
              onClick={() => setOpenCategories(true)}
            >
              <IoIosArrowForward fontSize={20}/>
            </button>
        </div>
  { openCategories ? ( <>
            <Categories/>
        </>
        )   : <>
   {recommendedCourses.length > 0 ? (
    <>
  <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl font-semibold">Tövsiyyə olunan kurslar</h2>
        <a className="flex gap-2 items-center text-indigo-600 cursor-pointer" onClick={()=>setSelectedCategory('Hamısı')}>Hamısına bax  <IoIosArrowForward fontSize={20}/></a>
      </div>
<CourseCard courses= {recommendedCourses}/>
     
</>)
 : (
  <div className='mt-4 space-y-4'>
    <div className='flex justify-center mt-4 mb-4'>
    <img src={notFoundImage}/>
  </div>
  <h2 className='mt-2 mb-2 text-center font-semibold text-xl'>Nəticə tapılmadı</h2>
     <p className=" text-center text-gray-500">
    Axtarışa uyğun kurs tapılmadı.
  </p>
  </div>
 
)}
   
      {
        popularCourses.length>0 && (
          <>
       <h2 className="font-semibold text-xl mt-4 mb-5">Populyar olan kurslar</h2>
          <CourseCard courses = {popularCourses}/>
    </>
    )}
        {
          latestCourses.length>0 && (
            <>
       <h2 className="font-semibold text-xl mt-4 mb-5">Ən son paylaşılanlar</h2>
          <CourseCard courses = {latestCourses}/>
      </>)}
        </>}
      <CourseFilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onApplyFilters = {setFilters}
        setOpenFilterModal={setOpenFilterModal}
      />
    </div>
  );
};

export default Courses;