
import { IoIosNotificationsOutline } from "react-icons/io";
import {BsChatDots} from "react-icons/bs"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
const Header = () =>{
    const [search, setSearch] = useState(false);
    return(
          <header className="w-full border-b border-gray-200 px-5 py-2">
        <div className="w-full mt-3">
        <div className="flex items-center justify-between gap-5">
          <a href="/" className="flex items-center justify-center">
          <img src="../src/assets/logo_main.svg" />
          </a>            
          <div className="hidden sm:flex flex-1 justify-center">     
                <form className="relative w-full max-w-md">
                  <img src="../src/assets/search-normal.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"/>
                  <input 
                    type="text" 
                    placeholder="Axtarış..." 
                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-3 pl-10 pr-2 outline-none text-sm"
                    onBlur={() => setSearch(false)}
                    autoFocus
                  />
                </form>
                 </div>
              <div className="flex justify-end items-center gap-3">
                <img src="./src/assets/add.svg"/>
            <button className="md:flex hidden bg-indigo-700 text-white  rounded-full p-2 lg:px-4 lg:py-2 text-sm font-semibold">
              Yarat
            </button>
                   <button className="md:flex hidden border border-gray-100 rounded-full p-2">
              <img src="../src/assets/message-2.svg"/>
            </button>
            <button className="md:flex hidden border border-gray-100 rounded-full p-2">
              <img src="../src/assets/elements.svg"/>
            </button>
            <a href="/profile">
            <img src="../src/assets/avatarr.svg"/>  
            </a>
        </div>
         </div>
            </div>
      </header>
     
    )
}
export default Header;