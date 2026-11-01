import {useState} from 'react';

const CourseShare = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [courseTags, setCourseTags] = useState([]);
    const [courseCoverImage, setCourseCoverImage] = useState(null);
    const [courseShareStep, setCourseShareStep] = useState(1);
    const [draft,setDraft] = useState(false)


const steps = [
  {
    step:1, title:'Əsas məlumatlar'
  },
  {
     step:2, title:'Kurs haqqında'
   },
   {
     step:3, title:'Kurikulum'
   },
    {
     step:4, title:'Qiymət və endirim'
   },
    {
     step:5, title:'Baxış'
   },
    {
     step:6, title:'Şərtlər və paylaş'
   }
]
const nextStep=()=>{
  setCourseShareStep((prev)=>Math.min(prev+1,6))
}
const prevStep=()=>{
  setCourseShareStep((prev)=>Math.max(prev-1,1))
}
    return(
        <>
        <h2 className="font-semibold text-lg">Kurs paylaşımı</h2>
        <p className="text-gray-600">Məzmununu addım-addım hazırla</p>
        <div className='flex justify-center items-center mt-4 mb-4 bg-white w-full max-w-lg mx-auto rounded-full'>
        <a href="#" className={`text-center flex-1 rounded-l-full  px-4 py-2  ${draft===false ? 'bg-indigo-700 text-white' : 'border border-gray-200'} `} onClick={()=>setDraft(false)}>
            Kurs Yarat
        </a>
        <a href="#" className={`text-center flex-1 rounded-r-full border border-gray-200 text-gray-700 px-4 py-2   ${draft ? 'bg-indigo-700 text-white' : ''} `} onClick={()=>setDraft(true)}>
            Qaralama
        </a>
    </div>
    {
      draft===true ? (
        <>
        <div className='border border-gray-300 p-5 rounded-md mt-4 mb-4'>
          <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className=' bg-indigo-700'></div>
            <div>
            <h4 className='font-semibold '>UI/UX dizaynın əsasları</h4>
            <p>Son dəyişiklik 15 okt 2026</p>
          </div>
          </div>
          <div>
            <button className='cursor-pointer border border-gray-300 px-5 py-2 rounded-full'>Davam et</button>
          </div>
        </div>
         </div>
        </>
      ) : <>
   <div className="mb-5 mt-5 overflow-x-auto">
        <div className="relative flex min-w-max items-start justify-between mt-7 mb-7">
           <div className='absolute left-10 right-5 top-5 h-0.2 bg-indigo-700 transition-all' 
            style={{width:`${((courseShareStep-1) / (steps.length) )*100}`}}>
             
           </div>
            <div
    className="absolute left-5 top-5 h-0.5 bg-indigo-700 transition-all z-50"
    style={{
      width: `${((courseShareStep - 1) / (steps.length - 1)) * 100}%`,
    }}
  />
           {
            steps.map((item)=>(
              <div className='z-100 flex min-w-[100px] cursor-pointer flex-col items-center text-center'>
              <div className={`w-10 h-10 border  rounded-full flex items-center justify-center ${courseShareStep>=item.step ? 'bg-indigo-700 text-white border-indigo-300' : 'bg-gray-200 border-gray-300 '}`}>
{item.step}
                </div>
            <span className="ml-2 text-gray-500 font-semibold" >{item.title}</span>
          </div>
        
            ))
           }
            </div>
    </div>
   {
        courseShareStep === 1 && ( <>
  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
        <div className="bg-white shadow-md p-4 border border-gray-300 rounded-lg">
            <form>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Kurs Başlığı</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                   <div>
                    <label htmlFor="courseCategory" className="block text-gray-700 font-semibold mb-2">Kateqoriya</label>
                    <select id="courseCategory" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)}>
                        <option value="">Kateqoriya seçin</option>
                        <option value="riyaziyyat">Riyaziyyat</option>
                        <option value="proqramlasdirma">Proqramlaşdırma</option>
                        <option value="frontend">Frontend</option>
                        <option value="dil">Dil</option>
                        <option value="dizayn">Dizayn</option>
                    </select>
                    </div>
                    <div>
                        <label htmlFor="courseLevel" className="block text-gray-700 font-semibold mb-2">Səviyyə</label>
                        <select id="courseLevel" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
                            <option value="">Səviyyə seçin</option>
                            <option value='başlanğıc'>Başlanğıc</option>
                            <option value='orta'>Orta</option>
                            <option value='yüksək'>Yüksək</option>
                        </select>
                        </div>
                </div>
                <div className="mb-4">
                     <label htmlFor="courseLanguage" className="block text-gray-700 font-semibold mb-2">Dil</label>
                     <select id="courseLanguage" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={courseLanguage} onChange={(e) => setCourseLanguage(e.target.value)}>
                         <option value="">Dil seçin</option>
                         <option value="az">Azərbaycan dili</option>
                         <option value="en">English</option>
                         <option value="tr">Rus dili</option>
                     </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="courseTags" className="block text-gray-700 font-semibold mb-2">Kurs Etiketləri</label>
                    <input type="text" id="courseTags" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs etiketlərini daxil edin" value={courseTags} onChange={(e) => setCourseTags(e.target.value)} />
                </div>
                <div className="mb-4">
                     <label htmlFor="courseCoverImage" className="block text-gray-700 font-semibold mb-2">Kurs Təsviri</label>
                    <div className='border border-gray-300 px-5 py-2 rounded-md bg-gray-100 space-y-4'>
                  
                   
                    <input type="file"  id="courseCoverImage" className="hidden w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs təsvirini daxil edin" onChange={(e) => setCourseCoverImage(e.target.files[0])} />
                    <p className="text-center text-gray-500 text-sm mt-1">Sürüşdür burax və ya fayl seç</p>
                    <p className="text-center text-gray-500 text-sm mt-1">PNG, JPEG, JPG, SVG,GIF</p>
                   <div className='flex justify-center mb-3'>
                    <button className="text-center border border-indigo-700 text-indigo-600 px-4 py-2 rounded-full hover:bg-blue-600 mt-2">Şəkil Yüklə</button>
                </div>
                 </div>
                </div>
               
            </form>
            </div>
     
<div className="bg-white shadow-md p-4 border border-gray-300 h-80  rounded-lg">
                <div className='flex justify-center'>
                    <div className="w-full text-center justify-center bg-gray-600/50 rounded-md w-64 h-64"></div>
                  </div>
                <p className='text-center text-gray-400 mt-3 mb-3'>Kurs kartının tələbələrə görünən forması</p>
                </div>
    </div>
        </>)
    }
    {
        courseShareStep === 2 && ( <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-white shadow-md p-4 border border-gray-300 rounded-lg">
                  <form>
                <div className="mb-4">
                    <label htmlFor="courseTitle" className="block text-gray-700 font-semibold mb-2">Bu kurs kimlər üçündür?</label>
                    <input type="text" id="courseTitle" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                    <div className="mb-4">
                    <label htmlFor="courseBenefits" className="block text-gray-700 font-semibold mb-2">Tələbəyə nə qazandıracaq?</label>
                    <input type="text" id="courseBenefits" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs başlığını daxil edin" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
              
                <div className="mb-4">
                    <label htmlFor="courseTags" className="block text-gray-700 font-semibold mb-2">İlkin  biliklər</label>
                    <input type="text" id="courseTags" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs etiketlərini daxil edin" value={courseTags} onChange={(e) => setCourseTags(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="courseTags" className="block text-gray-700 font-semibold mb-2">İstifadə olunacaq program və alətlər</label>
                    <input type="text" id="courseTags" className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kurs etiketlərini daxil edin" value={courseTags} onChange={(e) => setCourseTags(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="courseCoverImage" className="block text-gray-700 font-semibold mb-2">Bu kurs hansı problemi həll edir?</label>
                   <textarea className='w-full rounded-md border border-gray-300 px-5 py-2' placeholder='1-2 cümlə ilə ifadə edin.' rows={5}/>
                </div>
               
            </form>
        </div>
        <div className="bg-white shadow-md p-4 border border-gray-300 h-80  rounded-lg">
                <div className='flex justify-center'>
                    <div className="w-full text-center justify-center bg-gray-600/50 rounded-md w-64 h-64"></div>
                  </div>
                <p className='text-center text-gray-400 mt-3 mb-3'>Kurs kartının tələbələrə görünən forması</p>
                </div>
    </div>

        </>)
    }
  
{
    courseShareStep === 3 && ( <>
        <div className='grid md:grid-cols-12 grid-cols-1  gap-4'>
    <div className='col-span-7 bg-white shadow-md p-4 border border-gray-300 rounded-md'>
        <div className='flex justify-between gap-3'>
            <div>
        <h4 className='text-lg font-semibold mb-2'>Kurikulum</h4>
        <p className='text-gray-400'>Bölmələri və dərsləri idarə edin</p>
    </div>
        <button className='cursor-pointer text-indigo-600 items-center flex rounded-full border text-sm border-indigo-600 px-4 py-0.5 h-10 whitespace-nowrap'>Bölmə əlavə et</button>
        </div>
        <div className='border border-gray-300 mt-3 mb-3 px-5 py-2 rounded-md'>
            <div className='flex justify-between gap-3 items-center'>
                <h4 className='text-lg font-semibold mb-2'>1. Frame, grid and constratins</h4>
                <p className='text-gray-600'>2 dərs</p>
                </div>
            </div>
        </div>
             <div className="col-span-5 bg-white shadow-md p-4 border border-gray-300 h-80  rounded-lg">
                <div className='flex justify-center'>
                    <div className="w-full text-center justify-center bg-gray-600/50 rounded-md w-64 h-64"></div>
                  </div>
                <p className='text-center text-gray-400 mt-3 mb-3'>Kurs kartının tələbələrə görünən forması</p>
                </div>
                </div>
    </>
    )
}
{
        courseShareStep === 4 && ( <>
            <div className='grid md:grid-cols-12 grid-cols-1 gap-4'>
        <div className="col-span-7 bg-white shadow-md p-4 border border-gray-300 rounded-lg">
            <form>
                <div className="mb-4">
                    <div className='flex items-center justify-between gap-3'>
                    <div className="w-full px-5 py-2 rounded-md flex border border-gray-300 items-center gap-4 mb-2">
                         <input type='radio' name="coursePriceType" id="coursePriceType1"></input>
                    <label htmlFor="coursePriceType" className="block text-gray-700 font-semibold">Ödənişli kurs</label>
                   
                    </div>
                    <div className="w-full px-5 py-2 rounded-md flex border border-gray-300 items-center gap-4 mb-2">
                    <input type ='radio'></input>
                    <label htmlFor="coursePriceType" className="block text-gray-700 font-semibold">Ödənişsiz kurs</label>
                    
                    </div>
                    </div>
                     </div>
                <div className="mb-4">
                    <label htmlFor="coursePrice" className="block text-gray-700 font-semibold mb-2">Əsas Qiymət</label>
                    <input type="number" id="coursePrice" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="49" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="courseDiscount" className="block text-gray-700 font-semibold mb-2"> Endirimli Qiymət</label>
                    <input type="number" id="courseDiscount" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="39" />
                </div>
                 <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Kurs sertifikatı</h4>
                   <div className="flex items-center mb-2">
                    <input type="checkbox" id="courseCertificate" className="mr-2" />
                    <label htmlFor="courseCertificate" className="text-gray-700 font-semibold">Kursun tələblərini tamamlayan tələbələr sertifikat ala bilsin</label>
                </div>
                 </div>
            </form>
            </div>
               <div className="col-span-5 bg-white shadow-md p-4 border border-gray-300 h-80  rounded-lg">
                <div className='flex justify-center'>
                    <div className="w-full text-center justify-center bg-gray-600/50 rounded-md w-64 h-64"></div>
                  </div>
                <p className='text-center text-gray-400 mt-3 mb-3'>Kurs kartının tələbələrə görünən forması</p>
                </div>

 </div>
        </>)
  }
 
  {
    courseShareStep === 6 && ( <>
<div className="bg-white shadow-md p-4 border border-gray-300 rounded-lg">
    <div className='mb-4 flex-col space-y-2'>
        <div>
             <input type="checkbox" id="courseTerms" className="mr-2" />
             <label htmlFor="courseTerms" className="text-gray-600 font-semibold">Mən şərtləri və qaydaları qəbul edirəm</label>
        </div>
<div>
    <input type="checkbox" id="courseTerms" className="mr-2" />
    <label htmlFor="courseTerms" className="text-gray-600 font-semibold">Videonun platforma daxilində endirilməsinə icazə verirəm</label>
</div>
    </div>
    <div className="mb-4">
        <h4 className='text-lg font-semibold mb-2'>Video Endirmə icazəsi</h4>
                <div className='flex items-center justify-between gap-3'>
             <div className="w-full px-5 py-2 rounded-md flex border border-gray-300 items-center gap-4 mb-2">
                         <input type='radio' name="coursePriceType" id="coursePriceType1"></input>
                    <div>
                    <label htmlFor="coursePriceType" className="block text-gray-700 font-semibold">Endirməyə icazə ver</label>
                     <p className='text-gray-400'>Tələbələr videonu oflayn izləyə bilər</p>
                    </div>
                    </div>
                    <div className="w-full px-5 py-2 rounded-md flex border border-gray-300 items-center gap-4 mb-2">
                    <input type ='radio'></input>
                    <div>
                    <label htmlFor="coursePriceType" className="block text-gray-700 font-semibold">Yalnız platformada</label>
                     <p className='text-gray-400'>Video endirilə bilməz</p>
                   </div>
                      </div>
                    </div>
        </div>
         <div className='mb-4'>
     <h4 className="text-lg font-semibold mb-2">Göndərilmə statusu</h4>
            <p className='text-gray-400'>Təsdiq barədə bildiriş alacaqsan</p>
   </div>
    </div>

    </>
    )
  }
   {
    courseShareStep === 5 && ( <>
<div className="bg-white shadow-md p-4 border border-gray-300 rounded-lg">
  <div className='w-full rounded-md mb-4'>
    
    <img src='https://th.bing.com/th/id/OIP.-CAX0AN2GM7ejFAIp-OShAHaEK?w=300&h=180&c=7&r=0&o=7&pid=1.7&rm=3' className='w-full h-64 rounded-md'></img>
  </div>
    <div className="mb-4">
        <h4 className='text-lg font-semibold mb-2'>Kursun adı burada görünəcək</h4>
              <p className='text-gray-400'>Kursun qısa dəyər təklifi burada görünəcək</p>
    </div>
    <div className="mb-4">
               <h4 className='text-lg font-semibold mb-2'>Kurikulum</h4>
                <div className='border border-gray-300 mt-3 mb-3 px-5 py-2 rounded-md'>
            <div className='flex justify-between gap-3 items-center'>
                <h4 className='text-lg font-semibold mb-2'>1. Frame, grid and constratins</h4>
                <p className='text-gray-600'>2 dərs</p>
                </div>
            </div>
    </div>
    </div>
    </>)
  }
  <div className='flex items-center justify-between mt-6 mb-5 gap-5'>
  {
    courseShareStep !=1 && (
      <button className="cursor-pointer border border-gray-300  px-5 py-1.5 rounded-full" onClick={prevStep}>Geri</button>
    )
  }
                 
    <div className="ml-auto flex items-center gap-4 mt-5 mb-5">
               <button  className=" whitespace-nowrap cursor-pointer border border-gray-300 px-4 py-2 rounded-full">Qaralama kimi yadda saxla</button>
               {
                  courseShareStep !=6 ? (
                      <button className="whitespace-nowrap  cursor-pointer bg-indigo-700 text-white px-4 py-2 rounded-full hover:bg-blue-600" onClick={nextStep}>Növbəti addım</button>
                  ) :
                  (
                    <button className="whitespace-nowrap cursor-pointer bg-indigo-700 text-white px-4 py-2 rounded-full hover:bg-blue-600" >Paylaş</button>
                  )

               }
             
           </div>
              </div>
      </>
    }
 
 
    </>
)
}
export default CourseShare;