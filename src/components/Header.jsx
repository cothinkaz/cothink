
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
// import { IoClose, IoMenu } from "react-icons/io5";
const Header = () =>{
    const [search, setSearch] = useState(false);
    return(
          <header className="w-full top-0 z-50 navbar items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* <button className="md:hidden text-3xl" >
              {open ? <IoClose fontSize={28}/> : <IoMenu fontSize={28}/>}
            </button>
            <button className="hidden md:flex text-3xl" id="burgerBtn" onClick={() => setOpen(!open)} aria-labelledby="burgermenu">
              <IoMenu fontSize={28}/>
            </button> */}
            <div className="logo">
              <Link to="/home" className="hidden md:flex lg:ml-5">
                <img src="/images/logo.jpg" alt="Logo" className="hidden lg:block"/>
                <img src="/images/logo.svg" alt="Logo" className="lg:hidden hidden md:block"/>
              </Link>
            </div>            
          </div>
          <Link to="/home" className="md:hidden flex">
            <img src="/images/mobile_logo.png" alt="Mobile Logo" />
          </Link>
          
          <div className="hidden md:flex actions items-center gap-1.5 lg:gap-3 shrink-0">     
                <form className="w-full">
                  <input 
                    type="text" 
                    placeholder="Axtarış..." 
                    className="w-32 lg:w-56 border border-gray-300 rounded-md p-2 outline-none text-sm"
                    onBlur={() => setSearch(false)}
                    autoFocus
                  />
                  <p>sss</p>
                </form>
              
            <button className="bg-gray-200 rounded-md p-2">
              <IoIosNotificationsOutline className="text-2xl"/>
            </button>
            {/* <Link className="profile-img rounded-full pl-2" to="/profile">
         <img src={mentorImg} className="w-10 h-10" alt="Profile"/>
            
            </Link>             */}
          </div>
        </div>
      </header>
     
    )
}
export default Header;