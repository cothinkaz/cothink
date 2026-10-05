
import { IoIosNotificationsOutline } from "react-icons/io";
import {BsChatDots} from "react-icons/bs"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
const Header = () =>{
    const [search, setSearch] = useState(false);
    return(
          <header className="w-full container mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
        <a href="/"><img src="../src/assets/hero.png" className="w-24 h-24"/></a>            
                  </div>
          <div className="md:flex items-center gap-1.5 lg:gap-3  col-span-5">     
                <form className="w-full relative">
                  <img src="../src/assets/search-normal.svg" className="absolute left-3 top-3"/>
                  <input 
                    type="text" 
                    placeholder="Axtarış..." 
                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 outline-none text-sm"
                    onBlur={() => setSearch(false)}
                    autoFocus
                  />
                </form>
                 </div>
              <div className="col-span-3 flex justify-end items-center gap-3">
            <button className="bg-indigo-700 text-white  rounded-full p-2 lg:px-4 lg:py-2 text-sm font-semibold">
              Yarat
            </button>
                   <button className="bg-gray-100 rounded-full p-2">
              <BsChatDots className="text-2xl"/>
            </button>
            <button className="bg-gray-100 rounded-full p-2">
              <img src="../src/assets/notification-circle.svg"/>
            </button>
        </div>
            </div>
      </header>
     
    )
}
export default Header;