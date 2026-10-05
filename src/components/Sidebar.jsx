
import { NavLink } from "react-router-dom";
import  {BsCameraVideo} from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
const Sidebar = ()=>{
    return(
        <>
    <div className="sidebar w-full md:p-0 px-2 ">
      <ul className="w-full flex flex-col md:pl-0 pl-7">      
         <li>
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/"}  >
            <BsCameraVideo fontSize={26} className="md:flex"/>
            Ana səhifə
          </NavLink>
        </li> 
          <li>
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/courses"}  >
            <BsCameraVideo fontSize={26} className="md:flex"/>
            Kurslar
          </NavLink>
        </li> 
          <li>
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/library"}  >
            <BsCameraVideo fontSize={26} className="md:flex"/>
            Kitabxana
          </NavLink>
        </li> 
          <li>
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/courses"}  >
            <BsCameraVideo fontSize={26} className="md:flex"/>
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/courses"}  >
            <BsCameraVideo fontSize={26} className="md:flex"/>
            İrəliləyişim
          </NavLink>
        </li> 
        <li>
          <NavLink 
            className="flex gap-2 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/learning"} 
            
          >
            <FiBookmark fontSize={24} className=" md:flex"/>
            <p className="md:hidden lg:block">Öyrənmə hədəfi</p>
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            className="flex gap-2 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-base" 
            to={"/certificates"} 
            
          >
            <FiBookmark fontSize={24} className=" md:flex"/>
            <p className="md:hidden lg:block">Sertifikatlarım</p>
          </NavLink>
        </li>
        <li className="flex">
          <img src="./src/assets/logout.svg"/>
          <NavLink 
            className="flex gap-2 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm md:text-red-500" 
            to="/login"   
          >
            Çıxış edin
          </NavLink>
        </li>
      </ul>
    </div>
        </> 
    )
}
export default Sidebar;