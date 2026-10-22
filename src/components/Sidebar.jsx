
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import navItems from "../data/navItems";
import { logoutImage } from "../assets/assets";
const Sidebar = ({open, setOpen})=>{
  const [expandedItem, setExpandedItem] = useState(null);
    return(
        <>
    <div className="sidebar w-full md:p-0 px-2 border-r border-gray-200 shadow-lg h-full ">
     <div className="flex justify-end">
    <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Collapse sidebar" : "Expand sidebar"} className="mr-3 mt-3">
        {open ?  <IoIosArrowBack fontSize={24} className="text-gray-600"/> : <IoIosArrowForward fontSize={24} className="text-gray-600"/>}
    </button>
      </div>
      <ul className="w-full flex flex-col">      
      
        {navItems.map((item) => (
          <li className="mt-2" key={item.to}>
            {item.children && item.children.length > 0 ? (
              <>
                <button
                  type="button"
                  aria-expanded={expandedItem === item.title}
                  onClick={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                  className="flex w-full gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-full"
                >
                  <img src={item.src} alt="" />
                  {open && <span>{item.title}</span>}
                </button>
                {expandedItem === item.title && (
                  <ul className="ml-6">
                    {item.children.map((child) => (
                      <li className="mt-2" key={child.to}>
                        <NavLink
                          className="flex gap-3 p-3 items-center text-sm text-gray-600 hover:bg-gray-200 rounded-full"
                          to={child.to}
                        >
                          {child.src && <img src={child.src} alt="" />}
                          {open && <span>{child.title}</span>}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-full"
                to={item.to}
              >
                <img src={item.src} alt="" />
                {open && <span>{item.title}</span>}
              </NavLink>
            )}
          </li>
        ))}

        <li className="mt-5">
          <NavLink 
            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 text-red-500 hover:bg-gray-100 rounded-md" 
            to="/login"   
          >
             <img src={logoutImage} alt="" />
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