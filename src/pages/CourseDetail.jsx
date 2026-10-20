import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ratingImage, durationImage, eyeImage, profileImage, playImage, saveImage } from "../assets/assets";
import { IoIosNotificationsOutline, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Comments from "../components/Comments";
import courseComments from "../data/courseComments";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [openLesson, setOpenLesson] =useState(null)
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
    const rows = [15, 25, 50, 75, 100];

  useEffect(() => {
    axios.get("/data/courses.json").then((res) => {
      const foundCourse = res.data.find((c) => String(c.id) === String(id));
      setCourse(foundCourse);
    });
  }, [id]);

  if (!course) {
    return <div>Kurs tapılmadı</div>;
  }

  const filteredComments = courseComments.filter(
    (item) => String(item.course_id) === String(id)
  );

  const handleComment = () => {
    setOpenCommentForm(false);
  } 

  const getEmbedUrl = (url) => {
         if(!url) return '';
    try{
      const parsed =new URL(url)
      const videoUrl = parsed.searchParams.get('v') || parsed.pathname.split("/")[1].filter(Boolean).pop();

    return videoUrl ? `https://www.youtube.com/embed/${videoUrl}` : "";
    }
    catch{
      return '';
    }
  };

  const handleNext = () => {
    if (currentIndex < course.lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleSendComment = () => {
    if (comment.trim() === "") {
      setError("Şərh boş ola bilməz");
      return;
    }
    setError("");
  }

  const courseTabs = [
    {
      key: "summary",
      label: "İcmal",
      content:
        "Bu dərsdə Python proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
    {
      key: "resources",
      label: "Əlavə materiallar",
      content:
        "Python proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
    {
      key: "notes",
      label: "Qeydlər",
      content:
        "Bu proqramlaşdırma dilinin nə olduğunu harada istifadə edildiyini və nə üçün öyrənməli olduğumuzu anlayacağıq.",
    },
  ];

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-12 gap-7">
        <div className="md:col-span-7 col-span-12 md:order-1 order-2">
          {
            course.started === false ? (
<div className="">

      <h4 className="font-semibold mb-2">{course.name}</h4>
          <p className="text-gray-400 ">{course.description}</p>
  <div className=" gap-2 mt-3 mb-3">
    <div className="flex gap-3">
      <p> ⭐ {course.rating}</p> <span className="text-indigo-600">(200 rəy) </span> 
      <p className="text-gray-400">{course.students} Tələbə</p>
      </div>
    <div className="course-author flex items-center gap-3 mt-3 mb-3">
      <img src={profileImage} alt="profile" className="w-20 h-20 rounded-full" />
      <div className="flex flex-col">
        <h4 className="font-bold">{course.author}</h4>
        <p className="text-gray-400">{course.authorPosition}</p>
      </div>
    </div>
    <div className='course-include mb-3'>
      <h4 className="text-lg font-semibold">Kursa daxildir:</h4>
      <div className='flex gap-3 w-full '>
      <div className='flex-col gap-4 space-y-3 mt-3 text-gray-400'>
        <p>Başlanğıc səviyyə</p>
        <p>20 video dərs</p>
        <p>{course.duration}</p>
      </div>
        <div className='flex-col gap-4  space-y-3 mt-3 text-gray-400'>
        <p>Azərbaycan dilində</p>
        <p>20 Quiz</p>
        <p>Sertifikat</p>
      </div>
      </div>
        </div>
    <div className='px-5 py-2 rounded-md border border-gray-200'>
       <h2 className="font-semibold text-lg">Kurs haqqinda</h2>
    <p className="text-gray-400 ">{course.description}</p>
    <div className="flex justify-between items-center mt-4 mb-4">
      <h2 className="font-semibold text-lg">Kurs proqramı</h2>
      <a className='text-indigo-600'>Hamısına bax</a>
      </div>
         {open && (
            <div className="bg-gray-100 shadow-md rounded-md px-5 py-2 mt-3 mb-3">
              {course?.lessons && course?.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => (
                  <div
                    key={`${lesson.lesson_title}-${index}`}
                    className="w-full mt-5 mb-5 bg-white rounded-md px-5 py-2"
                  >
                    <div className="cursor-pointer">
                      <div className="flex w-full justify-between">
                        <div className="text-gray-500 font-semibold">{lesson.lesson_title}</div>
                        <IoIosArrowDown fontSize={24} className="text-gray-400" />
                      </div>
                      <div className="text-gray-400">3 dəq 45 san</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-bold col-span-4 text-center text-xl">Dərs tapılmadı</p>
              )}
          
              <div className='author-about gap-3 mt-5 mb-5'>
                  <h4 className="font-bold text-lg">Təlimçi</h4>
                   <h4 className="font-bold">{course.author}</h4>
                   <p className="text-gray-400">{course.authorPosition}</p>
                    <div className="flex items-center gap-3 mb-3 mt-3">
                <img src={profileImage} alt="profile" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col gap-2">
                 <span  className="text-gray-400 text-sm">{course.students} şagird</span>
                  <span className="text-gray-400 text-sm">⭐ {course.rating}</span>
                  <span className="text-gray-400 text-sm">  {filteredComments.length} rəy</span>
                </div>
                  </div>
                  <h2 className="text-xl font-bold">Təlimçi haqqında</h2>
                <p className="text-gray-600">{course.authorBio}</p>
              </div>
            </div>
          )}
          </div>
    </div>
  </div>

            )
            : <>
  <div className="flex justify-center relative flex-col items-center">
            <iframe
              src={course && getEmbedUrl(course?.lessons[currentIndex]?.video_link)}
              className="md:h-[64vh] h-[40vh] w-full object-cover rounded-md"
              controls={true}
            />
          </div>

          <div className="flex justify-between mt-3">
            <button
              className="flex items-center gap-2 px-5 py-2 border border-gray-200 bg-white rounded-full"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            > <IoIosArrowBack fontSize={20}/>
              Əvvəlki
            </button>
            <button
              className="flex items-center gap-2 items-center px-5 py-2 bg-indigo-400 text-white rounded-full"
              onClick={handleNext}
              disabled = {currentIndex => (course.lessons?.length || 0) -1}
            >
              Növbəti <IoIosArrowForward fontSize={20}/>
            </button>
          </div>
             <div className="mt-4 mb-4 flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 text-xs font-medium">
            <div className="flex h-full w-1/2 items-center justify-center overflow-hidden bg-indigo-600 text-white" />
          </div>

          <div className="md:flex justify-between gap-5">
            <h4 className="font-semibold text-xl">{course.lessons[0].lesson_title}</h4>
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                <img src={durationImage} alt="duration" />
                {course.duration}
              </div>
              <div className="flex gap-3">
                <img src={playImage} alt="play" />
                Video dərs
              </div>
              <div className="flex gap-3">
                <img src={eyeImage} alt="views" />
                2.3k baxis
              </div>
            </div>
          </div>
       <div className="flex gap-4 mt-5 mb-5 items-center">
            <img src={profileImage} className="" alt="profile" />
            <div className="flex-col gap-2">
              <h4 className="font-bold text-2xl">{course.author}</h4>
              <p className="text-gray-400">{course.authorPosition}</p>
            </div>
          </div>
          <div className="nav-tabs mt-5 mb-5">
            <div className="md:flex">
              {courseTabs.map((tab) => (
                <button
                  className={`w-full px-5 py-2 font-semibold border-b ${
                    activeTab === tab.key
                      ? "text-indigo-600 border-b-indigo-600"
                      : "text-gray-600 border-b-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  key={tab.key}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-white p-5">
              <p className="text-gray-600 leading-7">
                {courseTabs.find((tab) => tab.key === activeTab)?.content}
              </p>
            </div>
          </div>
            </>

          }
        

       

   

          <form className="mt-5 mb-5" onSubmit={(e) => e.preventDefault()}>
            {error && (
              <p className="text-center text-red-600 bg-red-50 rounded-md p-2 font-bold text-lg mb-3">
                {error}
              </p>
            )}
            <h4 className="mt-5 font-bold text-lg">Rəylər</h4>
            <div className="flex justify-between">
              <img src={ratingImage} alt="rating" />
              <button className="border border-indigo-600 text-indigo-600 rounded-full px-4 py-2" onClick={()=>setOpenCommentForm(true)}>
                Şərhinizi yazın
              </button>
            </div>
          </form>

          {filteredComments.length > 0 && (
            <>
              {filteredComments.map((item) => (
                <Comments key={item.id} courseId={id} />
              ))}
            </>
          )}
        </div>

        <div className="md:col-span-5 col-span-12 md:order-2 order-1">
       
          {
            course.started === false ? (
                <div className=" relative gap-3 text-indigo-600 rounded-md px-5 py-2 mb-3">
                   <iframe
              src={course && getEmbedUrl(course?.lessons[currentIndex]?.video_link)}
              className="h-40 w-full object-cover rounded-md"
              controls={true}
            />
                              <a className="absolute top-5 right-8 bg-white p-2 rounded-full">
                                <img src={saveImage} alt="save" />
                              </a>   
                              <div className='border border-gray-200 px-5 py-2 mt-4 rounded-lg'> 
                        <div className="flex justify-between items-center mt-4 mb-4 ">
                           <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold text-indigo-600 ">35 AZN</h2>
                         <h2 className="text-sm font-bold text-gray-800 line-through">70 AZN</h2>
                         </div>
                         <span className="text-red-400 text-sm bg-red-200/50 px-2 py-1 rounded-full">50% endirim</span>
                        </div>
            <p className='text-gray-500'>Promokod</p>
            <div className="flex items-center w-full gap-3 mt-2 mb-2">
              <input type="text" placeholder="COTHINK10" className="w-full rounded-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
             
              <button className=" w-full border border-indigo-600 text-indigo-600 font-semibold py-2 px-4 rounded-full">Tətbiq et</button>
              </div>
                        <a className="mb-3 mt-3 block text-white font-semibold bg-indigo-700 flex-1 w-full text-center py-2 px-4 rounded-full" href={`/courses/${course.id}`}>
                          Kursa qoşul
                        </a>
                      </div>

                      </div>

             

            ) : (
              <>
                {open && (
            <div className="bg-gray-100 shadow-md rounded-md px-5 py-2">
              {course?.lessons && course?.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => (
                  <button
                    key={`${lesson.lesson_title}-${index}`}
                    onClick={()=>{setCurrentIndex(index)
                            setOpenLesson(index)
                  }}
                    className="w-full mt-5 mb-5 bg-white rounded-md px-4 py-3 shadow-md"
                  >
                    <div className="cursor-pointer">
                      <div className="flex w-full justify-between">
                        <div className="text-gray-500 font-semibold">{lesson.lesson_title}</div>
                       
{
  openLesson === index ?  <IoIosArrowUp fontSize={24} className="text-gray-400" onClick={()=>setOpenLesson(null)}/> 
 :  <IoIosArrowDown fontSize={24} className="text-gray-400" onClick={()=>setOpenLesson(openLesson === index ? null : index)}/>
}
                       
                      </div>
                      <div className="text-left text-gray-400">3 dəq 45 san</div>
                      {
                        openLesson === index && (
                          <>
                          <div className='mt-3 pt-3 border-t border-gray-200'>

<p className='text-gray-500'>Course content</p>
</div>
                          </>
                        )
                      }
                    </div>
                  </button>
                ))
              ) : (
                <p className="font-bold col-span-4 text-center text-xl">Dərs tapılmadı</p>
              )}
            </div>
          )}
              </>
            )
          }
            <div className="flex flex-col gap-2 p-4 border border-gray-100 rounded-lg shadow-md px-5 py-2 mt-4">
      <div className='flex justify-center gap-3 items-center'>

      <h2 className='text-center text-gray-600 text-2xl font-semibold'>4.9<span className='pl-3 text-yellow-400'>★ ★  ★ ★ ★</span> </h2>
      <div className='text-indigo-600'>(250 rəy)</div>
      </div>
      {rows.map((count, index) => (
        <div key={index} className="flex text-yellow-400 gap-2 font-bold text-xl">
           ★
          <div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2'>
            <div className='bg-indigo-600 w-full h-full' style={{width:`${count}%`}}></div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
      {
  openCommentForm && (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-5  bg-black/50 '>
    <div className="relative mt-4 p-5 w-full max-w-lg flex-col bg-white justify-end items-center p-4 rounded-lg shadow-md">
      <button onClick={()=>setOpenCommentForm(false)} className="absolute right-2 top-0 text-end px-4 py-2 text-3xl text-gray-500">
          &times;
        </button>
      <h2 className='text-center text-gray-700 font-medium text-lg mb-2'>Şərhlərinizi bizimlə bölüşün</h2>
      <div className='flex items-center gap-2'>
      <input type='text'
        className="w-full rounded-full p-2 border border-gray-300 outline-none"
        placeholder="Şərh yazın"  />
       <div className='flex justify-center'>
        <button onClick={handleSendComment} className=" w-10 h-10 px-5 py-2 bg-indigo-600 text-white rounded-full">
        </button>
    </div>
      </div>
     </div>
     </div>
  )  
}
    </div>
  );
};

export default CourseDetail;
