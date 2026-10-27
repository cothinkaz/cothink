
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {FaStar } from "react-icons/fa"
import {courseBanner, notFoundImage,saveImage,searchImage, playImage} from '../assets/assets';
import Categories from '../components/Categories';
import {Link} from "react-router-dom";
import {CiFilter} from "react-icons/ci";
import CourseCard from "../components/CourseCard"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const categories = [
  "Hamısı",
  "Riyaziyyat",
  "Proqramlaşdırma",
  "Frontend",
  "Dil",
  "Dizayn",
];

const FilterModal = ({ open, onClose, selectedCategory, setSelectedCategory, onApplyFilters }) => {
 const [price,setPrice] = useState(100)
 const [priceType, setPriceType] = useState("hamısı")
 const [level,setLevel] = useState('başlanğıc')
 const [minimum, setMinimum] = useState('hamısı')
 const [maximum, setMaximum] = useState('hamısı')
 const [rating, setRating] = useState(0)
 const values = [0, 50, 75, 100]

 const handleReset=()=>{
  setLevel('başlanğıc')
  setPriceType('hamısı')
  setMinimum('hamısı')
  setMaximum('hamısı')
  setPrice(100)
  setRating(0)
 }
 const handleFilter= ()=>{
  onApplyFilters({
    priceType,
    level,
    minimum,
    maximum,
    price,
    rating
  })
  onClose();
}
 return(
	<div className={`fixed inset-0 z-50 flex items-center justify-center p-3 ${open ? "" : "hidden"}`}>
		<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
		<div className="bg-white overflow-y-scroll w-full overflow-hidden max-w-lg max-h-[90dvh] p-6 rounded-lg z-10">
			<h3 className="text-2xl text-center font-semibold mb-3">Filtrasiya</h3>
			<p className="text-center text-gray-600 mb-3">Sizə uyğun kursları seçmək üçün filtrləri tətbiq edin</p>
			<div className="space-y-2">
				<h4 className="font-semibold text-gray-800 mt-3 mb-3">Qiymət</h4>
				<div className="grid grid-col-1 gap-3 sm:grid-col-3 border-b border-gray-200">
				<label>
        <input type = "radio" name="price" value="pulsuz" className="mr-2" checked={priceType === 'pulsuz'}  onChange={(e)=>setPriceType('pulsuz')}/> Pulsuz
        <input type = "radio" name="price" value="ödənişli" className="ml-4 mr-2" checked={priceType === 'ödənişli'}  onChange={(e)=>setPriceType('ödənişli')}/> Ödənişli
				<input type = "radio" name="price" value="hamısı" className="ml-4 mr-2" checked={priceType === 'hamısı'}  onChange={(e)=>setPriceType('hamısı')}/> Hamısı
  </label>
</div>
<h4  className="font-semibold text-gray-800 mt-3 mb-3">Səviyyə	</h4>
<div className="grid grid-cols-1 gap-3 sm:grid-col-3 border-b border-gray-200 pb-2 mb-2">		
	<label>
  <input type='radio' name="level" value="başlanğıc" className="mr-2"  checked={level === 'başlanğıc'} onChange={(e)=>setLevel('başlanğıc')} /> Başlanğıc
	<input type='radio' name="level" value="orta" className="ml-4 mr-2" checked={level === 'orta'} onChange={(e)=>setLevel('orta')} /> Orta
	<input type='radio' name="level" value="yüksək" className="ml-4 mr-2"  checked={level === 'yüksək'} onChange={(e)=>setLevel('yüksək')} /> Yüksək	
	</label>
  </div>
	<h4 className='font-semibold text-gray-800 mt-3 mb-3'>Vaxt aralığı</h4>
	<div className="md:flex md: flex-row flex-col items-center gap-4 border-b border-gray-200 pb-2 mb-2">
		<p className='text-gray-600 mb-2'>Minimium </p>
		<select name="minimum" value={minimum} className="w-full outline-none border border-gray-300 rounded-md p-1" onChange={(e)=>setMinimum(e.target.value)}>
           <option value="hamısı">Hamısı</option>
		   <option value="20">20 dəqiqə</option>
		   <option value="30">30 dəqiqə</option>
			</select>
			<p className='text-gray-600 mb-2 mt-2'>Maximum</p>
            <select name="maximum" value={maximum} className="w-full outline-none border border-gray-300 rounded-md p-1" onChange={(e)=>setMaximum(e.target.value)}>
								<option value="hamısı">Hamısı</option>
								<option value ='1'>1 saat</option>
								<option value= '2'>2 saat</option>
								</select>
								</div>
								<div className='flex gap-4 border-b border-gray-200 pb-2 mb-2'>
									<h2 className="font-semibold">Qiymət aralığı</h2>
									  <input type="range" min='0' max='3' step = "1" value={values.indexOf(price)} onChange={(e)=>setPrice(values[Number(e.target.value)])}  className="w-full cursor-pointer accent-indigo-600"/>
                <div className='flex justify-between text-sm text-gray-500'>
                 {/* {
                    values.map((value)=>(
                      <span key={value}>{value}</span>
                    ))
                  }
                  */}
                </div>
                  </div>
		  <div className="border-b border-gray-200 pb-2 mb-2">
			<h2 className="font-semibold mb-3 text-gray-800">Rating</h2>
			<div className="space-y-3 flex-col gap-3">
        {
          [5, 4,3,2,1 ].map((stars)=>(
            <label className="flex cursor-pointer justify-between items-center rounded-lg border p-3 border-gray-300 ">
                 <span className="flex items-center gap-1">
                   {Array.from({length:5}, (_,i)=>(
                        <FaStar key={i} fontSize={24} className={i<stars ? 'text-amber-400' : 'text-gray-200'}/>
                    ))}
                 </span>
                  <span className="flex justify-between">
          <input type='radio' name="rating" checked= {rating === stars} value={stars} onChange={(e)=>setRating(stars)} className="ml-4 mr-2" /> 
        </span>
      </label>

          ))
        }
		
	
			</div>					
								</div>
                <div className='flex justify-between gap-3'>
				<button
					className="block w-full text-center text-indigo-600 border border-indigo-600 p-2 rounded-md hover:bg-gray-200"
					onClick={handleReset}
				>
					Filtrləri sıfırla
				</button>
        <button
					className="block w-full text-center text-indigo-600 border border-indigo-600 p-2 rounded-md hover:bg-gray-200"
					onClick={handleFilter}>
					Tətbiq et
				</button>
			</div>
      </div>
		</div>
	</div>
 )
}

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
  const searchedQuery = query.toLowerCase();
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
                
        <div className="categories flex gap-2 mt-4 mb-4 flex-wrap">
          
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
          <button

              className='cursor-pointer py-2 px-4 rounded-full border border-gray-200 text-gray-700'
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
      <FilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onApplyFilters = {setFilters}
      />
    </div>
  );
};

export default Courses;