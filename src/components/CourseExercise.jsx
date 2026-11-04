import {useState} from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CourseExercise =()=>{
	return(
<>
<div className='flex gap-1 mb-3 items-center'>
      <Link to={'/courses'}>Kurs paylaşımı </Link> 
      <IoIosArrowForward  fontSize={18}/>
      <span className='text-indigo-600'>Tapşırıq redaktoru</span>
    </div>
    <div>
    	 <h2 className="text-2xl font-semibold mb-2">Tapşırıq redaktoru</h2>
      <p className="text-gray-600">Tapşırığın şərtini yaz, nümunə və faylları əlavə et.</p>
  </div>
  <div className="col-span-7 bg-white shadow-md p-4 border border-gray-300 rounded-lg">
            <form>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Tapşırığın adı</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
 
  <div className="mb-4">
                    <label htmlFor="coursePrice" className="block text-gray-700 font-semibold mb-2">Maksimal bal</label>
                    <input type="number" id="coursePrice" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="20" />
                </div>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Tələbə hansı formatda təhvil verə bilər</label>
                   <div className='flex gap-3'>
                    <input type="checkbox" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> PDF / DOCX
                     <input type="checkbox" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> Link
                </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> PNG / JPG
                     <input type="checkbox" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /> ZIP
                </div>
                </div>
                <div className="mb-4">
                     <label htmlFor="courseCoverImage" className="block text-gray-700 font-semibold mb-2">Tapşırıq materialları / nümunə fayllar</label>
                    <div className='border border-gray-300 px-5 py-2 rounded-md bg-gray-100 space-y-4'>             
                    <input type="file"  id="courseCoverImage" className="hidden w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs təsvirini daxil edin" onChange={(e) => setCourseCoverImage(e.target.files[0])} />
                    <p className="text-center text-gray-500 text-sm mt-1">Sürüşdür burax və ya fayl seç</p>
                    <p className="text-center text-gray-500 text-sm mt-1">PNG, JPEG, JPG, SVG,GIF</p>
                   <div className='flex justify-center mb-3'>
                    <button className="text-center border border-indigo-700 text-indigo-600 px-4 py-2 rounded-full hover:bg-blue-600 mt-2">Şəkil Yüklə</button>
                </div>
                 </div>
                </div>
                  <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Qiymətləndirmə meyarları</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
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