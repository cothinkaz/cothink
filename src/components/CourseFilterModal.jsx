import {useState } from 'react';
import {FaStar } from "react-icons/fa"

const CourseFilterModal = ({ open, onClose, selectedCategory, setSelectedCategory, onApplyFilters,setOpenFilterModal }) => {
 const [price,setPrice] = useState(100)
 const [priceType, setPriceType] = useState("hamısı")
 const [level,setLevel] = useState('başlanğıc')
 const [minimum, setMinimum] = useState('hamısı')
 const [maximum, setMaximum] = useState('hamısı')
 const [rating, setRating] = useState(0)
 const values = [0, 50, 75, 100]

 const handleReset=()=>{
  setLevel('başlanğıc')
  setPriceType('hamısı')
  setMinimum('hamısı')
  setMaximum('hamısı')
  setPrice(100)
  setRating(0)
    onClose();
 }
 const handleFilter= ()=>{
  onApplyFilters({
    priceType,
    level,
    minimum,
    maximum,
    price,
    rating
  })
  onClose();
}
 return(
	<div className={`fixed inset-0 z-50 flex items-center justify-center p-3 ${open ? "" : "hidden"}`}>
		
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
		
    <div className="relative  bg-white overflow-y-scroll w-full overflow-hidden max-w-lg max-h-[90dvh] p-6 rounded-lg z-10">
			<button onClick={()=>setOpenFilterModal(false)} className="cursor-pointer absolute right-2 top-0 text-end px-4 py-2 text-3xl text-gray-500">
          &times;
        </button>
      <h3 className="text-2xl text-center font-semibold mb-3">Filtrasiya</h3>
			<p className="text-center text-gray-600 mb-3">Sizə uyğun kursları seçmək üçün filtrləri tətbiq edin</p>
			<div className="space-y-2">
				<h4 className="font-semibold text-gray-800 mt-3 mb-3">Qiymət</h4>
				<div className="grid grid-col-1 gap-3 sm:grid-col-3 border-b border-gray-200">
				<label>
        <input type = "radio" name="price" value="pulsuz" className="mr-2" checked={priceType === 'pulsuz'}  onChange={(e)=>setPriceType('pulsuz')}/> Pulsuz
        <input type = "radio" name="price" value="ödənişli" className="ml-4 mr-2" checked={priceType === 'ödənişli'}  onChange={(e)=>setPriceType('ödənişli')}/> Ödənişli
				<input type = "radio" name="price" value="hamısı" className="ml-4 mr-2" checked={priceType === 'hamısı'}  onChange={(e)=>setPriceType('hamısı')}/> Hamısı
  </label>
</div>
<h4  className="font-semibold text-gray-800 mt-3 mb-3">Səviyyə	</h4>
<div className="grid grid-cols-1 gap-3 sm:grid-col-3 border-b border-gray-200 pb-2 mb-2">		
	<label>
  <input type='radio' name="level" value="başlanğıc" className="mr-2"  checked={level === 'başlanğıc'} onChange={(e)=>setLevel('başlanğıc')} /> Başlanğıc
	<input type='radio' name="level" value="orta" className="ml-4 mr-2" checked={level === 'orta'} onChange={(e)=>setLevel('orta')} /> Orta
	<input type='radio' name="level" value="yüksək" className="ml-4 mr-2"  checked={level === 'yüksək'} onChange={(e)=>setLevel('yüksək')} /> Yüksək	
	</label>
  </div>
	<h4 className='font-semibold text-gray-800 mt-3 mb-3'>Vaxt aralığı</h4>
	<div className="md:flex md: flex-row flex-col items-center gap-4 border-b border-gray-200 pb-2 mb-2">
		<p className='text-gray-600 mb-2'>Minimium </p>
		<select name="minimum" value={minimum} className="w-full outline-none border border-gray-300 rounded-md p-1" onChange={(e)=>setMinimum(e.target.value)}>
           <option value="hamısı">Hamısı</option>
		   <option value="20">20 dəqiqə</option>
		   <option value="30">30 dəqiqə</option>
			</select>
			<p className='text-gray-600 mb-2 mt-2'>Maximum</p>
            <select name="maximum" value={maximum} className="w-full outline-none border border-gray-300 rounded-md p-1" onChange={(e)=>setMaximum(e.target.value)}>
								<option value="hamısı">Hamısı</option>
								<option value ='1'>1 saat</option>
								<option value= '2'>2 saat</option>
								</select>
								</div>
								<div className='flex gap-4 border-b border-gray-200 pb-2 mb-2'>
									<h2 className="font-semibold">Qiymət aralığı</h2>
									  <input type="range" min='0' max='3' step = "1" value={values.indexOf(price)} onChange={(e)=>setPrice(values[Number(e.target.value)])}  className="w-full cursor-pointer accent-indigo-600"/>
                <div className='flex justify-between text-sm text-gray-500'>
                 {/* {
                    values.map((value)=>(
                      <span key={value}>{value}</span>
                    ))
                  }
                  */}
                </div>
                  </div>
		  <div className="border-b border-gray-200 pb-2 mb-2">
			<h2 className="font-semibold mb-3 text-gray-800">Rating</h2>
			<div className="space-y-3 flex-col gap-3">
				<select value={rating} onChange={(e)=>setRating(e.target.value)} className='w-full rounded-md border border-gray-300 p-3 outline-none '>
     
        {
          [5, 4,3,2,1 ].map((stars)=>(
          	<>
                 <option key= {stars} value={stars} className="flex items-center gap-1">
                  {"★".repeat(stars) + "☆".repeat(5 - stars)} ({stars} ulduz)
                 </option>
    </>

          ))
        }
		</select>
	
			</div>					
								</div>
                <div className='flex justify-between gap-3'>
				<button
					className="block w-full text-center text-indigo-600 border border-indigo-600 p-2 rounded-md hover:bg-gray-200"
					onClick={handleReset}
				>
					Filtrləri sıfırla
				</button>
        <button
					className="block w-full text-center text-indigo-600 border border-indigo-600 p-2 rounded-md hover:bg-gray-200"
					onClick={handleFilter}>
					Tətbiq et
				</button>
			</div>
      </div>
		</div>
	</div>
 )
}
export default CourseFilterModal;