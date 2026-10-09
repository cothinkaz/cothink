import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import { BsChatRightText } from "react-icons/bs";
import { FaBookmark, FaRegBookmark, FaRegComments, FaRegFile } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoIosNotificationsOutline } from "react-icons/io";
import Comments from "../components/Comments"
import courseComments from "../data/courseComments"
const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [comments, setComments]=useState([])
    const [comment, setComment]=useState("")
    const [currentIndex, setCurrentIndex]=useState(0)
    const [open, setOpen]=useState(true)
    const [error,setError]=useState('')

    useEffect(() => {
        axios.get("/data/courses.json").then((res) => {
        const foundCourse = res.data.find(
                (c) => String(c.id) === String(id));
                setCourse(foundCourse);
        });
    }, [id]);

    if (!course) {
        return <div>Kurs tapılmadı</div>;
    }
    const filteredComments= courseComments.filter(
        (item)=>String(item.course_id) === String(id)
    )
    const getEmbedUrl=(url)=>{
        const videoUrl=url?.split("youtu.be/")[1]?.split("?")[0]
            return `https://www.youtube.com/embed/${videoUrl}`;
    }
        const handleNext=()=>{
        if(currentIndex<course.lessons.length-1){
          setCurrentIndex(currentIndex+1)
        }
    }
           const handlePrev=()=>{
        if(currentIndex>0){
          setCurrentIndex(currentIndex-1)
        }

    }
    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
            <div className="col-span-7">
               <div className="flex justify-center relative flex-col items-center">
            <iframe src={course && getEmbedUrl(course?.lessons[currentIndex]?.video_link)} className="md:h-[64vh] h-[40vh] w-full object-cover rounded-md" controls={true}/>
            

            </div>
               <div className="flex justify-between mt-3">
                <button className="px-5 py-2 border border-gray-200 bg-white rounded-full" onClick={handlePrev}>Əvvəlki</button>
                <button className="px-5 py-2 bg-indigo-400 text-white rounded-full" onClick={handleNext}>Növbəti</button>
        </div>
                    </div>
         <div className="col-span-5">
        <button className="w-full bg-gray-100 text-xl rounded-md px-4 py-2 font-bold">Kurs planı</button>
        {
                          open && (
                            <> 
                                {course?.lessons && course?.lessons?.length>0 ?(
                        course?.lessons.map((lesson, index)=>(
                           <>
                            <div className="flex justify-between mt-5 mb-5 border-b border-b-gray-200 pb-3">
  <div className="flex items-center gap-3 cursor-pointer" >
                                 <div className="icons">
                              <span className="text-blue-500 rounded-full"><FaRegCirclePlay fontSize={24}/></span>  
                            </div>
                            <div className="flex flex-col">
                            <h4 className="font-bold">{lesson.lesson_title}</h4>
                            <p className="text-gray-400">3 dəq 45 san</p>
                            </div>
                            </div>          
                        </div>
                        </>
                          ))
                        )
                          : (
                            <p className="font-bold col-span-4 text-center text-xl">Dərs tapılmadı</p>
                          )
                        }
                            </>
                          )
                        }   
        </div>
              <div className="col-span-12">
               <form>
                            {error && (
                <p className="text-center text-red-600 bg-red-50 rounded-md p-2 font-bold text-lg mb-3">
                  {error}
                </p>
                            )}
  <input type="text" className="w-full bg-gray-200 px-3 py-2 outline-none rounded-md" placeholder="Fikirlərinizi yazın…" onChange={(e)=>setComment(e.target.value)}/>
                    <h4 className="mt-5 font-bold text-lg" >Rəylər</h4>
                        </form>
                       
             {
              filteredComments.length > 0 && (
                
                <>
   {  filteredComments.map((comment)=>{
                return(
                    <>
<Comments courseId={id}/>
                    </>
         )
            })}
            </>
        )}  
              </div>
        
      
      </div>
       </div>
    );
}
export default CourseDetail;
