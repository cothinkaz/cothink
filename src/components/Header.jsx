
import { IoIosNotificationsOutline } from "react-icons/io";
import {BsChatDots} from "react-icons/bs"
import { Link, NavLink } from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {IoIosMenu} from "react-icons/io";
import { useState } from "react";
import navItems from "../../public/data/navItems.js";
const Header = () =>{
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    function handleSearch(event) {
        setSearchValue(event.target.value);

    }
    return(
          <header className="w-full border-b border-gray-200 px-5 py-2">
        <div className="w-full mt-3">
        <div className="md:flex hidden items-center justify-between gap-5">
          <a href="/" className="flex items-center justify-center">
          <img src="../src/assets/logo_main.svg" />
          </a>            
          <div className="hidden sm:flex flex-1 justify-center">     
                <form className="relative w-full max-w-md" onSubmit={(e)=>e.preventDefault()}>
                  <img src="../src/assets/search-normal.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"/>
                  <input 
                    type="text" 
                    placeholder="Axtarış..." 
                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 pl-10 pr-2 outline-none text-sm"
                    onBlur={() => setSearch(false)}
                    autoFocus
                    onChange={handleSearch}
                  />
                </form>
                 </div>
              <div className="flex justify-end items-center gap-3">
                
            <button className="cursor-pointer md:flex gap-2 hidden bg-indigo-800 text-white  rounded-full p-2 lg:px-4 lg:py-2 text-sm">
              <FaPlus fontSize={18}/> Yarat
            </button>
                   <button className="cursor-pointer md:flex hidden border border-gray-100 rounded-full p-2">
              <img src="../src/assets/message-2.svg"/>
            </button>
            <button className="cursor-pointer md:flex hidden border border-gray-100 rounded-full p-2">
              <img src="../src/assets/elements.svg"/>
            </button>
            <a href="/profile">
            <img src="../src/assets/avatarr.svg"/>  
            </a>
        </div>
         </div>
         <div className="flex justify-between items-center mt-3">
            <a href="/" className="flex items-center justify-center md:hidden">
            <img src="../src/assets/logo_main.svg" />
            </a>
            <div className="md:hidden flex justify-end items-center gap-3">
            <button className="cursor-pointer p-2" onClick={()=>setOpenMenu(!openMenu)}>
             <IoIosMenu fontSize={24}/>
              </button>
              {
openMenu &&   <ul className=" fixed flex flex-col gap-3 bg-white shadow-lg absolute top-16 right-3 p-3 z-10 rounded-md w-48">
                        {
                          navItems.map((item)=>(
                          <li className="mt-1" key={item.to}>
                          <NavLink 
                            className="flex gap-3 md:p-3 md:justify-center items-center lg:justify-start lg:pl-7 text-sm text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-full" 
                            to={item.to}   
                          >
                             {/* <img src={item.src}/> */}
                             { open && <span>
                              {item.title}
                            </span>
                           }
                          </NavLink>
                        </li>
                          ))}
</ul>
              }
            
         </div>
         </div>
        </div>

      </header>
     
    )
}
export default Header;