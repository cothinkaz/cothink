import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import { BsChatRightText } from "react-icons/bs";
import { FaBookmark, FaRegBookmark, FaRegComments, FaRegFile } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [comments, setComments]=useState([])
    const [comment, setComment]=useState("")
    const [open, setOpen]=useState(true)

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
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
            <div className="col-span-7">
            <img src={course?.image} className="w-full rounded-md"/>
            <div className="flex justify-between mt-3">
                <button className="px-5 py-2 border border-gray-200 bg-white rounded-full">Əvvəlki</button>
                <button className="px-5 py-2 bg-indigo-400 text-white rounded-full">Növbəti</button>
        </div>
           </div>
         <div className="col-span-5">
        <button className="w-full bg-blue-800 text-xl text-white rounded-full">Kurs planı</button>
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
        </div>
    );
}
export default CourseDetail;
