
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"
import {Outlet} from "react-router-dom";
function MainLayout(){
	return(
		<div className="min-h-screen flex flex-col">
			<Header/>
		  <div className="grid grid-cols-12 flex-1">
			<aside className="col-span-3 p-4">
				<Sidebar/>
			</aside >
			<main className="col-span-9 p-4">
				<Outlet/>
			</main>
		   </div>
		   <Footer/>
		</div>
	)
}
export default MainLayout;