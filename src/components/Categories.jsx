
import categories from '../data/categories'

const Categories = ()=>{
    return (
        <div class='grid md:grid-cols-3 grid-cols-1 gap-4 mt-4 mb-4'>
            {
                categories.map((category)=>(
                    <div className='flex-col items-center justify-center border border-gray-300 shadow-md rounded-md px-5 py-2 cursor-pointer'>
                        <a className="flex justify-center items-center">
                            <img src={category.image} className="w-20 h-20"/>
                        </a>
                        <h4 className='font-semibold text-lg text-center mt-2 mb-3'>{category.name}</h4>
                    </div>
                ))
            }
        </div>
    )
}
export default Categories