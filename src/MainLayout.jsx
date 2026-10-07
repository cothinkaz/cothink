
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"
import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react"
function MainLayout(){
	const [open, setOpen] = useState(true)
	
	useEffect(()=>{
    if(window.innerWidth<=768){
    	setOpen(false)
    }
	},[])

	
	return(
		<div className="min-h-screen flex flex-col">
			<Header/>
		  <div className="grid grid-cols-12 flex-1">
			<aside className={ open ? "col-span-2" : "col-span-1"}>
				<Sidebar open = {open} setOpen = {setOpen}/>
			</aside >
			<main className={open ? "p-4 col-span-10" : "p-4 col-span-11"}>
				<Outlet/>
			</main>
		   </div>
		   <Footer/>
		</div>
	)
}
export default MainLayout;