
import categories from '../data/categories'

const Categories = ()=>{
    return (
        <div class='grid grid-cols-3 gap-4 mt-4 mb-4'>
            {
                categories.map((category)=>(
                    <div className='border border-gray-300 shadow-md rounded-md px-5 py-2 cursor-pointer'>
                        <a >
                            <img src={category.image}/>
                        </a>
                        <h4 className='font-semibold text-lg text-center mt-3 mb-3'>{category.name}</h4>
                    </div>
                ))
            }
        </div>
    )
}
export default Categories