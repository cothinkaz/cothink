
import { NavLink } from "react-router-dom";
import  {BsCameraVideo} from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import {useState} from "react";


const Sidebar = ({open, setOpen})=>{
  const navItems = [
    
    {
    to:"/",
    title: "Ana səhifə",
    src:"./src/assets/home-2.svg"
},
{
     to:"/courses",
    title: "Kurslar",
    src:"./src/assets/play-circle.svg"
  },
  {
    to:"/library",
    title: "Kitabxana",
    src:"./src/assets/book.svg"
  },
   {
    to:"/discussion",
    title: "Forum",
    src:"./src/assets/messages-2.svg"
},
{
     to:"/progress",
    title: "İrəliləyişim",
    src:"./src/assets/chart.svg"
  },
  {
    to:"/learning",
    title: "Öyrənmə hədəfi",
    src:"./src/assets/star.svg"
  },
    {
    to:"/certificates",
    title: "Sertifikatlarım",
    src:"./src/assets/certificate.svg"
  }
 
  ]
    return(
        <>
    <div className="sidebar w-full md:p-0 px-2 border-r border-gray-200">
     <div className="flex justify-end">
        <a></a>
        <a onClick={(e)=>setOpen(!open)} className="mr-3 mt-3">
        {open ?  <IoIosArrowBack fontSize={24}/> : <IoIosArrowForward fontSize={24}/>}
        </a>
      </div>
      <ul className="w-full flex flex-col">      
      
        {
          navItems.map((item)=>(
          <li className="mt-5" key={item.to}>
         
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm" 
            to={item.to}   
          >
             <img src={item.src}/>
             { open && <span>
              {item.title}
            </span>
           }
          </NavLink>
        </li>
          ))}
     

        <li className="mt-5">
         
          <NavLink 
            className="flex gap-2 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-red-500" 
            to="/login"   
          >
             <img src="./src/assets/logout.svg"/>
            { open && <span>
              Çıxış edin
            </span>

            } 
            
          </NavLink>
        </li>
      </ul>
    </div>
        </> 
    )
}
export default Sidebar;