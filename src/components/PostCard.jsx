import postUser from "../assets/icon/user-1.svg";
import postLike from "../assets/icon/like.svg";
import Mark from "../assets/icon/mark-filled.svg";
import unMark from "../assets/icon/mark.svg";
import messege from "../assets/icon/messege-3.svg";
import { Link } from "react-router-dom";

function PostCard({ data }) {
  const {id, author, title, text, images, likesCount, commentsCount, isSaved } =
    data;
 const detailUrl = `/post/${id}`;
  return (
    <article className="rounded-[16px] border border-[#D9D9D9] w-full bg-white p-4 md:p-[29px]">
      {/* Header */}
      <div className="flex items-center gap-[12px]">
        <img
          src={author.avatar || postUser}
          alt=""
          className="w-9 h-9 shrink-0 rounded-full object-cover"
        />
        <span className="text-sm font-medium truncate">{author.name}</span>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          • 1 saat əvvəl
        </span>
        <button className="ml-auto shrink-0 text-xl leading-none">⋮</button>
      </div>

      {/* Title + text */}
      <Link to={detailUrl} className="block">
        <h3 className="mt-3 text-[16px] lg:text-[18px] font-medium break-words hover:underline">
          {title}
        </h3>
      </Link>
      {text && (
         <Link to={detailUrl} className="block">
          <p className="mt-2 text-[14px] lg:text-[16px] leading-relaxed text-[#050505] break-words">
            {text}
          </p>
        </Link>
      )}

      {/* Şəkillər */}
      {images?.length > 0 && (
        <div className="mt-3 rounded-[16px] overflow-hidden bg-[#F6F2D4] flex justify-center">
          {images.map((img) => (
            <img
              key={img.url}
              src={img.url}
              width={img.width}
              height={img.height}
              loading="lazy"
              alt={title}
              className="max-w-full h-auto max-h-[320px] md:max-h-[480px] object-contain"
            />
          ))}
        </div>
      )}

      {/* Actions */}
       <div className="mt-4 flex items-center gap-4 lg:gap-6 text-sm lg:text-[15px]">
        <button className="flex items-center gap-2">
          <img className="w-5 h-5" src={postLike} alt="" /> {likesCount}
        </button>

        {/* Şərh düyməsi də detala aparsın */}
        <Link to={detailUrl} className="flex items-center gap-2">
          <img className="w-5 h-5" src={messege} alt="" /> {commentsCount}
        </Link>

        <button className="ml-auto">
          <img src={isSaved ? Mark : unMark} alt="" />
        </button>
      </div>
    </article>
  );
}

export default PostCard;
