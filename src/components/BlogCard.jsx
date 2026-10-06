import { useState } from "react";
import lookIcon from "../assets/look.svg";
import likeIcon from "../assets/like.svg";
import commentsIcon from "../assets/comments.svg";
import saveIcon from "../assets/save.svg";

const BookmarkIcon = () => (
 <img src={saveIcon} alt="" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" /> 
);

const CommentIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#404040"
       strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16v11H9l-5 4V5z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
);

const Avatar = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
        <svg viewBox="0 0 24 24" className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px]" fill="#8A8A8A">
          <circle cx="12" cy="8" r="4.2" />
          <path d="M3 24c0-5.2 4-8 9-8s9 2.8 9 8z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-[48px] w-[48px] sm:h-[60px] sm:w-[60px] shrink-0 rounded-full object-cover"
    />
  );
};

const BlogCard = ({ blog }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
      {/* Şəkil + bookmark */}
      <div className="relative aspect-[2/1] shrink-0 bg-[#F0F2F8]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <button
          type="button"
          aria-label="Yadda saxla"
          className="absolute right-2 top-2 flex h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] items-center justify-center rounded-full bg-white shadow-sm"
        >
          <BookmarkIcon />
        </button>
      </div>

      {/* Məzmun: flex-1 ilə qalan hündürlüyü tutur */}
      <div className="flex flex-1 flex-col px-4 pb-5 pt-5 sm:px-5">
        {/* Müəllif */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar src={blog.authorAvatar} alt={blog.author} />
          <div className="min-w-0 leading-snug">
            <p className="truncate text-[12px] font-medium text-[#171717] sm:text-[16px]">
              {blog.author}
            </p>
            <p className="text-[12px] text-[#737373] sm:text-[14px]">
              {blog.readTime} · {blog.date}
            </p>
          </div>
        </div>

        {/* Başlıq */}
        <h6 className="mt-6 text-[18px] font-medium leading-snug text-[#171717] sm:text-[22px]">
          {blog.title}
        </h6>

        {/* Teqlər */}
        <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="flex-1 whitespace-nowrap rounded-full bg-[#E8EDFB] px-4 py-[6px] text-center text-[12px] text-[#2A4EBB]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Statistika: mt-auto ilə həmişə kartın ən aşağısında */}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-[#404040] sm:gap-x-8">
          <span className="flex items-center gap-2 text-[12px] sm:text-[14px]">
            <img src={lookIcon} alt="" className="h-[20px] w-[20px]" /> {blog.views}
          </span>
          <span className="flex items-center gap-2 text-[12px] sm:text-[14px]">
            <img src={likeIcon} alt="" className="h-[20px] w-[20px]" /> {blog.likes}
          </span>
          <span className="flex items-center gap-2 text-[12px] sm:text-[14px]">
            <img src={commentsIcon} alt="" className="h-[20px] w-[20px]" /> {blog.comments}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;