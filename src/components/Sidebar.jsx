
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import navItems from "../../public/data/navItems.js";
const Sidebar = ({open, setOpen})=>{
    return(
        <>
    <div className="sidebar w-full md:p-0 px-2 border-r border-gray-200 shadow-lg h-full ">
     <div className="flex justify-end">
        <a></a>
        <a onClick={(e)=>setOpen(!open)} className="mr-3 mt-3">
        {open ?  <IoIosArrowBack fontSize={24} className="text-gray-600"/> : <IoIosArrowForward fontSize={24} className="text-gray-600"/>}
        </a>
      </div>
      <ul className="w-full flex flex-col">      
      
        {
          navItems.map((item)=>(
          <li className="mt-3" key={item.to}>
         
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-full" 
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
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 text-red-500 hover:bg-gray-100 rounded-md" 
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