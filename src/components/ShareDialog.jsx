import {useState} from "react";
import {Link} from "react-router-dom"
import {courseShare, forumShare, blogShare, resursShare} from "../assets/assets";
const ShareDialog=({share, setShare})=>{
	const [closeShare, setCloseShare] = useState(false)
	const handleClose=()=>{
       setShare(false)
	}
	return(
		<div className='fixed inset-0 z-50 flex items-center justify-center p-5  bg-black/50'>
			<div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
			
      <div className='w-full relative mt-4 p-5 w-full max-w-lg flex-col bg-white justify-end items-center p-4 rounded-lg shadow-md'>
			 <button onClick={handleClose} className="cursor-pointer absolute right-2 top-0 text-end px-4 py-2 text-3xl text-gray-500">
          &times;
        </button>
      <h2 className='text-semibold text-xl text-center'>Paylaş</h2>
			<p className='text-gray-400 mb-3 mt-1 text-center'>Paylaşmaq istədiyiniz material növünü seçin</p>
<div className="grid md:grid-cols-4 grid-cols-2 gap-5 mt-5 w-full">
	<Link className='cursor-pointer bg-white border border-gray-300 rounded-md px-5 py-2' to={'/post'} onClick={handleClose}>
		<article className='mb-3'>
			<img src={forumShare}/>
		</article>
		<h2 className='text-center text-gray-700 font-semibold text-sm'>Forum</h2>
	</Link>
		<Link className='cursor-pointer bg-white border border-gray-300 rounded-md px-5 py-2 ' to={'/library/blogs'} onClick={handleClose}>
		<article className='mb-3'>
			<img src={blogShare}/>
		</article>
		<h2 className='text-center text-gray-700 font-semibold text-sm'>Bloq</h2>
	</Link>
		<Link className='cursor-pointer  bg-white border border-gray-300 rounded-md px-5 py-2' to={'/library/resources'} onClick={handleClose}>
		<article className='mb-3'>
			<img src={resursShare} className='object-cover rounded-md'/>
		</article> 
		<h2 className='text-center text-gray-700 font-semibold text-sm'>Resurs</h2>
	</Link>
		<Link className='cursor-pointer bg-white border border-gray-300 rounded-md px-5 py-2' to={'/courses'} onClick={handleClose}>
		<article className='mb-3'>
			<img src={courseShare}/>
		</article>
		<h2 className='text-center text-gray-700 font-semibold text-sm'>Kurs</h2>
	</Link>
</div>
		</div>
		</div>
	)
}
export default ShareDialog;