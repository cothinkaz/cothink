
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"
import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react"
import ShareDialog from "./components/ShareDialog";
function MainLayout(){
	const [open, setOpen] = useState(true)
	 const [share, setShare] = useState(false)
	useEffect(()=>{
    if(window.innerWidth<=768){
    	setOpen(false)
    }
	},[])

	
	return(
		<div className="min-h-screen flex flex-col">
			<Header share={share} setShare={setShare}/>
		  <div className="grid grid-cols-12 flex-1 ">
			<aside className={ `hidden md:block ${open ? "md:col-span-2" : "md:col-span-1"}`}>
				<Sidebar open = {open} setOpen = {setOpen}/>
			</aside >
			<main className={ open ? "p-4 col-span-12 md:col-span-10 bg-white/50" : "p-4 col-span-12 md:col-span-11"}>
				{
					share && (
						<ShareDialog share={share} setShare={setShare}/>
					)
				}
				     <Outlet/>
			</main>
		   </div>
		   <Footer/>
		</div>
	)
}
export default MainLayout;