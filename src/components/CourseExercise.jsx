import {useState} from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {Link } from "react-router-dom"
const CourseExercise =()=>{
   const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [courseTags, setCourseTags] = useState([]);
    const [courseCoverImage, setCourseCoverImage] = useState(null);
    const [courseShareStep, setCourseShareStep] = useState(1);
    const [draft,setDraft] = useState(false)

    const handleExercise=(e)=>{
      e.preventDefault()
    }
	return(
<>
<div className='flex gap-1 mb-3 items-center'>
      <Link to={'/courses/share'}>Kurs paylaşımı </Link> 
      <IoIosArrowForward  fontSize={18}/>
      <span className='text-indigo-600'>Tapşırıq redaktoru</span>
    </div>
    <div>
    	 <h2 className="text-2xl font-semibold mb-2">Tapşırıq redaktoru</h2>
      <p className="text-gray-600">Tapşırığın şərtini yaz, nümunə və faylları əlavə et.</p>
  </div>
  <div className="col-span-7 bg-white shadow-md mt-5 mb-5 p-4 border border-gray-300 rounded-lg">
            <form onSumbit={handleExercise}>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Tapşırığın adı</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
 
  <div className="mb-4">
                    <label htmlFor="coursePrice" className="block text-gray-700 font-semibold mb-2">Maksimal bal</label>
                    <input type="number" id="coursePrice" className="w-full border border-gray-300 rounded-full outline-none p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="20" />
                </div>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Tələbə hansı formatda təhvil verə bilər</label>
                   <div className='flex gap-3'>
                    <input type="checkbox" id="courseTitle" className=" border border-gray-300 rounded-full p-2 outline-none focus:outline-none " placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> PDF / DOCX
                     <input type="checkbox" id="courseTitle" className=" border border-gray-300 rounded-full p-2 outline-none focus:outline-none " placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> Link
                </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" id="courseTitle" className=" border border-gray-300 rounded-full p-2 focus:outline-none" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> PNG / JPG
                     <input type="checkbox" id="courseTitle" className=" border border-gray-300 rounded-full p-2 focus:outline-none" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> ZIP
                </div>
                </div>
                <div className="mb-4">
                     <label htmlFor="courseCoverImage" className="block text-gray-700 font-semibold mb-2">Tapşırıq materialları / nümunə fayllar</label>
                    <div className='border border-gray-300 px-5 py-2 rounded-md bg-gray-100 space-y-4'>             
                    
                    <p className="text-center text-gray-500 text-sm mt-1">Sürüşdür burax və ya fayl seç</p>
                    <p className="text-center text-gray-500 text-sm mt-1">PNG, JPEG, JPG, SVG,GIF</p>
                   <div className='flex justify-center mb-3'>
                    <button className="text-center border border-indigo-700 text-indigo-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white cursor-pointer mt-2" type
                      ='button'>Şəkil Yüklə
<input type="file"  id="courseCoverImage" className="hidden w-full border border-gray-300 rounded-md p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs təsvirini daxil edin" onChange={(e) => setCourseCoverImage(e.target.files[0])}/ >
                    </button>
               
                </div>
                             </div>
                </div>
                  <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Qiymətləndirmə meyarları</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
               <div className='flex items-center justify-between mt-6 mb-5 gap-5'>

      <p className="cursor-pointer text-gray-300 px-5 py-1.5 " >Son yadda saxlama:</p>
  
                 
    <div className="ml-auto flex items-center gap-4 mt-5 mb-5">
               <button  className=" whitespace-nowrap cursor-pointer border border-gray-300 px-4 py-2 rounded-full">Önizləmə</button>
               
                      <button className="whitespace-nowrap  cursor-pointer bg-indigo-700 text-white px-4 py-2 rounded-full hover:bg-blue-600" >Tapşırığı yadda saxla</button>
           </div>
              </div>
            </form>
            </div>

</>
	)
}
export default CourseExercise;