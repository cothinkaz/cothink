
import { useState, useEffect } from "react";
import axios from "axios";
import  {FaRegCircleUser} from "react-icons/fa6";
import {saveImage} from '../assets/assets';
import Categories from '../components/Categories';
import {Link} from "react-router-dom";
const categories = [ "Frontend", "Backend", "Fullstack", "Data Science", "DevOps", "Mobile Development"];
const handleFilter= ()=>{
  return 
}
const FilterModal = ({ open, onClose, selectedCategory, setSelectedCategory }) => {
 return(
	<div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? "" : "hidden"}`}>
		<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
		<div className="bg-white p-6 rounded-lg z-10">
			<h3 className="text-lg font-semibold mb-4">Filtrlə</h3>
			<p className="text-gray-600 mb-4">Sizə uyğun kursları seçmək üçün filtrləri tətbiq edin</p>
			<div className="space-y-2">
				<h4 className="font-semibold">Qiymət</h4>
				<div className="flex gap-4 border-b border-gray-200 pb-2 mb-2">
				<input type = "radio" name="price" value="pulsuz" className="mr-2" /> Pulsuz
                 <input type = "radio" name="price" value="ödənişli" className="ml-4 mr-2" /> Ödənişli
				 <input type = "radio" name="price" value="hamısı" className="ml-4 mr-2" /> Hamısı
</div>
<h4  className="font-semibold">Səviyyə	</h4>
<div className="flex gap-4 border-b border-gray-200 pb-2 mb-2">		
	<input type='radio' name="level" value="başlanğıc" className="mr-2" /> Başlanğıc
	<input type='radio' name="level" value="orta" className="ml-4 mr-2" /> Orta
	<input type='radio' name="level" value="yüksək" className="ml-4 mr-2" /> Yüksək	
	</div>
	<h4 className='font-semibold'>Vaxt aralığı</h4>
	<div className="flex items-center gap-4 border-b border-gray-200 pb-2 mb-2">
		<p className='text-gray-600'>Minimium </p>
		<select name="minimum" className="border border-gray-300 rounded-md p-1">
           <option value="hamısı">Hamısı</option>
		   <option value="20">20 dəqiqə</option>
		   <option value="30">30 dəqiqə</option>
			</select>
			<p className='text-gray-600'>Maximum</p>
            <select name="maximum" className="border border-gray-300 rounded-md p-1">
								<option value="hamısı">Hamısı</option>
								<option value ='1'>1 saat</option>
								<option value='2'>2 saat</option>
								</select>
								</div>
								<div className='flex gap-4 border-b border-gray-200 pb-2 mb-2'>
									<h2 className="font-semibold">Qiymət aralığı</h2>
									     <div className="mt-4 mb-4 flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 text-xs font-medium">
            <div className="flex h-full w-1/2 items-center justify-center overflow-hidden bg-indigo-600 text-white" />
          </div>
                  </div>
		  <div className="border-b border-gray-200 pb-2 mb-2">
			<h2 className="font-semibold">Rating</h2>
			<div className="flex-col gap-3">
				<div className="flex justify-between">1/5
          <input type='radio' name="rating" value="1" className="ml-4 mr-2" /> 
        </div>
				<div className="flex justify-between">2/5
          <input type='radio' name="rating" value="2" className="ml-4 mr-2" /> 
        </div>
				<div className="flex justify-between">3/5
          <input type='radio' name="rating" value="3" className="ml-4 mr-2" /> 
        </div>
				<div className="flex justify-between">4/5
          <input type='radio' name="rating" value="4" className="ml-4 mr-2" /> 
        </div>
				<div className="flex justify-between">5/5
          <input type='radio' name="rating" value="5" className="ml-4 mr-2" /> 
        </div>
			</div>					
								</div>
                <div className='flex justify-between gap-3'>
				<button
					className="block w-full text-center text-indigo-600 border border-indigo-600 p-2 rounded-md hover:bg-gray-200"
					onClick={() => {
						setSelectedCategory("Hamısı");
						onClose();
					}}
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
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [openCategories, setOpenCategories] = useState(false)
  const filteredCourses = courses.filter((course) => {
    const searchedQuery = query.toLowerCase();
    const matchedSearch =
      course.name.toLowerCase().includes(searchedQuery) ||
      course.description.toLowerCase().includes(searchedQuery);
    const matchedCategory =
      selectedCategory === "Hamısı" || course.category === selectedCategory;

    return matchedSearch && matchedCategory;
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
  const latestCourses = courses.filter(course=>course.addedDate).sort((a,b)=>new Date(b.addedDate) - new Date(a.addedDate)).slice(0,3)
  const popularCourses = courses.filter(course=>course.rating).sort((a,b)=>b.rating - a.rating).slice(0,3)
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Kurslar</h2>
      <p className="text-gray-600">Bacarıqlarını inkişaf etdir yeni biliklər qazan!</p>
      <div className="mb-4 mt-4">
        <form className="relative flex gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
          <img src="../src/assets/search-normal.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" alt="search" />
          <input
            type="text"
            value={query}
            placeholder="Kursları axtar..."
            className="border border-gray-300 rounded-full p-2 pl-10 pr-2 outline-none text-sm w-full max-w-sm"
            onChange={handleSearch}
          />
          <button
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full cursor-pointer"
            onClick={() => setOpenFilterModal(true)}
          >
            Filtrlə
          </button>
        </form>
          
        <div className="categories flex gap-2 mt-4 flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`cursor-pointer py-2 px-4 rounded-full ${
                selectedCategory === category
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-700 hover:text-white"
              }`}
              onClick={() => {setSelectedCategory(category)
                setOpenCategories(false)
              }}>
              {category}
            </button>
          ))}
          <button

              className='cursor-pointer py-2 px-4 rounded-full bg-indigo-700 text-white'
              onClick={() => setOpenCategories(true)}
            >
              Hamisi
            </button>
        </div>
      </div>
  { openCategories ? ( <>
            <Categories/>
        </>
        )   : <>
  <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl font-semibold">Tövsiyyə olunan kurslar</h2>
        <a className="text-indigo-600">Hamısına bax</a>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {recommendedCourses.map((course, index) => (
          <div key={course.id || index} className="relative bg-white shadow-lg border border-gray-100 rounded-lg p-4 space-y-4">
            <img src={course.image} alt="" className="w-full h-48 object-cover rounded-md" />
            <a className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <img src={saveImage} alt="save" />
            </a>
                  <div className="flex justify-between">
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1.5 text-xs font-semibold rounded-full">
                {course.category}
              </span>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>⭐ {course.rating}</span>
                <span>{course.students}</span>
              </div>
            </div>
                 {
                  course.started === true ? 
                  <>            
                    <p>{course.name}</p>
            <div className="flex gap-3">
              <FaRegCircleUser fontSize={24} />
              <h6 className="font-medium text-sm">{course.author}</h6>
            </div>
             <div className="mt-4 mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 text-xs font-medium">
              <div className="flex h-full w-1/2 items-center justify-center overflow-hidden bg-indigo-600/50 text-white"></div>
            </div>
              <div className="flex justify-between text-xs">
              <p className="text-gray-400">19/20 dərs tamamlandı</p>
              <a>Sonuncu 2 gün əvvəl</a>
            </div>
                 <Link className="block font-semibold bg-indigo-500 text-white flex-1 w-full text-center py-2 px-4 rounded-full" to={`/courses/${course.id}`}>
              Davam et 
            </Link>
                  </>
                   : (
                    <>
                    
            <p>{course.name}</p>          
<div className="flex gap-3">
              <FaRegCircleUser fontSize={24} />
              <h6 className="font-medium text-sm">{course.author}</h6>
            </div>
<div className="flex justify-between items-center mt-4 mb-4">

              <div>
                <p className="text-gray-400">20 dərs</p>
                <p className="text-gray-400">42 saat</p>
              </div>
              <h2 className="text-xl font-bold">35 AZN</h2>
            </div>
              <Link className="block font-semibold bg-indigo-500 text-white flex-1 w-full text-center py-2 px-4 rounded-full" to ={`/courses/${course.id}`}>
              Kursa başla
            </Link>
            </>
                   )
                 }
          </div>
        ))}
      </div>
          <h2 className="font-semibold text-xl mt-4">Populyar olan kurslar</h2>
  <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
        {popularCourses.map((course, index) => (
          <div key={`${course.id || index}-popular`} className="relative bg-white shadow-lg border border-gray-100 rounded-lg p-4 space-y-4">
            <img src={course.image} alt="" className="w-full h-48 object-cover rounded-md" />
            <a className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <img src={saveImage} alt="save" />
            </a>

            <div className="flex justify-between">
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1.5 text-xs font-semibold rounded-full">
                {course.category}
              </span>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>⭐ {course.rating}</span>
                <span>{course.students}</span>
              </div>
            </div>

            <p>{course.name}</p>
            <div className="flex gap-3">
              <FaRegCircleUser fontSize={24} />
              <h6 className="font-medium text-sm">{course.author}</h6>
            </div>

            <div className="flex justify-between items-center mt-4 mb-4">
              <div>
                <p className="text-gray-400">20 dərs</p>
                <p className="text-gray-400">42 saat</p>
              </div>
              <h2 className="text-xl font-bold">35 AZN</h2>
            </div>

            <Link className="block text-white font-semibold bg-indigo-600 flex-1 w-full text-center py-2 px-4 rounded-full" to={`/courses/${course.id}`}>
              Kursa başla
            </Link>
          </div>
        ))}
      </div>
       <h2 className="font-semibold text-xl mt-4">Ən son paylaşılanlar</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
        {latestCourses.map((course, index) => (
          <div key={`${course.id || index}-popular`} className="relative bg-white shadow-lg border border-gray-100 rounded-lg p-4 space-y-4">
            <img src={course.image} alt="" className="w-full h-48 object-cover rounded-md" />
            <a className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <img src={saveImage} alt="save" />
            </a>

            <div className="flex justify-between">
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1.5 text-xs font-semibold rounded-full">
                {course.category}
              </span>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>⭐ {course.rating}</span>
                <span>{course.students}</span>
              </div>
            </div>

            <p>{course.name}</p>
            <div className="flex gap-3">
              <FaRegCircleUser fontSize={24} />
              <h6 className="font-medium text-sm">{course.author}</h6>
            </div>

            <div className="flex justify-between items-center mt-4 mb-4">
              <div>
                <p className="text-gray-400">20 dərs</p>
                <p className="text-gray-400">42 saat</p>
              </div>
              <h2 className="text-xl font-bold">35 AZN</h2>
            </div>

            <Link className="block text-white font-semibold bg-indigo-600 flex-1 w-full text-center py-2 px-4 rounded-full" to={`/courses/${course.id}`}>
              Kursa başla
            </Link>
          </div>
        ))}
      </div>
        </>}
      <FilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default Courses;