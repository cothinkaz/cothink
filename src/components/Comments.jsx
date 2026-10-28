import { useState } from "react"
import courseComments from "../data/courseComments";
import {FaRegThumbsUp} from "react-icons/fa";
import {FaRegComment} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import {profileImage, moreImage} from "../assets/assets";
export const CommentCard=({comment})=>{
        return(
          <>
    <div className="comment-item mt-4 mb-4 flex justify-between items-center w-full" key={comment.comment_id} >
                    <div className="comment-header flex items-center ">
                      <img
              className="rounded-md w-20 h-20"
              src={profileImage}
              alt="Profile"
            />
            <div className="pl-4">
            <div className='flex justify-between gap-3'>
               <h4 className="font-semibold">{comment.student_name}</h4>
               <p className='text-gray-500'>{comment.createdAt}</p>
            </div>
             {/*<div> <img src ={moreImage}/></div>*/}
            <p className="mt-3 text-gray-400">{comment.comment_text}</p>
                             <div className="flex gap-5 text-indigo-500 comment-reactions pt-3">

            <div className="comment-count flex items-center gap-2" ><FaRegComment fontSize={24}/>Cavabla</div>
                        <div className="like-count flex items-center gap-2"><FaRegThumbsUp fontSize={24}/>{comment?.likes}</div>
    </div>
            </div>
      
                    </div> 

                          <div>
                               <BsThreeDots fontSize={24} className='md:flex hidden'/>

       
            </div>
                           
                  
                                        </div>

                           
</>

        )
                        }
const Comments = ({ courseId }) => {
  const filtered = courseComments.filter(
    (item) =>String(item.course_id) === String(courseId)
  );

  return (
    <div className="grid grid-cols-1 gap-5 justify-center mx-auto">
      {filtered.length === 0 ? (
        <p className="font-bold col-span-4 text-center text-2xl">Komment tapılmadı</p>
      ) : (
        filtered.map((item) => (
          <CommentCard key={item.comment_id} comment={item} />
        ))
      )}
    </div>
  );
};
export default Comments;