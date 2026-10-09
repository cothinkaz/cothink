
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const categories = ["Hamısı", "Frontend", "Backend", "Fullstack", "Data Science", "DevOps", "Mobile Development"];
const Courses=()=>{
	const [courses,setCourses]=useState([]);
	const [query, setQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Hamısı");
   const filteredCourses = courses.filter((course) => {
	const searchedQuery = query.toLowerCase();	
	const matchedSearch = course.name.toLowerCase().includes(searchedQuery) || course.description.toLowerCase().includes(searchedQuery);
	const matchedCategory = selectedCategory === "Hamısı" || course.category === selectedCategory;
		return matchedSearch && matchedCategory;
	});
	

	useEffect(()=>{
		axios.get("/data/courses.json").then((res)=>{
			setCourses(res.data);
		});
	},[])
    function handleSearch(event) {
       setQuery(event.target.value);
	}
	return(
		<div>
			<h2 className="text-2xl font-semibold mb-2">Kurslar</h2>
			<p className="text-gray-600">Bacarıqlarını inkişaf etdir yeni biliklər qazan!</p>
		<div className=" mb-4 mt-4">
			<form className="relative flex gap-2 items-center" onSubmit={(e)=>e.preventDefault()}>
				  <img src="../src/assets/search-normal.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
				<input type="text" value={query} placeholder="Kursları axtar..." className="border border-gray-300 rounded-md p-2 pl-10 pr-2 outline-none text-sm w-full" onChange={handleSearch}/>
		 <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-indigo-700">Filtrlə</button>
		</form>
		<div className="categories flex gap-2 mt-4 flex-wrap">
              {
				categories.map((category,index)=>(
					<button key={index} className="cursor-pointer bg-gray-100 text-gray-700 py-2 px-4 rounded-full hover:bg-indigo-700 hover:text-white" onClick={()=>setSelectedCategory(category)}>
						{category}
					</button>
				))
			  }
		</div>
			</div>
		<div className="flex justify-between items-center mb-4 mt-4">
			<h4 className="text-lg font-semibold">Tövsiyyə olunan kurslar</h4>
		    <a  className="text-indigo-600">Hamısına bax</a>
		</div>
		<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
			{
				filteredCourses.map((course,index)=>(
						<div className="relative bg-white shadow-lg border border-gray-100 rounded-lg p-4 relative space-y-4"	>
				
				<img src={course.image} alt="" className="w-full h-48 object-cover rounded-md"/>
			   <a className="absolute top-2 right-2 bg-white p-2 rounded-full">
<FaBookmark fontSize= {24}/>
			   </a>
			<div className="flex justify-between">
				<p>{course.name}</p>
			   <div className="flex items-center gap-3 text-sm text-gray-500">
				<span>⭐ { course.rating}</span>
				<span>{course.students}</span>
			   </div>
				</div>
				<h6 className="text-gray-700 text-sm">{course.provider}</h6>
				<a className="block bg-indigo-600 flex-1 w-full text-center text-white py-2 px-4 rounded-full hover:bg-indigo-700" href={`/courses/${course.id}`}>Kursa abunə ol</a>
			</div>
				))
			}
			</div>
			</div>
		
	)
}
export default Courses;