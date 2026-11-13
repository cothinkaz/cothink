import {useState} from 'react'
const  ShareLessonModal=({setLessonModal})=>{
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonDesc, setLessonDesc] = useState('');
    const [lessonVideo, setLessonVideo] = useState(null);
    const [lessonResources, setLessonRecources] = useState(null);
    const [draft,setDraft] = useState(false)
	return(
       <div className=' fixed inset-0 z-150 flex items-center  justify-center p-5  bg-black/50'>
<div className='relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-5 shadow-xl'>
   <div className='flex justify-between'>
       <h2 className='font-semibold text-lg'>Video dərsi</h2>
    <button onClick={()=>setLessonModal(false)} className="cursor-pointer absolute right-2 mb-5 top-0 text-end px-4 py-2 text-3xl text-gray-500">
          &times;
        </button>
   </div>
   
<div className="grid md:grid-cols-12 grid-cols-1 gap-4 mb-2 mt-4">
        <div className="md:col-span-7 col-span-12 bg-white p-4 rounded-lg">
            <form>
                <div className="mb-4">
                    <label htmlFor="lessonTitle" className="block text-gray-700 font-semibold mb-2">Dərsin adı</label>
                    <input type="text" id="lessonTitle" className="w-full border border-gray-300 rounded-full p-2 pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Məs: UI/UX Design, Front-end, Data Analitics" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="lessonDesc" className="block text-gray-700 font-semibold mb-2">Qısa açıqlama</label>
                    <input type="text" id="lessonDesc" className="w-full border border-gray-300 rounded-full p-2 pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Qısa açıqlama" value={lessonDesc} onChange={(e) => setLessonDesc(e.target.value)} />
                </div>
                <div className="mb-4">
                     <label htmlFor="lessonVideo" className="block text-gray-700 font-semibold mb-2">Video</label>
                    <div className='border border-gray-300 px-5 py-2 rounded-md bg-gray-100 space-y-4'>
                    <input type="file"  id="lessonVideo" className="hidden w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs təsvirini daxil edin" onChange={(e) => setLessonVideo(e.target.files[0])} />
                    <p className="text-center text-gray-500 text-sm mt-1">Sürüşdür burax və ya fayl seç</p>
                    <p className="text-center text-gray-500 text-sm mt-1">MP4, MOW, WEBM max 12GB</p>
                   <div className='flex justify-center mb-3'>
                    <label htmlFor='lessonVideo'  className="text-center border border-indigo-700 text-indigo-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white mt-2">Video seç</label>
                </div>
                 </div>
                </div>
                <div className="mb-4">
                     <label htmlFor="lessonResources" className="block text-gray-700 font-semibold mb-2">Əlavə Resurslar (PDF, ZIP)</label>
                    <div className='border border-gray-300 px-5 py-2 rounded-md bg-gray-100 space-y-4'>
                    <input type="file"  id="lessonResources" className="hidden w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs təsvirini daxil edin" onChange={(e) => setLessonResources(e.target.files[0])} />
                    <p className="text-center text-gray-500 text-sm mt-1">Sürüşdür burax və ya fayl seç</p>
                    <p className="text-center text-gray-500 text-sm mt-1">PDF, ZIP,DOCX max 12GB</p>
                   <div className='flex justify-center mb-3'>
                    <label htmlFor='lessonResources'  className="text-center border border-indigo-700 text-indigo-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white mt-2">Resurs seç</label>
                </div>
                 </div>
                </div>
            </form>
            </div>
     
<div className="md:col-span-5 col-span-12 ">

                <div className='bg-white shadow-md p-4 border border-gray-300  rounded-lg'>
                                  <h2 className='font-semibold text-lg mb-2'>Tələbə görünüşü</h2>
                    <div className="w-full  justify-center bg-gray-600/50 rounded-md w-64 h-64"></div>
                  
                <p className=' font-semibold text-gray-700 mt-3'>Dərsin adı burada görünücək</p>
              <div>
                <p className='text-gray-400 '>Qısa təsvir burada görünücək</p>
                <div className='flex gap-3 text-gray-600 mb-5'>
                    <p>Video dərs</p>
                    <p>15dəq</p>
                </div>
                <span className='bg-gray-400 rounded-full px-5 py-2 mt-2 mb-4 '>Ödənişli kurs iştirakçıları üçün</span>
                      
                 </div>

                 </div>
                  <div className='mt-4 rounded-md px-5 py-2 text-indigo-600 bg-indigo-300/50'>
                       <p className=''>Sınaq dərsi statusunu istənilən vaxt dəyişə bilərsən.Kursda adətən  1-2 dərsi sınaq üçün açıq saxlamaq tövsiyyə olunur.</p>
                </div>
                </div>
                  

                   </div>
                     <div className="ml-auto md:flex md:flex-row flex-col md:justify-end justify-center items-center gap-5 space-y-2 mt-5 mb-5">
               <button  className=" whitespace-nowrap cursor-pointer border border-gray-300 px-4 py-2 rounded-full" onClick={()=>setLessonModal(false)}>Qaralama kimi yadda saxla</button>
               
                      <button className="whitespace-nowrap  cursor-pointer bg-indigo-700 text-white px-4 py-2 rounded-full hover:bg-blue-600" onClick={()=>setLessonModal(false)}>Dərsi yadda saxla</button>
           </div>
</div>
    </div>
	)
}
export default ShareLessonModal;